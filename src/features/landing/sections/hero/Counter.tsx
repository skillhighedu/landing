'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useAnimationFrame, useInView } from 'framer-motion'
import type { CounterProps } from './types'


export function Counter({ from = 0, to, duration = 1, suffix = '',color="" }: CounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' }) // Trigger slightly before it hits bottom
  const count = useMotionValue(from)
  const spring = useSpring(count, { duration, stiffness: 80, damping: 20 })
  const [display, setDisplay] = useState(from.toString())

  useAnimationFrame(() => {
    const current = spring.get()
    if (current < to) {
      setDisplay(Math.floor(current).toLocaleString() + suffix)
    } else {
      setDisplay(to.toLocaleString() + suffix)
    }
  })

  useEffect(() => {
    if (isInView) {
      count.set(from)
      spring.set(to)
    }
  }, [isInView, from, to])

  return (
    <motion.span ref={ref} className={` text-3xl font-bold ${color}`}>
      {display}
    </motion.span>
  )
}
