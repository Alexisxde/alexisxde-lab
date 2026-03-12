"use client"
import useClickOutside from "@/hooks/useClickOutside"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion, Transition } from "motion/react"
import React, { cloneElement, createContext, isValidElement, memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"

export type ModalContextType = {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export type ModalProps = {
	children: React.ReactNode
	isOpen: boolean
	onOpenChange?: (open: boolean) => void
}

export function Modal ({ children, isOpen: controlledOpen, onOpenChange }: ModalProps) {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
	const isControlled = controlledOpen !== undefined
	const isOpen = isControlled ? controlledOpen : uncontrolledOpen
	
	const setIsOpen = useCallback((nextOpen: boolean) => {
		if (!isControlled) setUncontrolledOpen(nextOpen)
		onOpenChange?.(nextOpen)
	}, [isControlled, onOpenChange])

	const contextValue = useMemo(() => ({ isOpen, onOpenChange: setIsOpen }), [isOpen, setIsOpen])

	return (
		<ModalContext.Provider value={contextValue}>
			{children}
		</ModalContext.Provider>
	)
}

export const useModal = () => {
	const context = useContext(ModalContext)
	if (!context) throw new Error("useModal must be used within a ModalProvider")
	return context
}

export type ModalTriggerProps = React.ComponentPropsWithRef<"button"> & { asChild?: boolean }

export const ModalTrigger = memo(({ children, className, asChild = false, onClick, ...props }: ModalTriggerProps) => {
	const { onOpenChange } = useModal()

	const handleOpen = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		onOpenChange(true)
		onClick?.(e)
	}, [onOpenChange, onClick])

	if (asChild && isValidElement(children)) {
		const childProps = children.props as any
		return cloneElement(children as React.ReactElement<any>, {
			...childProps,
			onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
				handleOpen(e)
				childProps.onClick?.(e)
			},
			className: cn(childProps.className, className),
			...props
		})
	}

	return (
		<button
			onClick={handleOpen}
			className={cn(
				"bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors outline-none",
				className
			)}
			{...props}>
			{children}
		</button>
	)
})

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
			{isOpen ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={cn("fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs", className)}>
					{children}
				</motion.div>
			) : null}
		</AnimatePresence>,
		document.body
	)
}

export type ModalHeaderProps = React.ComponentPropsWithRef<"header">

export function ModalHeader({ children, className, ...props }: ModalHeaderProps) {
	return (
		<header className={cn("flex items-center justify-between", className)} {...props}>
			{children}
		</header>
	)
}

export type ModalCloseProps = React.ComponentPropsWithRef<"button"> & { asChild?: boolean } 

export const ModalClose = memo(({ children, className, asChild = false, onClick, ...props }: ModalCloseProps) => {
	const { onOpenChange } = useModal()

	const handleClose = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		onOpenChange(false)
		onClick?.(e)
	}, [onOpenChange, onClick])

	if (asChild && isValidElement(children)) {
		const childProps = children.props as any
		return cloneElement(children as React.ReactElement<any>, {
			...childProps,
			onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
				handleClose(e)
				childProps.onClick?.(e)
			},
			className: cn(childProps.className, className),
			...props
		})
	}

	return (
		<button
			onClick={handleClose}
			className={cn(
				"hover:bg-muted text-secondary-foreground inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors outline-none",
				className
			)}
			{...props}>
			{children}
		</button>
	)
})

ModalClose.displayName = "ModalClose"

export type ModalActionProps = React.ComponentPropsWithRef<"button"> & { asChild?: boolean }

export const ModalAction = memo(({ children, className, asChild = false, onClick, ...props }: ModalActionProps) => {
	const { onOpenChange } = useModal()

	const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		onClick?.(e)
		onOpenChange(false)
	}, [onClick, onOpenChange])

	if (asChild && isValidElement(children)) {
		const childProps = children.props as any
		return cloneElement(children as React.ReactElement<any>, {
			...childProps,
			onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
				handleClick(e)
				childProps.onClick?.(e)
			},
			className: cn(childProps.className, className)
		})
	}

	return (
		<button
			onClick={handleClick}
			className={cn(
				"bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors outline-none",
				className
			)}
			{...props}>
			{children}
		</button>
	)
})

ModalAction.displayName = "ModalAction"

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
	const { isOpen, onOpenChange } = useModal()
	const modalRef = useRef<HTMLDivElement>(null!)

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden")
		} else {
			document.body.classList.remove("overflow-hidden")
		}
	}, [isOpen])

	useClickOutside(modalRef, () => {
		if (isOpen) onOpenChange(false)
	})

	const initialRotation = from === "top" || from === "left" ? "20deg" : "-20deg"
	const isVertical = from === "top" || from === "bottom"
	const rotateAxis = isVertical ? "rotateX" : "rotateY"

	return (
		<ModalPortal>
			<motion.section
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
				className={cn("bg-card border-border relative w-fit space-y-2 rounded-lg border p-4 shadow-2xl", className)}>
				{children}
			</motion.section>
		</ModalPortal>
	)
}

export type ModalContentProps = React.ComponentPropsWithRef<"main"> 

export function ModalContent({ children, className, ...props }: ModalContentProps) {
	return (
		<main className={cn("flex flex-col gap-2", className)} {...props}>
			{children}
		</main>
	)
}

export type ModalFooterProps = React.ComponentPropsWithRef<"footer">

export function ModalFooter({ children, className, ...props }: ModalFooterProps) {
	return (
		<footer className={cn("mt-4 flex items-center justify-end gap-2", className)} {...props}>
			{children}
		</footer>
	)
}

Modal.Trigger = ModalTrigger
Modal.Container = ModalContainer
Modal.Header = ModalHeader
Modal.Content = ModalContent
Modal.Footer = ModalFooter
Modal.Action = ModalAction
Modal.Close = ModalClose

export default Modal
