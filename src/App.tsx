import {  Routes, Route } from "react-router-dom";
import Layout from "@/layouts/layout";
import Home from "@/pages/Home";
import Why from "@/components/Why";

import './App.css'
function App() {
  return (
    <div className="bg-pixel-crt text-white min-h-screen">

        <Routes>
          {/* Layout is the parent for all routes that share Navbar */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/why" element={<Why />} />
            {/* add more routes here */}
          </Route>
        </Routes>

    </div>
  );
}

export default App;
