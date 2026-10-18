import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";


const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false)
  const email = "akhilwebsite.dev@gmail.com"

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(email);
      setCopied(true);

      let timeoutId
      console.log(timeoutId)
      timeoutId = setTimeout(() => setCopied(false), 2000);
      
    } catch (err) {
      console.error("Failed to copy email to clipboard");
    }
  };

  return (
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ y: -5 }} disabled={copied} className={`relative px-1 py-4 text-sm text-center rounded-full font-extralight bg-primary w-[12rem] cursor-pointer disabled:cursor-not-allowed`} onClick={copyToClipboard}>
        <AnimatePresence mode="wait">
          {
            copied ?   <motion.p key={"copied"} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.1, ease: "easeInOut" }} className="flex items-center justify-center gap-2">
            <img src="/assets/copy-done.svg" alt="Copy Done Icon" className="w-5" /> Email has Copied
          </motion.p>
            :
          <motion.p key={"copy"} initial={{ opacity: 0 }} animate={{ opacity: 1}} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}  className="flex items-center justify-center gap-2">
            <img src="/assets/copy.svg" alt="Copy Icon" className="w-5" /> Copy Email Address
          </motion.p>
          }
        </AnimatePresence>
      </motion.button>
  );
};

export default CopyEmailButton