'use client';
import { usePathname } from "next/navigation";
import HowItWorks from "@/components/HowItWorks";
import ReviewSection from "@/components/ReviewSection";
// import WhyChooseUs from "@/components/WhyChooseUs";
// import CallToAction from "@/components/CallToAction";
// import FAQ from "@/components/FAQ";

const ConditionalPageShow = () => {
    const pathName = usePathname();
    if (pathName !== '/') return null
    return (
        <>
           <HowItWorks />
           <ReviewSection />
           {/* <WhyChooseUs />
           <CallToAction />
           <FAQ /> */}
        </>
    );
};

export default ConditionalPageShow;