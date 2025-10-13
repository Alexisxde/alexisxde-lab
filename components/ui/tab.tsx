"use client"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { createContext, useContext, useState } from "react"

type TabContextType = {
	tab: string | number | null
	setTab: React.Dispatch<React.SetStateAction<string | number | null>>
}

const TabContext = createContext<TabContextType | null>(null!)

export type TabProps = { children: React.ReactNode; defaultTab: string | number | null }

export function Tab({ children, defaultTab }: TabProps) {
	const [tab, setTab] = useState<string | number | null>(defaultTab ?? null)

	return <TabContext.Provider value={{ tab, setTab }}>{children}</TabContext.Provider>
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

export type TabContainerProps = { children: React.ReactNode; className?: string }

export function TabContainer({ children, className }: TabContainerProps) {
	return <div className={cn("flex w-full flex-col", className)}>{children}</div>
}

export type TabOptionProps = { children: React.ReactNode; tab: string | number; className?: string }

export function TabOption({ tab: tabName, children, className }: TabOptionProps) {
	const { tab, setTab } = useTab()

	const handleClick = () => {
		setTab(tabName)
	}

	return (
		<button
			className={cn(
				"relative flex h-8 w-full cursor-pointer items-center justify-center gap-1 rounded-md px-4 py-2 text-xs text-nowrap transition-colors duration-200 ease-in-out",
				className
			)}
			onClick={handleClick}>
			<div className="z-1 flex flex-1 items-center justify-center">{children}</div>
			{tab === tabName && (
				<motion.span
					layoutId="pill-tab"
					transition={{ type: "spring", duration: 0.3 }}
					className="bg-muted absolute inset-0 rounded-md"
				/>
			)}
		</button>
	)
}

export type TabContentProps = { children: React.ReactNode; tab: string | number; className?: string }

export function TabContent({ tab: tabName, children, className }: TabContentProps) {
	const { tab } = useTab()

	return (
		<>
			{tab === tabName && (
				<div className={cn("bg-card border-border flex flex-col gap-2 rounded-md border p-4", className)}>{children}</div>
			)}
		</>
	)
}
