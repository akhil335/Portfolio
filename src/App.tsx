
import Contact from "@/sections/Contact"
import Experience from "@/sections/Experience"
import Footer from "@/sections/Footer"
import Projects from "@/sections/Projects"
import About from "@sections/About"
import Hero from "@sections/Hero"
import Navbar from "@sections/Navbar"
import ReactLenis from "lenis/react"



function App() {
  return <div>
    <ReactLenis root options={{ anchors: true }}/>
    <Navbar />
    <Hero />
    <About />
    <Projects />
    <Experience />
    <Contact />
    <Footer />
  </div>
}

export default App
