
import HeroBanner from "./components/HeroBanner";
import TopDoctors from "./components/TopDoctors";
export default function Home() {
  return (
   <div>
    <div className="w-full">
      {/* 1. Hero Banner Component Injection */}
      <HeroBanner />
      <TopDoctors />
      
      {/* 2. Other sections layer placeholder */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-400">
        <p>Rest of the dynamic components will go here...</p>
      </section>
    </div>
   </div>
  );
}
