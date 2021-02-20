import { ReactElement, ReactNode, ReactNodeArray } from 'react'

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
    <div
      style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
      className={`relative w-full ${className || ''}`}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  )
}
