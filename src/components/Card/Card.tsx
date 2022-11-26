import React from 'react'

interface CardProps {
  children: React.ReactNode
}

export default function Card(props: CardProps) {
  const { children } = props
  return (
    <div className="p-4 bg-blue-50 shadow-lg rounded-sm min-w-full flex flex-col gap-4 items-center">
      {children}
    </div>
  )
}
