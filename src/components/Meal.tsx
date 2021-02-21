import { useRouter } from 'next/dist/client/router'

import { useQuery } from 'react-query'

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
    <div className="absolute z-20 bottom-0 m-4 w-48 md:w-80 h-10 bg-gray-400 animate-pulse mt-6 rounded" />
  )
}

export default function Meal() {
  const router = useRouter()

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
    { refetchOnWindowFocus: false, refetchOnMount: false }
  )

  const setSelectedMeal = () => {
    if (isLoading || isFetching || !data) return
    localStorage.setItem('meal', JSON.stringify(data))
    router.push('/meal')
  }

  return (
    <motion.div
      layout
      layoutId="meal-container"
      className="w-full bg-gray-50 pb-9 px-6 mt-8 rounded-md border border-gray-200 cursor-pointer"
      onClick={() => setSelectedMeal()}
    >
      <motion.header
        layout
        layoutId="meal-header"
        className="relative h-60 -mx-6 shadow-lg rounded-t-md"
        style={{
          backgroundImage: `url("${data?.image_url}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <motion.div className="w-full h-full absolute inset-0 bg-gradient-to-t from-gray-800 opacity-60 z-10" />

        {isLoading ? (
          <TitleSkeleton />
        ) : (
          <motion.div
            layout
            layoutId="meal-title-container"
            className="absolute z-20 bottom-0 flex flex-col-reverse p-4 justify-between w-full"
          >
            <motion.h1
              layout="position"
              layoutId="meal-title"
              className="font-extrabold text-2xl sm:text-4xl text-white max-w-sm"
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
      </motion.header>

      {isLoading ? (
        <DescriptionSkeleton />
      ) : (
        <motion.p
          layout="position"
          layoutId="meal-description"
          className="text-gray-500 text-sm mt-6"
        >
          {data.description}
        </motion.p>
      )}
    </motion.div>
  )
}
