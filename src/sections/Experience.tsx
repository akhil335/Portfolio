import { Timeline } from "@/components/Timeline"
import { experiences } from "@/constants"

const Experience = () => {
  return (
    <section id="project" className="max-w-7xl mx-auto">
        <Timeline data={experiences} />
    </section>
  )
}

export default Experience