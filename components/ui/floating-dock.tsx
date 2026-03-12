"use client"
import Button from "@/components/ui/button"
import useClickOutside from "@/hooks/useClickOutside"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import React, { createContext, isValidElement, memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"

export type Option = { title: string; icon: React.ReactNode; position?: "left" | "right" }

type FloatingDockContextType = {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	tooltip?: boolean
}

const FloatingDockContext = createContext<FloatingDockContextType | null>(null)

export interface FloatingDockProps {
	children: React.ReactNode
	className?: string
	tooltip?: boolean
}

export function FloatingDock({ children, tooltip = true, className }: FloatingDockProps) {
	const [isOpen, setIsOpen] = useState(false)
	const contextValue = useMemo(() => ({ isOpen, setIsOpen, tooltip }), [isOpen, setIsOpen, tooltip])
	const dockRef = useRef<HTMLDivElement>(null!)

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsOpen(false)
		}

		document.addEventListener("keydown", handleKeyDown)

		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [setIsOpen])

	useClickOutside(dockRef, () => {
		if (isOpen) setIsOpen(false)
	})

	return (
		<FloatingDockContext.Provider value={contextValue}>
			<div ref={dockRef} className={cn("relative", className)}>
				{children}
			</div>
		</FloatingDockContext.Provider>
	)
}

function useFloatingDock() {
	const context = useContext(FloatingDockContext)
	if (!context) throw new Error("useFloatingDock must be used within a FloatingDockProvider")
	return context
}

export interface FloatingDockTriggerProps {
	asChild?: boolean
	children?: React.ReactNode
	className?: string
	icon?: React.ReactNode
}

export const FloatingDockTrigger = memo(({ children, className, asChild = false, icon }: FloatingDockTriggerProps) => {
	const { setIsOpen, isOpen } = useFloatingDock()

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Escape" || e.key === " ") {
				e.preventDefault()
				setIsOpen(prev => !prev)
			}
		},
		[setIsOpen]
	)

	const handleToggle = useCallback(() => setIsOpen(prev => !prev), [setIsOpen])

	if (asChild && isValidElement(children)) {
		const MotionComponent = motion.create(children.type as React.ForwardRefExoticComponent<any>)
		const childProps = children.props as Record<string, unknown>

		return <MotionComponent {...childProps} onClick={handleToggle} className={childProps.className} />
	}

	return (
		<Button
			onKeyDown={handleKeyDown}
			onClick={handleToggle}
			size={"icon"}
			className={cn("size-10 rounded-full", className)}>
			{icon ?? <Plus className="size-5 transition-transform duration-300" style={{ rotate: isOpen ? "45deg" : "0deg" }} />}
		</Button>
	)
})

export interface FloatingDockContentProps {
	children: React.ReactNode
	className?: string
}

export function FloatingDockContent({ children, className }: FloatingDockContentProps) {
	const { isOpen } = useFloatingDock()

	return (
		<AnimatePresence>
			{isOpen ? (
				<motion.div layoutId="nav" className={cn("absolute inset-x-0 bottom-full mb-2", className)}>
					<motion.div
						variants={{
							hidden: { opacity: 0, transition: { staggerChildren: 0.1, when: "afterChildren" } },
							visible: { opacity: 1, transition: { staggerChildren: -0.1, when: "beforeChildren" } }
						}}
						initial="hidden"
						animate="visible"
						exit="hidden"
						className="flex flex-col gap-1.5">
						{children}
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>
	)
}

export interface FloatingDockAnchorProps extends Option {
	href?: string
	className?: string
}

export const FloatingDockAnchor = memo(({ title, icon, href, className, position = "right" }: FloatingDockAnchorProps) => {
	const { tooltip } = useFloatingDock()
	const [isHovered, setIsHovered] = useState(false)

	const handleMouseEnter = useCallback(() => setIsHovered(true), [])
	const handleMouseLeave = useCallback(() => setIsHovered(false), [])

	return (
		<motion.a
			variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
			href={href}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={cn("bg-secondary relative z-1 flex size-10 cursor-pointer items-center justify-center rounded-full", className)}>
			<AnimatePresence>
				{isHovered && tooltip ? (
					<motion.div
						initial={{ opacity: 0, x: position === "left" ? -20 : 20, y: "50%" }}
						animate={{ opacity: 1, x: 8, y: "50%" }}
						exit={{ opacity: 0, x: position === "left" ? -20 : 20, y: "50%" }}
						className={cn(
							"bg-secondary text-primary pointer-events-none absolute z-0 w-fit -translate-y-1/2 rounded-md px-2 py-0.5 text-xs whitespace-pre",
							{ "right-13": position === "right", "left-5": position === "left" }
						)}>
						{title}
					</motion.div>
				) : null}
			</AnimatePresence>
			<div className="flex size-5 items-center justify-center">{icon}</div>
		</motion.a>
	)
})

FloatingDockAnchor.displayName = "FloatingDockAnchor"

export interface FloatingDockButtonProps extends Option {
	onClick?: () => unknown
	className?: string
}

export const FloatingDockButton = memo(({ title, icon, onClick, position = "right" }: FloatingDockButtonProps) => {
	const { tooltip, setIsOpen } = useFloatingDock()
	const [isHovered, setIsHovered] = useState(false)

	const handleClick = useCallback(() => {
		setIsOpen(false)
		onClick?.()
	}, [onClick, setIsOpen])

	const handleMouseEnter = useCallback(() => setIsHovered(true), [])
	const handleMouseLeave = useCallback(() => setIsHovered(false), [])

	return (
		<motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="relative">
			<button
				onClick={handleClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className="bg-secondary relative z-1 flex size-10 cursor-pointer items-center justify-center rounded-full">
				<div className="flex items-center justify-center">{icon}</div>
			</button>
			<AnimatePresence>
				{isHovered && tooltip ? (
					<motion.div
						initial={{ opacity: 0, x: position === "left" ? -20 : 20, y: "50%" }}
						animate={{ opacity: 1, x: 8, y: "50%" }}
						exit={{ opacity: 0, x: position === "left" ? -20 : 20, y: "50%" }}
						className={cn(
							"bg-secondary text-primary absolute top-1/4 z-0 w-fit -translate-y-1/2 rounded-md px-2 py-0.5 text-xs whitespace-pre",
							{ "right-13": position === "right", "left-5": position === "left" }
						)}>
						{title}
					</motion.div>
				) : null}
			</AnimatePresence>
		</motion.div>
	)
})

FloatingDockButton.displayName = "FloatingDockButton"

FloatingDock.Trigger = FloatingDockTrigger
FloatingDock.Content = FloatingDockContent
FloatingDock.Anchor = FloatingDockAnchor
FloatingDock.Button = FloatingDockButton

export default FloatingDock
