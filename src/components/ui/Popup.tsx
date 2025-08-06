import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Trees from "@/assets/images/water.jpg";
import CustomButton from '../Button';
interface FormData {
  name: string;
  email: string;
  domain: string;
  message: string;
}

const Popup = () => {
  const [open, setOpen] = useState<boolean>(false);
  
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    domain: '',
    message: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    try {
      console.log('Form submitted:', form);
      setOpen(false);
      // Add API call logic here
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
   
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left Section - Image with Overlay */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
              <img
                src={Trees}
                alt="Nature background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-8">
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-2">Let's Connect</h2>
                  <p className="text-base">Reach out and let's start a conversation!</p>
                </div>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="w-full md:w-1/2 p-8 bg-neutral-900">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl  text-primary">Get in Touch</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-gray-700 text-xl transition"
                  aria-label="Close popup"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm  ">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm  ">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="domain" className="block text-sm ">
                    Domain
                  </label>
                  <input
                    id="domain"
                    name="domain"
                    value={form.domain}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
                    placeholder="yourdomain.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm  ">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
                    placeholder="Your message..."
                  />
                </div>
              
                 <CustomButton title="Start Your Journey" icon="" />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
