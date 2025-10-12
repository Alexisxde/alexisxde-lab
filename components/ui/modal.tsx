"use client"
import Button, { type ButtonProps } from "@/components/ui/button"
import useClickOutside from "@/hooks/useClickOutside"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion, Transition } from "motion/react"
import React, { createContext, isValidElement, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"

export type ModalContextType = {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalContext = createContext<ModalContextType | null>(null)

export type ModalProps = {
	children: React.ReactNode
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalProvider = ({ children, isOpen, setIsOpen }: ModalProps) => {
	const contextValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen])

	return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
}

export const useModal = () => {
	const context = useContext(ModalContext)
	if (!context) throw new Error("useModal must be used within a ModalProvider")
	return context
}

export const Modal = ({ children, isOpen, setIsOpen }: ModalProps) => {
	return (
		<ModalProvider isOpen={isOpen} setIsOpen={setIsOpen}>
			{children}
		</ModalProvider>
	)
}

export type ModalTriggerProps = {
	children: React.ReactNode
	className?: string
	asChild?: boolean
} & ButtonProps

export function ModalTrigger({ children, className, asChild = false, ...props }: ModalTriggerProps) {
	const { setIsOpen } = useModal()

	if (asChild && isValidElement(children)) {
		const MotionComponent = motion.create(children.type as React.ForwardRefExoticComponent<any>)
		const childProps = children.props as Record<string, unknown>

		return <MotionComponent {...childProps} onClick={() => setIsOpen(true)} className={childProps.className} />
	}

	return (
		<Button onClick={() => setIsOpen(true)} size={"lg"} className={cn("rounded-md", className)} {...props}>
			{children}
		</Button>
	)
}

export type ModalPortalProps = { children: React.ReactNode; className?: string }

function ModalPortal({ children, className }: ModalPortalProps) {
	const [mounted, setMounted] = useState(false)
	const { isOpen } = useModal()

	useEffect(() => {
		setMounted(true)
		return () => setMounted(false)
	}, [])

	if (!mounted) return null

	return createPortal(
		<AnimatePresence mode="wait">
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={cn("fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs", className)}>
					{children}
				</motion.div>
			)}
		</AnimatePresence>,
		document.body
	)
}

export type ModalHeader = { children: React.ReactNode; className?: string }

export function ModalHeader({ children, className }: ModalHeader) {
	return <div className={cn("flex items-center justify-between", className)}>{children}</div>
}

export type ModalCloseProps = {
	children: React.ReactNode
	className?: string
} & ButtonProps

export function ModalClose({ children, className, ...props }: ModalCloseProps) {
	const { setIsOpen } = useModal()
	const handleClick = useCallback(() => setIsOpen(false), [setIsOpen])

	return (
		<Button variant={"ghost"} size={"lg"} className={cn("rounded-full", className)} onClick={handleClick} {...props}>
			{children}
		</Button>
	)
}

export type ModalActionProps = {
	children: React.ReactNode
	className?: string
	onClick?: () => void
} & ButtonProps

export function ModalAction({ children, className, onClick, ...props }: ModalActionProps) {
	const { setIsOpen } = useModal()

	const handleClick = () => {
		onClick?.()
		setIsOpen(false)
	}

	return (
		<Button size={"lg"} className={cn("", className)} onClick={handleClick} {...props}>
			{children}
		</Button>
	)
}

export type ModalContainerProps = {
	children: React.ReactNode
	className?: string
	from?: "top" | "bottom" | "left" | "right"
	transition?: Transition
}

export function ModalContainer({
	children,
	className,
	from = "top",
	transition = { type: "spring", stiffness: 150, damping: 25 }
}: ModalContainerProps) {
	const { isOpen, setIsOpen } = useModal()
	const modalRef = useRef<HTMLDivElement>(null!)

	useEffect(() => {
		if (isOpen) document.body.classList.add("overflow-hidden")
		else document.body.classList.remove("overflow-hidden")
	}, [isOpen])

	useClickOutside(modalRef, () => {
		if (isOpen) setIsOpen(false)
	})

	const initialRotation = from === "top" || from === "left" ? "20deg" : "-20deg"
	const isVertical = from === "top" || from === "bottom"
	const rotateAxis = isVertical ? "rotateX" : "rotateY"

	return (
		<ModalPortal>
			<motion.div
				ref={modalRef}
				initial="closed"
				animate="open"
				exit="closed"
				variants={{
					open: {
						opacity: 1,
						filter: "blur(0px)",
						transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`,
						transition: { ...transition, when: "beforeChildren", staggerChildren: 0.1 }
					},
					closed: {
						opacity: 0,
						filter: "blur(4px)",
						transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
						transition: { ...transition, when: "afterChildren", staggerChildren: 0.1 }
					}
				}}
				className={cn("bg-card border-border absolute w-fit space-y-2 rounded-lg border p-4", className)}>
				{children}
			</motion.div>
		</ModalPortal>
	)
}

export type ModalContentProps = {
	children: React.ReactNode
	className?: string
}

export function ModalContent({ children, className }: ModalContentProps) {
	return <div className={cn("flex flex-col gap-2 space-y-2", className)}>{children}</div>
}

export type ModalFooterProps = {
	children: React.ReactNode
	className?: string
}

export function ModalFooter({ children, className }: ModalFooterProps) {
	return <div className={cn("flex items-center justify-end gap-2 space-y-2", className)}>{children}</div>
}
