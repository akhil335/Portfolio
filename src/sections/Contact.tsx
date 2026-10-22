import { useState } from "react"
import emailjs from "@emailjs/browser"
import Alert from "@/components/Alert"
import { Particles } from "@/components/particles"

const Contact = () => {
  const [isloading, setIsloading] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertType, setAlertType] = useState<string>("success")
  const [alertMessage, setAlertMessage] = useState<string>("")
  const [formData, setFormdata] = useState<Record<string, string>>({
    name: "",
    email: "",
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>): void => {
    const { name, value } = e.target

    setFormdata( formData => ({ ...formData, [name]: value}))
  }

  const showAlertMessage = (type: string, message: string): void => {
    setAlertType(type)
    setAlertMessage(message)
    setShowAlert(true)

    setTimeout(()=> {
      setAlertType("success")
      setAlertMessage("")
      setShowAlert(false)
    }, 5000)
  }

  // 1. Fixed the event type to React.FormEvent
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setIsloading(true);

    const mailData = {
      from_name: formData.name,
      to_name: "Akhil",
      from_email: formData.email,
      to_email: "akhilwebsite.dev@gmail.com",
      message: formData.message
    };
    
    try {
      // 2. Updated to use the correct VITE_ variables
      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID, 
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID, 
        mailData,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setFormdata({ name: "", email: "", message: "" })
      showAlertMessage("success", "Your message has been sent!")

    } catch(err) {
      console.log(err);
      showAlertMessage("danger", "Something went wrong!")
    } finally {
      setIsloading(false);
    }
  };


  return (
    <section id="contact" className="reltive max-w-7xl mx-auto relative flex items-center c-space section-spacing">
      <Particles className="absolute inset-0 -z-50" quantity={100} ease={80} color="#ffffff" refresh />
      { showAlert && <Alert type={alertType} text={alertMessage} />}
        <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
            <h2 className="text-heading">Let's Talk</h2>
            <p className="font-normal text-neutral-400">Whether you're looking to build a new website, improve your existing platform, or bring a unique project to life, I'm here to help</p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="field-label">Full Name</label>
            <input value={formData.name} onChange={handleChange} id="name" name="name" type="text" className="field-input field-input-focus" placeholder="John doe" autoComplete="name" required />
          </div>
           <div className="mb-5">
            <label htmlFor="name" className="field-label">Email</label>
            <input value={formData.email} onChange={handleChange} id="email" name="email" type="text" className="field-input field-input-focus" placeholder="Johndoe@gmail.com" autoComplete="email" required />
          </div>
           <div className="mb-5">
            <label htmlFor="name" className="field-label">Message</label>
            <textarea value={formData.message} onChange={handleChange} id="message" name="message" rows={4} className="field-input field-input-focus" placeholder="Share your thoughts" autoComplete="message" required />
          </div>
          <button className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation">{isloading ? "Sending" : "Send"}</button>
        </form>
        </div>
    </section>
  )
}

export default Contact