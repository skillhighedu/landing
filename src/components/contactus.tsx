import Trees from "@/assets/images/warrior.jpg";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function ContactUs() {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${Trees})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/10 z-0" />

      {/* Responsive container */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between max-w-7xl mx-auto px-4 sm:px-8 py-12 w-full gap-10">
        
        {/* Left Content - Quote */}
        <div className="w-full sm:w-1/2 text-white text-center sm:text-left px-2 sm:px-0">
          <h1 className="text-3xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 font-bold pixel-shadow leading-tight">
            Gear Up for the Modern Battle
          </h1>
          <p className="text-md sm:text-xl md:text-2xl font-mono max-w-lg mx-auto sm:mx-0">
            "To fight in the modern world, a sword isn't enough — you need skills. Reach out, and let's arm you for the future."
          </p>
        </div>

        {/* Right Content - Form */}
        <form className="w-full sm:w-1/2 max-w-lg bg-white text-black bg-opacity-90 backdrop-blur-sm p-6 rounded-lg shadow-xl space-y-4">
          <Input
            placeholder="Name"
            className="text-black placeholder:text-gray-700 py-4"
          />
          <Input
            placeholder="Email"
            type="email"
            className="text-black placeholder:text-gray-700 py-4"
          />
          <Input
            placeholder="Phone Number"
            type="tel"
            className="text-black placeholder:text-gray-700 py-4"
          />
          <Textarea
            placeholder="Message"
            rows={6}
            className="text-black placeholder:text-gray-700 py-4"
          />
          <Button
            type="submit"
            className="w-full bg-green-800 text-white text-base py-3 px-6 hover:bg-primary pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all duration-300 transform hover:-translate-y-1"
          >
            Begin My Training
         
          </Button>
        </form>
      </div>
    </div>
  );
}
