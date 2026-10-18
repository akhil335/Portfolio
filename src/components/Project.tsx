import ProjectDetails from "@/components/ProjectDetails"

export const Project = ({title, description, subDescription, href, image, tags}: { title: string, description:string, subDescription: string[], href: string, image: string, tags: Record<string, string>[] }) => {
  return (
    <div className="flex-wrap items-center py-10 justify-baseline space-y-14 sm:flex sm:space-y-0">
        <div>
            <p className="text-2xl">{title}</p>
            <div className="flex gap-5 mt-2 text-sand">
                {
                    tags.map((tag)=> <span key={tag.id}>{ tag.name }</span>)
                }
            </div>
        </div>
        <button className="flex items-center gap-1 cursor-pointer hover-animation">
            Read More
            <img src="assets/arrow-right.svg" alt="arrow-right" className="w-5" />
        </button>
        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full">
            {/* <ProjectDetails title={title} description={description} subDescription={subDescription} href={href} image={image} tags={tags} /> */}
        </div>
    </div>
  )
}
