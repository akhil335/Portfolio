import { Project } from "@/components/Project"
import { myProjects } from "@/constants"

const Projects = () => {
  return (
    <section className="relative c-space section-spacing max-w-7xl mx-auto">
        <h2 className="text-heading">My selected projects</h2>
        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
        <div className="flex flex-col">
          {
            myProjects.map((project)=> <Project key={project.id} { ...project } />)
          }
        </div>
    </section>
  )
}

export default Projects