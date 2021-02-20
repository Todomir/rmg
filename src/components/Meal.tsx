import { useQuery } from 'react-query'

import AspectRatio from './AspectRatio'

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

  return (
    <div className="w-full bg-gray-50 pb-9 px-6 mt-8 rounded-md shadow-md">
      <header className="relative -mx-6 shadow-lg">
        <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-gray-800 opacity-60 z-10" />

        {isLoading ? (
          <TitleSkeleton />
        ) : (
          <div className="absolute z-20 bottom-0 flex items-center justify-between w-full">
            <h1 className="font-extrabold text-3xl p-4 text-white">
              {data.name}
            </h1>
            {isFetching && (
              <span className="bg-green-500 z-20 px-2 py-1 mr-4 text-xs text-white font-bold rounded-md animate-pulse">
                Fetching new meal{' '}
                {
                  foodEmojis[
                    Math.round(Math.random() * (foodEmojis.length - 1))
                  ]
                }
              </span>
            )}
          </div>
        )}
        <AspectRatio ratio={16 / 9}>
          {isLoading ? (
            <ImageSkeleton />
          ) : (
            <img
              className="w-full h-full object-cover object-center rounded-t-md"
              src={data.image_url}
              alt={`Picture of ${data.name}`}
            />
          )}
        </AspectRatio>
      </header>

      <p className="text-gray-500 text-sm mt-6">
        {isLoading ? <DescriptionSkeleton /> : data.description}
      </p>
    </div>
  )
}
