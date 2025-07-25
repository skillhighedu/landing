import { Routes, Route } from "react-router-dom";
import Layout from "@/layouts/layout";
import Home from "@/pages/Home";
import Why from "@/components/Why";

import './App.css';

function App() {
  return (
    <div className="bg-gradient-to-b from-[#0f2e1f] to-[#072213] text-white min-h-screen">
    
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/why" element={<Why />} />
            {/* Add more routes here */}
          </Route>
        </Routes>

    </div>
  );
}

export default App;
