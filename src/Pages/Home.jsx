import { Carousel,About,Features,Service } from "../Components/HomeComponents"
import { Footer } from "../Components/Header&Footer"

export default function Home() {
  return (
    <>
      <Carousel />
      <About/>
      <Features/>
      <Service/>
      <Footer/>
    </>
  )
}
