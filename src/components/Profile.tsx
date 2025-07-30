import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Courses } from "@/data/course";

const mockUser = {
  name: "Sai Kiran",
  email: "kiran@example.com",
};

export default function Profile() {
  const handleLogout = () => {
    console.log("Logging out...");
  };

  // Animation variants for smooth transitions
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="min-h-screen mx-auto px-4 sm:px-8 py-12 text-white bg-gradient-to-b from-neutral-950 to-neutral-900"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header: Back + Title */}
      <motion.div
      className="flex items-center justify-between gap-4 mb-10 px-4 sm:px-8"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <Button
        variant="ghost"
        onClick={() => window.history.back()}
        className="text-white hover:bg-neutral-700 hover:text-lime-400 transition-all duration-300 rounded-full px-4 py-2 flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </Button>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-600">
        Your Profile
      </h2>
    </motion.div>
      {/* Warrior Hero Block */}
      <motion.div
        className="bg-gradient-to-r from-neutral-900 via-zinc-800 to-neutral-900 p-8 rounded-2xl shadow-xl mb-12 border border-neutral-700"
        variants={itemVariants}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r bg-primary ">
          Welcome Back, Warrior
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 font-mono max-w-2xl">
          Your skills are battle-ready. Sharpen your expertise and conquer the digital realm.
        </p>
      </motion.div>

      {/* User Info Block */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-neutral-900 rounded-2xl p-8 mb-12 shadow-xl border border-lime-500/30"
        variants={itemVariants}
      >
        <div>
          <h2 className="text-2xl ">{mockUser.name}</h2>
          <p className="text-gray-400">{mockUser.email}</p>
        </div>
        <Button
          variant="destructive"
          onClick={handleLogout}
          className="mt-4 sm:mt-0 bg-red-600 hover:bg-red-700 transition-colors duration-300"
        >
          Logout
        </Button>
      </motion.div>

      {/* Courses Section */}
      <motion.h3
        className="text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary"
        variants={itemVariants}
      >
       Courses You've Equipped
      </motion.h3>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        <AnimatePresence>
          {Courses.slice(1, 4).map((course) => (
            <motion.div
              key={course.id}
              className="bg-neutral-800 text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-700 hover:border-lime-500/50"
              variants={itemVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <img
                src={course.logo}
                alt={course.name}
                className="w-full h-48 object-cover transition-transform duration-300"
              />
              <div className="p-6">
                <h4 className="text-xl  mb-4">{course.description}</h4>
                <Button
                  variant="secondary"
                  className="w-full  text-black transition-colors duration-300"
                >
                  Continue Training
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}