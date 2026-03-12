"use client"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import React, { createContext, memo, useContext, useId, useMemo, useState } from "react"

type TabContextType = {
	tabId: string
	tab: string | number | null
	setTab: React.Dispatch<React.SetStateAction<string | number | null>>
}

const TabContext = createContext<TabContextType | null>(null!)

export type TabProps = React.ComponentPropsWithRef<"article"> & { defaultValue?: string | number }

export function Tab({ children, defaultValue, className }: TabProps) {
	const tabId = useId()
	const [tab, setTab] = useState<string | number | null>(defaultValue ?? null)
	const contextValue = useMemo(() => ({ tabId, tab, setTab }), [tabId, tab])

	return (
		<TabContext.Provider value={contextValue}>
			<article className={cn("flex w-full flex-col", className)}>{children}</article>
		</TabContext.Provider>
	)
}

function useTab() {
	const context = useContext(TabContext)
	if (!context) throw new Error("useTab must be used within a TabProvider")
	return context
}

export type TabHeaderProps = React.ComponentPropsWithRef<"header">

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

export type TabOptionProps = React.ComponentPropsWithRef<"button"> & { value: string | number }

export const TabOption = ({ value, children, className }: TabOptionProps) => {
	const { tabId, tab, setTab } = useTab()

	return (
		<button
			className={cn(
				"text-primary relative flex h-8 w-full cursor-pointer items-center justify-center gap-1 rounded-md px-4 py-2 text-xs text-nowrap transition-colors duration-200 ease-in-out",
				className
			)}
			onClick={() => setTab(value)}>
			<div className="z-1 flex flex-1 items-center justify-center">{children}</div>
			{tab === value ? (
				<motion.span
					layoutId={`pill-tab-${tabId}`}
					transition={{ type: "spring", duration: 0.3 }}
					className="bg-muted absolute inset-0 rounded-md"
				/>
			) : null}
		</button>
	)
}


export type TabContentProps = React.ComponentPropsWithRef<"article"> & { value: string | number }

export function TabContent({ value, children, className, ...props }: TabContentProps) {
	const { tab } = useTab()

	return (
		<>
			{tab === value ? (
				<article className={cn("bg-card border-border flex flex-col gap-2 rounded-md border p-4", className)}
				{...props}>
					{children}
				</article>
			) : null}
		</>
	)
}

Tab.Header = TabHeader
Tab.Option = TabOption
Tab.Content = TabContent

export default Tab
