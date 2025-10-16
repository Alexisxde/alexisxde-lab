"use client"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { createContext, useContext, useId, useState } from "react"

type TabContextType = {
	tabId: string
	tab: string | number | null
	setTab: React.Dispatch<React.SetStateAction<string | number | null>>
}

const TabContext = createContext<TabContextType | null>(null!)

export type TabProps = { children: React.ReactNode; defaultValue: string | number; className?: string }

export function Tab({ children, defaultValue, className }: TabProps) {
	const tabId = useId()
	const [tab, setTab] = useState<string | number | null>(defaultValue ?? null)

	return (
		<TabContext.Provider value={{ tabId, tab, setTab }}>
			<div className={cn("flex w-full flex-col", className)}>{children}</div>
		</TabContext.Provider>
	)
}

function useTab() {
	const context = useContext(TabContext)
	if (!context) throw new Error("useTab must be used within a TabProvider")
	return context
}

export type TabHeaderProps = { children: React.ReactNode; className?: string }

export function TabHeader({ children, className }: TabHeaderProps) {
	return (
		<header
			className={cn(
				"bg-card border-border sticky top-0 z-30 my-2 flex flex-1 rounded-md border px-4 py-2 select-none",
				className
			)}>
			{children}
		</header>
	)
}

export type TabOptionProps = { children: React.ReactNode; value: string | number; className?: string }

export function TabOption({ value, children, className }: TabOptionProps) {
	const { tabId, tab, setTab } = useTab()

	const handleClick = () => {
		setTab(value)
	}

	return (
		<button
			className={cn(
				"text-primary relative flex h-8 w-full cursor-pointer items-center justify-center gap-1 rounded-md px-4 py-2 text-xs text-nowrap transition-colors duration-200 ease-in-out",
				className
			)}
			onClick={handleClick}>
			<div className="z-1 flex flex-1 items-center justify-center">{children}</div>
			{tab === value && (
				<motion.span
					layoutId={`pill-tab-${tabId}`}
					transition={{ type: "spring", duration: 0.3 }}
					className="bg-muted absolute inset-0 rounded-md"
				/>
			)}
		</button>
	)
}

export type TabContentProps = { children: React.ReactNode; value: string | number; className?: string }

export function TabContent({ value, children, className }: TabContentProps) {
	const { tab } = useTab()

	return (
		<>
			{tab === value && (
				<div className={cn("bg-card border-border flex flex-col gap-2 rounded-md border p-4", className)}>{children}</div>
			)}
		</>
	)
}
