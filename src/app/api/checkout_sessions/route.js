import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { stripe } from '../../../lib/stripe'
import { fetchClientProposals } from '@/lib/data'

export async function POST(req) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const { searchParams } = new URL(req.url)
    const proposalId = searchParams.get('proposalId')

    const useSession = await auth.api.getSession({
      headers: await headers()
    });
    const {token} = await auth.api.getToken({
      headers: await headers()
    });
    const clientEmail = useSession?.user?.email;
    const proposals = await fetchClientProposals({ clientEmail, token });
    const proposal = proposals.find(p => p._id === proposalId);
    const { job_title, proposed_budget, freelancer_email } = proposal

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      // line_items: [
      //   {
      //     price: 'price_1TknfbLH4fxqLYh3cT1Be50K',
      //     quantity: 1,
      //   },
      // ],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: job_title,                    
              description: `Freelancer: ${freelancer_email}`,
            },
            unit_amount: Math.round(proposed_budget * 100),  // টাকা সেন্টে কনভার্ট (500 → 50000)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&proposalId=${proposalId}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}
