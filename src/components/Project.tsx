import ProjectDetails from "@/components/ProjectDetails"
import type { Tag } from "@/types"
import { useState } from "react"

export const Project = ({title, description, subDescription, href, image, tags, setPreview}: { title: string, description:string, subDescription: string[], href: string, image: string, tags: Tag[], setPreview: React.Dispatch<React.SetStateAction<string | undefined>> }) => {
    const [isHidden, setIsHidden] = useState<Boolean>(false)

  return (
    <>
    <div className="flex-wrap items-center justify-between py-10 space-y-14 sm:flex sm:space-y-0"
    onMouseEnter={()=> setPreview(image)}
    onMouseLeave={()=> setPreview(undefined)}>
        <div>
            <p className="text-2xl">{title}</p>
            <div className="flex gap-5 mt-2 text-sand">
                {
                    tags.map((tag)=> <span key={tag.id}>{ tag.name }</span>)
                }
            </div>
        </div>
        <button onClick={()=> setIsHidden(true)} className="flex items-center gap-1 cursor-pointer hover-animation">
            Read More
            <img src="assets/arrow-right.svg" alt="arrow-right" className="w-5" />
        </button>
    </div>
    <div className="bg-linear-to-r from-transparent via-neutral-700 to-transparent h-px w-full">
    {
        isHidden && <ProjectDetails title={title} description={description} subDescription={subDescription} href={href} image={image} tags={tags} closeModal={()=> setIsHidden(false)} />
    }    
</div>
    </>
  )
}
