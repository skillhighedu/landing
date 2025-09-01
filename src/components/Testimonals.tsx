

import Header from "./Header"

import { MarqueeDemoVertical } from "./ui/marquee"
import { Link } from "react-router-dom"
import CustomButton from "./Button"
import BlockQuote from "./ui/BlockQuote"
export default function Testimonials() {


  return (
    <section className="bg-neutral-950 bg-pixel-crt py-20 px-4 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center items-center gap-2 text-center">
          <Header title="Loved by Many" subline="Their journey wasn’t easy. But the Right Skills made all the difference." />
         
        </div>


       

        <MarqueeDemoVertical />
        {/* Footer CTA + Quote */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 px-2">

          <BlockQuote quote="Right skills. Real results." />
          <Link to="/contact-us" aria-label="Talk to our team">
            <CustomButton title="Contact us" icon="" />
          </Link>
        </div>


      </div>



    </section>
  )
}