"use client"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion, type MotionValue, useMotionValue, useSpring, useTransform } from "motion/react"
import { createContext, useContext, useRef, useState } from "react"

export type Option = { title: string; icon: React.ReactNode }

type DockContextType = { mouseX: MotionValue<number> }

const DockContext = createContext<DockContextType | null>(null!)

const TRANSITION = { mass: 0.1, stiffness: 150, damping: 12 }
const INPUT_RANGE = [-150, 0, 150]
const OUTPUT_RANGE_OPTION = [40, 80, 40]
const OUTPUT_RANGE_ICON = [20, 40, 20]

export interface DockProps {
	children: React.ReactNode
	className?: string
}

export function Dock({ children, className }: DockProps) {
	const mouseX = useMotionValue(Infinity)

	return (
		<DockContext.Provider value={{ mouseX }}>
			<motion.div
				onMouseMove={e => mouseX.set(e.pageX)}
				onMouseLeave={() => mouseX.set(Infinity)}
				className={cn("bg-card border-border mx-auto flex h-16 items-end gap-4 rounded-2xl border px-4 pb-3", className)}>
				{children}
			</motion.div>
		</DockContext.Provider>
	)
}

function useDock() {
	const context = useContext(DockContext)
	if (!context) throw new Error("useDock must be used within a DockProvider")
	return context
}

export interface DockAnchorProps extends Option {
	href: string
}

export function DockAnchor({ title, icon, href }: DockAnchorProps) {
	const [isHovered, setIsHovered] = useState(false)
	const ref = useRef<HTMLDivElement | null>(null!)
	const { mouseX } = useDock()

	let distance = useTransform(mouseX, val => {
		let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
		return val - bounds.x - bounds.width / 2
	})

	let widthTransform = useTransform(distance, INPUT_RANGE, OUTPUT_RANGE_OPTION)
	let heightTransform = useTransform(distance, INPUT_RANGE, OUTPUT_RANGE_OPTION)

	let widthTransformIcon = useTransform(distance, INPUT_RANGE, OUTPUT_RANGE_ICON)
	let heightTransformIcon = useTransform(distance, INPUT_RANGE, OUTPUT_RANGE_ICON)

	let width = useSpring(widthTransform, TRANSITION)
	let height = useSpring(heightTransform, TRANSITION)

	let widthIcon = useSpring(widthTransformIcon, TRANSITION)
	let heightIcon = useSpring(heightTransformIcon, TRANSITION)

	return (
		<a href={href}>
			<motion.div
				ref={ref}
				style={{ width, height }}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className="bg-secondary relative flex aspect-square items-center justify-center rounded-full">
				<AnimatePresence>
					{isHovered && (
						<motion.div
							initial={{ opacity: 0, y: 10, x: "-50%" }}
							animate={{ opacity: 1, y: 0, x: "-50%" }}
							exit={{ opacity: 0, y: 2, x: "-50%" }}
							className="bg-secondary text-primary absolute -top-7 left-1/2 w-fit rounded-md px-2 py-0.5 text-xs whitespace-pre">
							{title}
						</motion.div>
					)}
				</AnimatePresence>
				<motion.div style={{ width: widthIcon, height: heightIcon }} className="flex items-center justify-center">
					{icon}
				</motion.div>
			</motion.div>
		</a>
	)
}

export interface DockButtonProps extends Option {
	onClick: () => unknown
	className?: string
}

export function DockButton({ title, icon, className, onClick }: DockButtonProps) {
	const [isHovered, setIsHovered] = useState(false)
	const ref = useRef<HTMLDivElement | null>(null!)
	const { mouseX } = useDock()

	let distance = useTransform(mouseX, val => {
		let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
		return val - bounds.x - bounds.width / 2
	})

	let widthTransform = useTransform(distance, INPUT_RANGE, OUTPUT_RANGE_OPTION)
	let heightTransform = useTransform(distance, INPUT_RANGE, OUTPUT_RANGE_OPTION)

	let widthTransformIcon = useTransform(distance, INPUT_RANGE, OUTPUT_RANGE_ICON)
	let heightTransformIcon = useTransform(distance, INPUT_RANGE, OUTPUT_RANGE_ICON)

	let width = useSpring(widthTransform, TRANSITION)
	let height = useSpring(heightTransform, TRANSITION)

	let widthIcon = useSpring(widthTransformIcon, TRANSITION)
	let heightIcon = useSpring(heightTransformIcon, TRANSITION)

	return (
		<button onClick={onClick} className="cursor-pointer">
			<motion.div
				ref={ref}
				style={{ width, height }}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className={cn("bg-secondary relative flex aspect-square items-center justify-center rounded-full", className)}>
				<AnimatePresence>
					{isHovered && (
						<motion.div
							initial={{ opacity: 0, y: 10, x: "-50%" }}
							animate={{ opacity: 1, y: 0, x: "-50%" }}
							exit={{ opacity: 0, y: 2, x: "-50%" }}
							className="bg-secondary text-primary absolute -top-7 left-1/2 w-fit rounded-md px-2 py-0.5 text-xs whitespace-pre">
							{title}
						</motion.div>
					)}
				</AnimatePresence>
				<motion.div style={{ width: widthIcon, height: heightIcon }} className="flex items-center justify-center">
					{icon}
				</motion.div>
			</motion.div>
		</button>
	)
}
