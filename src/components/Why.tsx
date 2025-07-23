import {Button} from '@/components/ui/button'
export default function Why() {
  return (
     <section className="bg-pixel-crt py-20">
         <div className="container mx-auto px-4  max-w-6xl h-screen text-left rounded-full">
           <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 text-left">
           GAIN SKILLS
            <br className="hidden sm:inline" />
            GET CERTIFIED.
            <br className="hidden sm:inline" />
            REACH HIGHER
           </h1>
           <p className="text-lg sm:text-xl text-gray-400 mb-8 text-left w-[600px]">
             Your journey to mastering in-demand skills starts here. Learn fast. Build faster. Launch confidently.
           </p>
           <Button className="text-lg shadow-md  bg-yellow-700 ">
             Get Started
           </Button>
         </div>
       </section>
  )
}
