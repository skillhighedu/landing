import {tools} from "@/data/tools"
import Header from "./Header"
import ToolIcon from "./icons/ToolIcon"
import {motion} from "framer-motion"
export default function Tools() {
  return (
    <section className="w-full bg-neutral-900 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
      
   <div className="flex flex-row items-center justify-center gap-4">  
         <Header title=" Your learning Toolbox"/>  <motion.div
  initial={{ rotate: -10, scale: 0.9, opacity: 1 }}
  animate={{ rotate: [ -10, 0, 10, 0 ], scale: 1, opacity: 1 }}
  transition={{
    duration: 1.6,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "loop",
  }}
  className="w-8 h-8 mb-4"
>
  <ToolIcon className="w-full h-full text-primary" />
</motion.div>
   </div>

        <div className="flex flex-wrap justify-center items-center gap-10">
          {tools && tools.map((tool) => (
            <img
    
              src={tool.logo}
         
             className={`h-20  transition duration-300 ease-in-out cursor-pointer`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
