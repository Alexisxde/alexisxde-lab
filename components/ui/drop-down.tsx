"use client"
import useClickOutside from "@/hooks/useClickOutside"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"
import React, { cloneElement, createContext, isValidElement, memo, useCallback, useContext, useMemo, useRef, useState } from "react"

// --- Context ---
type DropDownMenuContextType = {
	isOpen: boolean
	setIsOpen: (open: boolean) => void
	triggerRef: React.RefObject<HTMLButtonElement | null>
}

const DropDownMenuContext = createContext<DropDownMenuContextType | null>(null)

const useDropDownMenu = () => {
	const context = useContext(DropDownMenuContext)
	if (!context) throw new Error("DropDownMenu components must be used within DropDownMenu")
	return context
}

// --- Components ---

export interface DropDownMenuProps {
	children: React.ReactNode
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

export function DropDownMenu({ children, open: controlledOpen, onOpenChange }: DropDownMenuProps) {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
	const triggerRef = useRef<HTMLButtonElement>(null)

	const isControlled = controlledOpen !== undefined
	const isOpen = isControlled ? controlledOpen : uncontrolledOpen

	const setIsOpen = useCallback((nextOpen: boolean) => {
		if (!isControlled) setUncontrolledOpen(nextOpen)
		onOpenChange?.(nextOpen)
	}, [isControlled, onOpenChange])

	const contextValue = useMemo(() => ({ isOpen, setIsOpen, triggerRef }), [isOpen, setIsOpen])

	return (
		<DropDownMenuContext.Provider value={contextValue}>
			<div className="relative inline-block">{children}</div>
		</DropDownMenuContext.Provider>
	)
}

export interface DropDownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean
}

export const DropDownMenuTrigger = memo(({ children, className, asChild = false, ...props }: DropDownMenuTriggerProps) => {
	const { isOpen, setIsOpen, triggerRef } = useDropDownMenu()

	const handleToggle = useCallback((e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setIsOpen(!isOpen)
	}, [isOpen, setIsOpen])

	if (asChild && isValidElement(children)) {
		const childProps = children.props as any
		return cloneElement(children as React.ReactElement<any>, {
			ref: triggerRef,
			onClick: (e: React.MouseEvent) => {
				handleToggle(e)
				childProps.onClick?.(e)
			},
			className: cn(childProps.className, className)
		})
	}

	return (
		<button
			ref={triggerRef}
			onClick={handleToggle}
			className={cn("flex cursor-pointer items-center justify-center gap-2 outline-none", className)}
			{...props}>
			{children}
		</button>
	)
})

const contentVariants = {
	hidden: { opacity: 0, scale: 0.95, y: -10 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { duration: 0.2, ease: "easeOut", staggerChildren: 0.05 }
	},
	exit: {
		opacity: 0,
		scale: 0.95,
		y: -10,
		transition: { duration: 0.15, ease: "easeIn" }
	}
}

export interface DropDownMenuContentProps extends React.HTMLAttributes<HTMLUListElement> {}

export function DropDownMenuContent({ children, className, ...props }: DropDownMenuContentProps) {
	const { isOpen, setIsOpen, triggerRef } = useDropDownMenu()
	const contentRef = useRef<HTMLUListElement>(null!)

	useClickOutside(contentRef, (event) => {
		if (isOpen && triggerRef.current && !triggerRef.current.contains(event?.target as Node)) {
			setIsOpen(false)
		}
	})

	return (
		<AnimatePresence>
			{isOpen ? (
				<motion.ul
					ref={contentRef}
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={contentVariants}
					style={{ originY: "top" }}
					className={cn(
						"bg-card border-border absolute top-full right-0 z-50 mt-2 min-w-[8rem] overflow-hidden rounded-lg border p-1 shadow-xl outline-none",
						className
					)}
					{...props}>
					{children}
				</motion.ul>
			) : null}
		</AnimatePresence>
	)
}

const itemVariants = {
	hidden: { opacity: 0, y: -5 },
	visible: { opacity: 1, y: 0 }
}

export interface DropDownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean
}

export const DropDownMenuItem = memo(({ children, className, asChild = false, onClick, ...props }: DropDownMenuItemProps) => {
	const { setIsOpen } = useDropDownMenu()

	const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		onClick?.(e)
		setIsOpen(false)
	}, [onClick, setIsOpen])

	if (asChild && isValidElement(children)) {
		const childProps = children.props as any
		return (
			<motion.li variants={itemVariants}>
				{cloneElement(children as React.ReactElement<any>, {
					className: cn(
						"text-primary hover:bg-muted flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors outline-none",
						childProps.className,
						className
					),
					onClick: (e: React.MouseEvent) => {
						setIsOpen(false)
						childProps.onClick?.(e)
					}
				})}
			</motion.li>
		)
	}

	return (
		<motion.li variants={itemVariants}>
			<button
				onClick={handleClick}
				className={cn(
					"text-primary hover:bg-muted flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors outline-none disabled:pointer-events-none disabled:opacity-50",
					className
				)}
				{...props}>
				{children}
			</button>
		</motion.li>
	)
})

DropDownMenuItem.displayName = "DropDownMenuItem"

DropDownMenu.Trigger = DropDownMenuTrigger
DropDownMenu.Content = DropDownMenuContent
DropDownMenu.Item = DropDownMenuItem

export default DropDownMenu
