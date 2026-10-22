import { Project } from "@/components/Project"
import { myProjects } from "@/constants"
import { useMotionValue, useSpring, motion } from "motion/react"
import { useState } from "react"

const Projects = () => {
  const x= useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { damping: 10, stiffness: 50 })
  const springY = useSpring(y, { damping: 10, stiffness: 50 })

  const handleMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX + 20)
    y.set(e.clientY)
  }

  const [preview, setPreview] = useState<string | undefined>()

  return (
    <section onMouseMove={handleMouseMove} id="work" className="relative c-space section-spacing max-w-7xl mx-auto">
        <h2 className="text-heading">My selected projects</h2>
        <div className="bg-linear-to-r from-transparent via-neutral-700 to-transparent mt-12 h-px w-full" />
          {
            myProjects.map((project)=> <Project key={project.id} { ...project } setPreview={setPreview} />)
          }
          {
          preview && <motion.img src={preview} className={`fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80 `} 
          style={{ x: springX, y: springY }}
           />
          }
   
    </section>
  )
}

export default Projects