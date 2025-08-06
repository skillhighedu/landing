import Trees from "@/assets/images/water.jpg";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea"; 
import {motion} from 'framer-motion'
import CustomButton from "./Button";
import MessageIcon from "./icons/Message";
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
      <motion.h1
  className="text-white text-4xl sm:text-7xl font-bold mb-8 text-center"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
  viewport={{ once: true }}
>
  Join Now
</motion.h1>

  
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

        
            <CustomButton title="Send Message" icon={<MessageIcon/>} className="w-full"/>
         
        </form>
      </div>
    </div>
  );
}
