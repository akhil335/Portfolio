import FrameWorks from "@/components/FrameWorks";
import Card from "@components/Card"
import CopyEmailButton from "@components/CopyEmailButton";
import { Globe } from "@components/Globe";
import { useRef } from "react";

const About = () => {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <section id="about" className="c-space section-spacing pt-20 max-w-7xl mx-auto">
            <h2 className="text-heading">About Me</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
                <div className="flex items-end grid-default-color grid-1">
                    <img src="assets/coding-pov.webp" alt="coding-pov" className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5] hover:lg:scale-[2.7] transition-transform duration-800" />
                    <div className="z-10">
                        <p className="headtext">Hi, I'm Akhil Semwal</p>
                        <p>Over the past nearly five years, I've developed my frontend skills to build dynamic and sophisticated web applications.</p>
                        <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo"></div>
                    </div>
                </div>
                <div className="grid-default-color grid-2">
                    <div ref={ref} className="flex items-center justify-around w-full h-full">
                        <p className="flex items-end text-5xl text-gray-500">CODE IS CRAFT</p>
                        <Card rotate={75} className="top-[20%] left-[30%]" text="GRASP" constraintsRef={ref} />
                        <Card rotate={-30} className="top-[60%] left-[45%]" text="SOLID" constraintsRef={ref} />
                        <Card rotate={90} className="top-[30%] left-[70%]" text="COMPOSITION" constraintsRef={ref} />
                        <Card rotate={-45} className="top-[55%] left-[0%]" text="CLEAN CODE" constraintsRef={ref} />
                        <Card rotate={20} className="top-[10%] left-[38%]" text="PROBLEM SOLVER" constraintsRef={ref} />
                        <Card rotate={20} className="bottom-[6%] left-[18%]" image="assets/logos/React.png" constraintsRef={ref} />
                        <Card rotate={50} className="bottom-[20%] left-[35%] rounded-3xl" image="assets/logos/JavaScript.png" constraintsRef={ref} />
                        <Card rotate={70} className="bottom-[2%] left-[56%]" image="assets/logos/Next.js.png" constraintsRef={ref} />
                        <Card rotate={90} className="bottom-[5%] left-[72%] rounded-3xl" image="assets/logos/TypeScript.png" constraintsRef={ref} />
                    </div>
                </div>
                <div className="grid-black-color grid-3">
                    <div className="z-10 w-[50%]">
                        <p className="headtext">Time Zone</p>
                        <p className="subtext">Exploring the web from Earth 🌍 — open to opportunities worldwide.</p>
                        <figure className="absolute left-[30%] top-[0%]">
                            <Globe />
                        </figure>
                    </div>
                </div>
                <div className="grid-special-color grid-4">
                    <div className="flex flex-col items-center justify-center gap-4 size-full">
                        <p className="text-center headtext">Do you want to start a project together?</p>
                        <CopyEmailButton />
                    </div>
                </div>
                <div className="grid-default-color grid-5">
                    <div className="z-10 w-[50%]">
                        <p className="headtext">Tech Stack</p>
                        <p className="subtext">
                            I specialize in frontend development, creating responsive and visually appealing web applications with a focus on user experience, clean design, and performance.
                        </p>
                    </div>
                    <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
                        <FrameWorks />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About