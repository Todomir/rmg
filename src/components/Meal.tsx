import { useState } from 'react'
import { useQuery } from 'react-query'

import AspectRatio from '@components/AspectRatio'

import { AnimatePresence, motion } from 'framer-motion'

const foodEmojis = [
  '🥐',
  '🍞',
  '🥪',
  '🍔',
  '🍟',
  '🍕',
  '🥙',
  '🧆',
  '🥘',
  '🍿',
  '🍜',
  '🍝',
  '🍣',
  '🥮',
  '🍨',
  '🧁',
  '🥧',
  '🍪',
  '🎂',
  '🍩',
  '🍤',
  '🥟'
]

function ImageSkeleton() {
  return <div className="w-full h-full bg-gray-400 animate-pulse" />
}

function DescriptionSkeleton() {
  return (
    <>
      <div className="w-full h-3 bg-gray-400 animate-pulse mt-6 rounded" />
      <div className="w-full h-3 bg-gray-400 animate-pulse mt-2 rounded" />
      <div className="w-full h-3 bg-gray-400 animate-pulse mt-2 rounded" />
      <div className="w-2/3 h-3 bg-gray-400 animate-pulse mt-2 rounded" />
    </>
  )
}

function TitleSkeleton() {
  return (
    <div className="absolute z-20 bottom-0 m-4 w-80 h-10 bg-gray-400 animate-pulse mt-6 rounded" />
  )
}

export default function Meal() {
  const { isLoading, isFetching, data } = useQuery(
    'meals',
    async () => {
      try {
        const response = await fetch('/api/random', { method: 'GET' })
        return await response.json()
      } catch (error) {
        throw new Error(error.message)
      }
    },
    { refetchOnWindowFocus: false }
  )

  const [open, setOpen] = useState<boolean>(false)

  const container = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        staggerChildren: 0.035,
        staggerDirection: -1,
        when: 'afterChildren'
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.033,
        staggerDirection: 1,
        when: 'beforeChildren'
      }
    }
  }

  const item = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  }

  return (
    <motion.div
      layout
      className="w-full bg-gray-50 pb-9 px-6 mt-8 rounded-md border border-gray-200 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <motion.header layout className="relative -mx-6 shadow-lg">
        <motion.div
          layout
          className="w-full h-full absolute inset-0 bg-gradient-to-t from-gray-800 opacity-60 z-10"
        />

        {isLoading ? (
          <TitleSkeleton />
        ) : (
          <motion.div
            layout
            className="absolute z-20 bottom-0 flex flex-col-reverse p-4 justify-between w-full"
          >
            <motion.h1
              layout
              className="font-extrabold text-lg sm:text-3xl text-white"
            >
              {data.name}
            </motion.h1>
            <AnimatePresence>
              {isFetching && (
                <motion.span
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-green-500 z-20 w-36 px-2 py-1 text-xs text-white font-bold animate-bounce rounded-md shadow-md"
                >
                  Fetching new meal{' '}
                  {
                    foodEmojis[
                      Math.round(Math.random() * (foodEmojis.length - 1))
                    ]
                  }
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        <AspectRatio ratio={16 / 9}>
          {isLoading ? (
            <ImageSkeleton />
          ) : (
            <motion.img
              layout
              className="w-full h-full object-cover object-center rounded-t-md"
              src={data.image_url}
              alt={`Picture of ${data.name}`}
            />
          )}
        </AspectRatio>
      </motion.header>

      {isLoading ? (
        <DescriptionSkeleton />
      ) : (
        <motion.p layout className="text-gray-500 text-sm mt-6">
          {data.description}
        </motion.p>
      )}

      <AnimatePresence>
        {open && (
          <motion.section
            layout
            variants={container}
            initial="closed"
            animate={open ? 'open' : 'closed'}
            exit="closed"
            className="mt-8 flex flex-col space-y-2"
          >
            <motion.h3 layout variants={item} className="text-xl font-bold">
              Ingredients
            </motion.h3>

            {data?.ingredients.map(ingredient => (
              <motion.p
                layout
                variants={item}
                className="text-sm text-gray-500"
                key={Math.round(Math.random() * 10000)}
              >
                {ingredient}
              </motion.p>
            ))}

            <motion.div layout variants={container} className="pt-5 space-y-2">
              {data?.instructions.map((instruction, index) => (
                <motion.div
                  layout
                  variants={item}
                  className="text-sm bg-gray-100 border border-gray-300 py-2 px-3 rounded-md"
                  key={Math.round(Math.random() * 10000)}
                >
                  <h4 className="text-lg font-bold">Step {index + 1}</h4>
                  {instruction}
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
