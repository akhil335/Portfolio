import type { Tag } from "@/types"
import { motion } from "motion/react"

const ProjectDetails = ({title, description, subDescription, href, image, tags, closeModal}: { title: string, description:string, subDescription: string[], href: string, image: string, tags: Tag[], closeModal: () => void }) => {
  return (
    <div className="fixed flex inset-0 z-50 items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="relative max-w-2xl border shadow-sm rounded-2xl bg-linear-to-l from-midnight to-navy border-white/10">
            <button className="absolute p-2 rounded-sm top-5 right-5 bg-midnight hover:bg-gray-500" onClick={closeModal}>
                <img src={"assets/close.svg"} alt={title} className="w-6 h-6 cursor-pointer" />
            </button>
            <img src={image} alt={title} className="w-full rounded-t-2xl" />
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold text-white">{ title }</h5>
                    <p className="mb-3 font-normal text-neutral-400">{ description }</p>
                    {
                        subDescription.map((subDesc, index) => {
                            return <p key={index} className="mb-3 font-normal text-neutral-400">{ subDesc }</p>
                        })
                    }
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-3">
                            {
                                tags.map((tag) => {
                                    return (<img src={tag.path} alt={tag.name} key={tag.id} className="rounded-lg size-10 hover-animation" />)
                                })
                            }
                        </div>
                        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium cursor-pointer hover-animation">View project <img src={"assets/arrow-up.svg"} alt={"arrow-up"} className="size-4" /></a>
                    </div>
                </div>
        </motion.div>
    </div>
  )
}

export default ProjectDetails