"use client"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { AnimatePresence, motion } from "motion/react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"

export type Variant = "default" | "error" | "warning" | "success"

type ToastProps = {
	id?: number
	text: string
	type?: Variant
	className?: string
	icon?: React.ReactNode
	content?: string | React.ReactNode
}

type Toast = Omit<ToastProps, "id" | "type">
type ToastFunction = (props: ToastProps) => void
type ToastManager = Record<Variant, ToastFunction>

export type ToastContextType = { list: ToastProps[]; toast: ToastManager }

const ToastContext = createContext<ToastContextType | null>(null)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
	const [list, setList] = useState<ToastProps[]>([])

	const createToast = (type: Variant) => {
		return ({ text, className, icon, content }: Toast) => {
			const id = Math.random()
			if (list.length > 4) setList(prev => prev.slice(1, list.length))
			setList(prev => [...prev, { id, text, icon, type, className, content }])
			setTimeout(() => {
				setList(prev => prev.filter(item => item.id !== id))
			}, 5000)
		}
	}

	const toast = {
		default: createToast("default"),
		error: createToast("error"),
		success: createToast("success"),
		warning: createToast("warning")
	}

	const contextValue = useMemo(() => ({ list, toast }), [list, toast])

	return (
		<ToastContext.Provider value={contextValue}>
			<Toast />
			{children}
		</ToastContext.Provider>
	)
}

export const useToast = () => {
	const context = useContext(ToastContext)
	if (!context) throw new Error("useToast must be used within a ToastProvider")
	return context
}

export const toastVariants = cva("pointer-events-none flex items-center gap-1 rounded-full py-1 px-2", {
	variants: {
		variant: {
			default:
				"bg-neutral-50 text-neutral-600 ring-1 ring-neutral-600 ring-inset dark:bg-neutral-800/75 dark:text-neutral-400 dark:ring-neutral-700",
			success: "bg-background-success text-success border border-border-success",
			warning:
				"bg-orange-50 text-orange-600 ring-1 ring-orange-600 ring-inset dark:bg-orange-400/75 dark:text-orange-200 dark:ring-orange-400",
			error: "bg-red-50 text-red-600 ring-1 ring-red-600 ring-inset dark:bg-red-500/75 dark:text-red-300 dark:ring-red-500"
		}
	},
	defaultVariants: { variant: "default" }
})

export function Toast() {
	const [mounted, setMounted] = useState(false)
	const { list } = useToast()

	useEffect(() => {
		setMounted(true)
		return () => setMounted(false)
	}, [])

	if (!mounted) return null

	return createPortal(
		<div className="pointer-events-none fixed top-4 z-[9999] flex w-full flex-col items-center justify-center gap-1">
			<AnimatePresence>
				{list.map(({ id, text, icon, type, className, content }) => (
					<motion.div
						layout
						key={id}
						initial={{ y: -15, scale: 0.95, opacity: 0 }}
						animate={{ y: 0, scale: 1, opacity: 1 }}
						exit={{ y: -15, scale: 0.95, opacity: 0 }}
						transition={{ duration: 0.35, ease: "easeOut" }}
						className={cn(toastVariants({ variant: type }), className)}>
						{icon}
						<span className="text-xs font-medium md:text-sm">{text}</span>
						{content}
					</motion.div>
				))}
			</AnimatePresence>
		</div>,
		document.body
	)
}
