
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
    <div className={`fixed top-0 left-0 py-3 z-50 w-full transition-all duration-300 ${
      scrolled ? "bg-black/30 backdrop-blur-md" : "bg-transparent"
    }`}>
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a href="/" className="text-xl font-bold transition-colors text-neutral-400 hover:text-white">
          Akhil
          </a>
          <button className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden" onClick={()=> setIsOpen((isOpen) => !isOpen)}>
            <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} alt="toggle" className="w-6 h-6" />
          </button>

                  {/* Desktop Menus  */}  
          <nav className="hidden sm:flex">
            <Navigation />
          </nav>
        </div>
      </div>

          {/* Mobile Menus */}
          <AnimatePresence>
          {
            isOpen && 
              <motion.div className="block overflow-hidden text-center sm:hidden"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ height: '100vh'}}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, x: -10 }}
                >
                  <nav className="pb-5">
                    <Navigation />
                  </nav>
              </motion.div>
          }
            </AnimatePresence>
    </div>
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