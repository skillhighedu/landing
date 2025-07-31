import {tools} from "@/data/tools"
import Header from "./Header"

export default function Tools() {
  return (
    <section className="w-full bg-neutral-900 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
      
        <Header title=" Your learning Toolbox"/>

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
