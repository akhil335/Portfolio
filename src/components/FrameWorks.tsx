import { OrbitingCircles } from "@/components/OrbitingCircles"

const FrameWorks = () => {
  const skills = [
    "css3",
    "git",
    "html5",
    "javascript",
    "react",
    "nextjs",
    "tailwindcss",
    "materialui",
    "typescript",
    "bootstrap",
    "vitejs"
  ]
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {
          skills.map((skill, index) => (
            <Icon key={index} src={`assets/logos/${skill}.svg`} />
          ))
        }
      </OrbitingCircles>
      <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
        {
          [...skills].reverse().map((skill, index) => (
            <Icon key={index} src={`assets/logos/${skill}.svg`} />
          ))
        }
      </OrbitingCircles>
    </div>
  )
}

const Icon = ({ src }: { src: string }) => {
  return (<img className="duration-200 rounuded-sm hover:scale-110" src={src} alt="Icon" />)
}

export default FrameWorks