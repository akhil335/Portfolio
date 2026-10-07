
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { menuItems } from "@data/constants"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false)
  const [scrolled, setScrolled] = useState<Boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
        <div className={`fixed top-0 left-0 py-2 md:py-3 z-50 w-full transition-all duration-300 
      ${
      scrolled ? "bg-black/30 backdrop-blur-md" : "bg-transparent"
    }
    `}>
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a href="/" className="text-xl font-bold transition-colors text-neutral-400 hover:text-white">
          Akhil
          </a>
         <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-xl transition-all hover:bg-white/[0.1] focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
              alt="toggle menu"
              className="h-5 w-5"
            />
          </button>

                  {/* Desktop Menus  */}  
          <nav className="hidden sm:flex">
            <Navigation />
          </nav>
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-x-4 top-20 z-50 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-2xl sm:hidden"
          initial={{ opacity: 0, y: -15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.96 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
        >
          {/* Glass highlight */}
          <div className="pointer-events-none absolute inset-0 " />
          <nav className="relative p-3">
            <ul className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <motion.li
                  key={item.id}
                  whileTap={{ scale: 0.97 }}
                >
                  <a
                    href={`#${item.path}`}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-neutral-300 transition-all duration-200 hover:bg-white/[0.08] hover:text-white active:bg-white/[0.12]"
                  >
                    <span>{item.label}</span>

                    <span className="text-neutral-600 text-white transition-all duration-200 group-hover:translate-x-1 group-hover:text-neutral-300">
                      →
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}

const Navigation = () => {
  return (
    <ul className="nav-ul">
      {
        menuItems.map(( item ) => {
          return <li className="nav-li" key={item.id}>
            <a href={`#${item.path}`} className="nav-link">{item.label}</a>
          </li>
        })
      }
    </ul>
  )
}

export default Navbar