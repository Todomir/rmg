import Link from 'next/link'

import { motion } from 'framer-motion'

const container = {
  closed: {
    opacity: 0,
    x: -20,
    transition: {
      staggerChildren: 0.035,
      staggerDirection: -1,
      delay: 0.4,
      when: 'afterChildren'
    }
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.033,
      staggerDirection: 1,
      delay: 0.4,
      when: 'beforeChildren'
    }
  }
}

const item = {
  closed: { opacity: 0, x: -10 },
  open: { opacity: 1, x: 0 }
}

export default function MealPage() {
  let meal = null
  if (typeof window !== 'undefined') {
    meal = JSON.parse(localStorage.getItem('meal'))
  }

  if (!meal) return null
  return (
    <motion.div layout className="w-screen h-screen">
      <motion.div
        layout
        layoutId="meal-container"
        className="w-full px-6 bg-yellow-100"
      >
        <motion.header
          layout
          layoutId="meal-header"
          className="h-96 -mx-6 relative shadow-lg"
          style={{
            backgroundImage: `url("${meal.image_url}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <motion.div className="w-full h-full absolute inset-0 bg-gradient-to-t from-gray-800 opacity-60 z-10" />

          <motion.div
            layout
            layoutId="meal-title-container"
            className="absolute h-full z-20 bottom-0 flex flex-col justify-between p-8 w-full"
          >
            <Link href="/">
              <motion.a
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.99 }}
                className="w-10 h-10 p-2 bg-gray-50 rounded-full shadow cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none"></rect>
                  <line
                    x1="216"
                    y1="128"
                    x2="40"
                    y2="128"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  ></line>
                  <polyline
                    points="112 56 40 128 112 200"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  ></polyline>
                </svg>
              </motion.a>
            </Link>
            <motion.h1
              layout
              layoutId="meal-title"
              className="font-extrabold text-3xl sm:text-5xl text-white"
            >
              {meal.name}
            </motion.h1>
          </motion.div>
        </motion.header>
        <motion.p
          layout
          layoutId="meal-description"
          className="text-gray-900 text-sm sm:text-lg my-14 max-w-5xl"
        >
          {meal.description}
        </motion.p>

        <motion.section
          layout
          variants={container}
          initial="closed"
          animate="open"
          exit="closed"
          className="mt-8 flex flex-col"
        >
          <motion.h3 layout variants={item} className="text-3xl font-bold mb-6">
            Ingredients
          </motion.h3>

          {meal.ingredients.map(ingredient => (
            <motion.p
              variants={item}
              className="text-lg text-gray-900 bg-gray-50 max-w-5xl py-8 px-6 shadow"
              key={Math.round(Math.random() * 10000)}
            >
              {ingredient}
            </motion.p>
          ))}

          <motion.div layout variants={container} className="pt-5 space-y-4">
            {meal.instructions.map((instruction, index) => (
              <motion.div
                layout
                variants={item}
                className="text-lg bg-gray-50 max-w-5xl py-10 px-8 rounded-md shadow"
                key={Math.round(Math.random() * 10000)}
              >
                <h4 className="text-3xl font-bold mb-4">Step {index + 1}</h4>
                {instruction}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </motion.div>
    </motion.div>
  )
}
