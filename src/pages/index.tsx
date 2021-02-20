import { useQueryClient } from 'react-query'

import Meal from '@components/Meal'

export default function Home() {
  const queryClient = useQueryClient()

  return (
    <div className="w-screen h-screen flex justify-center items-center p-7">
      <main className="p-8 rounded-md ring-4 ring-gray-900 bg-gray-100 max-w-2xl">
        <h1 className="font-black text-5xl">Random Meal Generator</h1>
        <h2 className="font-medium text-xl">
          Get a random recipe for your delight.
        </h2>

        <Meal />

        <button
          onClick={() => queryClient.refetchQueries('meals')}
          className="w-full py-4 mt-4 bg-blue-500 text-white text-lg font-bold rounded-md"
        >
          Get random meal
        </button>
      </main>
    </div>
  )
}
