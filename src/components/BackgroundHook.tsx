import Trees from "@/assets/images/bg.jpg";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea"; // assuming you're using ShadCN or custom Textarea

export default function BackgroundHook() {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${Trees})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <h1 className="text-white text-4xl sm:text-7xl font-bold mb-8 text-center ">
          Join Now
        </h1>

        <form className="w-full max-w-md space-y-4">
          <Input
            placeholder="Name"
            className="bg-white/90 text-black placeholder:text-gray-700 py-4"
          />
          <Input
            placeholder="Email"
            type="email"
            className="bg-white/90 text-black placeholder:text-gray-700 py-4"
          />
          <Input
            placeholder="Phone Number"
            type="tel"
            className="bg-white/90 text-black placeholder:text-gray-700 py-4"
          />
          <Textarea
            placeholder="Message"
            rows={4}
            className="bg-white/90 text-black placeholder:text-gray-700 py-4"
          />

          <Button
            type="submit"
            className="w-full bg-green-800 text-white text-base sm:text-md py-3 px-6 hover:bg-lime-400 pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-lime-300"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
