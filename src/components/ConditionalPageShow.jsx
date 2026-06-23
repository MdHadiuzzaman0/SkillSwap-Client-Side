'use client';
import { usePathname } from "next/navigation";
import HowItWorks from "@/components/HowItWorks";
import ReviewSection from "@/components/ReviewSection";
import Footer from "@/components/Footer";
import LatestTask from "@/components/LatestTask";
import TopFreelancer from "@/components/TopFreelancer";
// import WhyChooseUs from "@/components/WhyChooseUs";
// import CallToAction from "@/components/CallToAction";
// import FAQ from "@/components/FAQ";

const ConditionalPageShow = ({children}) => {
    const pathName = usePathname();
    if (pathName !== '/') return null
    return (
        <>
           <HowItWorks />
           <ReviewSection />
           {children}
           {/* <WhyChooseUs />
           <CallToAction />
           <FAQ /> */}
           {/* <Footer /> */}
        </>
    );
};

export default ConditionalPageShow;