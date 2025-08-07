import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Swords } from "lucide-react";
import BgImage from "@/assets/images/warrior.jpg"; // or use `/bg.jpg` if in public/

export default function Signup() {
  
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setForm({ name: "", email: "", password: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", form);
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${BgImage})`,
      }}
    >
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90 z-0" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-neutral-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-neutral-700"
        >
          <h2 className="text-2xl  text-center mb-6 text-white">
            {isSignup ? "Join the Battle" : "Welcome Back, Warrior"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <Input
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="bg-neutral-800 text-white"
                required
              />
            )}

            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="bg-neutral-800 text-white"
              required
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="bg-neutral-800 text-white"
              required
            />

            <Button
              type="submit"
              className="bg-green-800 w-full text-white text-base sm:text-md  py-6 px-6 sm:py-4 sm:px-8 pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-lime-300 flex items-center gap-2"
            >
              <Swords className="w-8 h-8" />
              {isSignup ? "Create my account" : "Enter the Arena"}
            </Button>
          </form>

          <p className="text-sm text-center text-neutral-400 mt-6">
            {isSignup ? "Already a warrior?" : "New here?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary cursor-pointer hover:underline "
            >
              {isSignup ? "Log In" : "Sign Up"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
