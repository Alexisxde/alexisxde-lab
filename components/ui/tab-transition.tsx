"use client"
import { TransitionPanel } from "@/components/ui/transition-panel"
import React, { useCallback, useMemo, useState, memo } from "react"

const Button = memo(({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => {
	return (
		<button
			onClick={onClick}
			type="button"
			className="relative flex h-8 shrink-0 scale-100 appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors select-none hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800">
			{children}
		</button>
	)
})

Button.displayName = "Button"

const FEATURES = [
	{
		title: "Brand",
		description:
			"Develop a distinctive brand identity with tailored logos and guidelines to ensure consistent messaging across all platforms."
	},
	{
		title: "Product",
		description:
			"Design and refine products that excel in user experience, meeting needs effectively and creating memorable interactions. We specialize in web applications."
	},
	{
		title: "Website",
		description:
			"Create impactful websites that combine beautiful aesthetics with functional design, ensuring a superior online presence."
	},
	{
		title: "Design System",
		description:
			"Develop a design system that unifies your brand identity, ensuring consistency across all platforms and products."
	}
]

export function TransitionPanelCard() {
	const [activeIndex, setActiveIndex] = useState(0)
	const [direction, setDirection] = useState(1)

	const handleSetActiveIndex = useCallback((newIndex: number) => {
		setActiveIndex(prevIndex => {
			setDirection(newIndex > prevIndex ? 1 : -1)
			return Math.max(0, Math.min(newIndex, FEATURES.length - 1))
		})
	}, [])

	const variants = useMemo(() => ({
		enter: (direction: number) => ({
			x: direction > 0 ? 364 : -364,
			opacity: 0
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction < 0 ? 364 : -364,
			opacity: 0,
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%"
		})
	}), [])

	const handlePrev = useCallback(() => handleSetActiveIndex(activeIndex - 1), [handleSetActiveIndex, activeIndex])
	const handleNext = useCallback(() => {
		if (activeIndex < FEATURES.length - 1) {
			handleSetActiveIndex(activeIndex + 1)
		}
	}, [handleSetActiveIndex, activeIndex])

	return (
		<div className="w-[364px] overflow-hidden rounded-xl border border-zinc-950/10 bg-white dark:bg-zinc-700">
			<TransitionPanel activeIndex={activeIndex} variants={variants} custom={direction}>
				{FEATURES.map((feature, index) => (
					<div key={index} className="px-4 pt-4">
						<h3 className="mb-0.5 font-medium text-zinc-800 dark:text-zinc-100">{feature.title}</h3>
						<p className="text-zinc-600 dark:text-zinc-400">{feature.description}</p>
					</div>
				))}
			</TransitionPanel>
			<div className="flex justify-between p-4">
				{activeIndex > 0 ? (
					<Button onClick={handlePrev}>Previous</Button>
				) : (
					<div />
				)}
				<Button onClick={handleNext}>
					{activeIndex === FEATURES.length - 1 ? "Close" : "Next"}
				</Button>
			</div>
		</div>
	)
}
