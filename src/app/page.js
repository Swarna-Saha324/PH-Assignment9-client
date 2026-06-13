
import HeroBanner from "./components/HeroBanner";
import TopDoctors from "./components/TopDoctors";
import WhyChooseUs from "./components/WhyChooseUS";
import StatsSection from "./components/StatsSection";
export default function Home() {
  return (
   <div>
    <div className="w-full">
      {/* 1. Hero Banner Component Injection */}
      <HeroBanner />
      <TopDoctors />
      <WhyChooseUs></WhyChooseUs>
      <StatsSection></StatsSection>
      
    
      
    </div>
   </div>
  );
}
