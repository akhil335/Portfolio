

const ProjectDetails = ({title, description, subDescription, href, image, tags}: { title: string, description:string, subDescription: string[], href: string, image: string, tags: Record<string, string>[] }) => {
  return (
    <div className="fixed flex inset-0 z-50 items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm">
        <div className="relative max-w-2xl border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10">
            <button className="absolute p-2 rounded-sm top-5 right-5 bg-midnight hover:bg-gray-500">
                <img src={"assets/close.svg"} alt={title} className="w-6 h-6" />
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
                </div>
        </div>
    </div>
  )
}

export default ProjectDetails