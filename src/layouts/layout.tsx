import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  
  return (
    <div  className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f2e1f] to-[#072213] ">
      <header className="w-full ">
        {/* Centered Navbar Container */}
        <div >
       
          <Navbar  />
 <Banner/>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}
