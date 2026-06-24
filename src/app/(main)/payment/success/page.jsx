import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import Link from 'next/link'
import { FiCheckCircle, FiArrowRight, FiMail, FiLayers, FiDollarSign } from 'react-icons/fi'
import { changeSatusAfterPayment } from '@/lib/action' 
import { getClientProposalsAction } from '@/lib/data' 
import { auth } from '@/lib/auth'
import { headers } from "next/headers"

export default async function Success({ searchParams }) {
  // 🎯 ১. ইউআরএল থেকে সেশন আইডি এবং প্রপোজাল আইডি রিসিভ করা
  const { session_id, proposalId } = await searchParams

  if (!session_id || !proposalId)
    throw new Error('Please provide a valid session_id and proposalId')

  // ২. স্ট্রাইপ থেকে পেমেন্ট সেশন রিট্রিভ করা
  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  // 🎯 ৩. পেমেন্ট কমপ্লিট হলেই কাজ শুরু হবে
  if (status === 'complete') {
    
    // 🎯 ৪. সেশন থেকে ক্লায়েন্ট ইমেইল বের করে তার সব প্রপোজাল তুলে আনা
    const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
    const clientEmail = session?.user?.email || ""
    
    let currentProposal = null
    const { token } = await auth.api.getToken({
    headers: await headers()
    });

    if (clientEmail) {
      const allProposals = await getClientProposalsAction({email: clientEmail, token})
      
      // ৫. তুলে আনা লিস্ট থেকে ইউআরএল-এর proposalId ম্যাচ করে নির্দিষ্ট প্রপোজাল অবজেক্টটি খুঁজে বের করা
      if (Array.isArray(allProposals)) {
        currentProposal = allProposals.find(
          (p) => (p._id?.toString() === proposalId || p._id?.$oid === proposalId)
        )
      }
    }

    // যদি কোনো কারণে প্রপোজাল ডাটা না পাওয়া যায়, ক্র্যাশ এড়াতে সেফটি অবজেক্ট
    const proposalInfo = currentProposal || {}

    // 🎯 ৬. আপনার এক্সপ্রেস ব্যাকএন্ডের জন্য infoField গোছানো (taskId ও proposalId সহ)
    const infoField = {
      taskId: proposalInfo.task_id,      // ডাটাবেজ থেকে পাওয়া task_id
      proposalId: proposalId,            // ইউআরএল থেকে আসা আসল আইডি
      sessionId: session_id
    }

    // সার্ভার অ্যাকশন কল করে ডাটাবেজ স্ট্যাটাস "in-progress" ও "closed" করা
    const data = await changeSatusAfterPayment(infoField)

    // 🎨 ৭. আকর্ষণীয় এবং প্রিমিয়াম কার্ড টাইপ সাকসেস UI
    return (
      <section id="success" className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 max-w-md w-full text-center space-y-6 relative overflow-hidden">
          
          {/* টপ কালার ডেকোরেশন বার */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-green-500" />
          
          {/* সাকসেস আইকন */}
          <div className="mx-auto w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 shadow-inner">
            <FiCheckCircle className="w-10 h-10" />
          </div>

          {/* হেডিং */}
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-black tracking-tight">Payment Successful!</h1>
            <p className="text-xs text-gray-500">Your task is now successfully updated to In-Progress</p>
          </div>

          {/* মেইন ইনফো কার্ড (যা সরাসরি ডাটাবেজ থেকে ম্যাচ করে আনা হয়েছে) */}
          <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-3.5 border border-gray-200/50">
            <div className="flex items-start gap-3">
              <FiLayers className="w-4 h-4 text-navy mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Project Title</p>
                <p className="text-xs font-semibold text-gray-800 line-clamp-1">{proposalInfo.job_title || "Freelance Task"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-200/60 pt-3">
              <div className="flex items-start gap-2.5">
                <FiDollarSign className="w-4 h-4 text-emerald-600 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Amount Paid</p>
                  <p className="text-sm font-bold text-black">${proposalInfo.proposed_budget || 0}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <FiMail className="w-4 h-4 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Freelancer Email</p>
                  <p className="text-xs font-semibold text-gray-700 truncate max-w-[120px]">{proposalInfo.freelancer_email || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* নোটিফিকেশন মেসেজ */}
          <p className="text-xs text-gray-500 px-2 leading-relaxed">
            We appreciate your business! A confirmation receipt has been sent to{' '}
            <strong className="text-black font-semibold">{customerEmail}</strong>.
          </p>

          {/* ড্যাশবোর্ড ব্যাক লিংক বাটন */}
          <div className="pt-2">
            <Link 
              href="/dashboard/client/proposals" 
              className="w-full bg-black hover:bg-zinc-900 text-white font-semibold text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md group"
            >
              Go to Dashboard
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* ব্যাকএন্ড সিঙ্ক চেক স্ট্যাটাস */}
          <div className="text-[10px] font-medium text-gray-400">
            {data?.success ? "✓ Database status synchronized" : "⚠ Syncing backend records..."}
          </div>

        </div>
      </section>
    )
  }
}