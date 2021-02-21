import { useQueryClient } from 'react-query'

import Meal from '@components/Meal'

import { AnimateSharedLayout, motion } from 'framer-motion'

export default function Home() {
  const queryClient = useQueryClient()

  return (
    <motion.div layout className="w-screen h-screen p-5">
      <motion.main
        layout
        className="max-w-2xl p-8 mx-auto rounded-md ring-4 ring-gray-900 bg-gray-100"
      >
        <motion.h1 layout className="font-black text-3xl sm:text-5xl">
          Random Meal Generator
        </motion.h1>
        <motion.h2 layout className="font-medium text-base sm:text-xl">
          Get a random recipe for your delight.
        </motion.h2>

        <motion.div
          layout
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
        >
          <Meal />
        </motion.div>

        <motion.button
          layout
          whileHover={{ scale: 1.025, backgroundColor: '#2563EB' }}
          whileTap={{ scale: 0.99 }}
          onClick={() => queryClient.refetchQueries('meals')}
          className="w-full py-4 mt-4 bg-blue-500 text-white text-lg font-bold rounded-md"
        >
          Get random meal
        </motion.button>
      </motion.main>
    </motion.div>
  )
}
