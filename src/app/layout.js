import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConditionalPageShow from "@/components/ConditionalPageShow";

// 🎯 ১. নিচে ব্যবহার করা কম্পোনেন্টগুলো উপরে ইম্পোর্ট করে নিলাম (আপনার সঠিক পাথ অনুযায়ী চেঞ্জ করে নিতে পারেন)
import TopFreelancer from "@/components/TopFreelancer"; 
import LatestTask from "@/components/LatestTask";

// Heading Font
const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Body Font
const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Metadata configuration
export const metadata = {
  title: "SkillSwap | Freelance Micro-Task Platform",
  description: "A secure micro-task marketplace connecting skilled freelancers with direct clients.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-black font-body">
        <Navbar />
        {/* <SubNavbar /> */}
        <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        
        {/* 🎯 ২. এখানে ক্লোজিং ট্যাগের ভুলটি ঠিক করা হলো (</ConditionalPageShow>) */}
        <ConditionalPageShow>
          <TopFreelancer />
          <LatestTask />
        </ConditionalPageShow>
        
        <Footer />
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}