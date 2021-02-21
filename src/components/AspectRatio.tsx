import { ReactElement, ReactNode, ReactNodeArray } from 'react'

import { motion } from 'framer-motion'

interface IAspectRatio {
  ratio: number
  children: ReactElement | ReactNode | ReactNodeArray
  className?: string
}

export default function AspectRatio({
  ratio,
  children,
  className
}: IAspectRatio) {
  return (
    <motion.div
      layout
      style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
      className={`relative w-full ${className || ''}`}
    >
      <motion.div layout className="absolute inset-0">
        {children}
      </motion.div>
    </motion.div>
  )
}
