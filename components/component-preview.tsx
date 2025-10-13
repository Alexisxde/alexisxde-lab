"use client"
import { cn } from "@/lib/utils"
import { RotateCw } from "lucide-react"
import { cloneElement, useState } from "react"

type ComponentPreviewProps = {
	component: React.ReactElement
	hasReTrigger?: boolean
	className?: string
}

export default function ComponentPreview({ component, hasReTrigger = false, className }: ComponentPreviewProps) {
	const [reTriggerKey, setReTriggerKey] = useState<number>(Date.now())

	const reTrigger = () => {
		setReTriggerKey(Date.now())
	}

	return (
		<div className={cn("group flex min-h-[350px] w-full items-center justify-center rounded-md", className)}>
			<div className="absolute top-3 right-4">
				<div className="flex items-center gap-3 opacity-0 transition-opacity group-hover:opacity-100">
					{hasReTrigger && (
						<button className="cursor-pointer" onClick={reTrigger} type="button">
							<RotateCw className="h-4 w-4 text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white" />
						</button>
					)}
				</div>
			</div>
			{hasReTrigger ? cloneElement(component, { key: reTriggerKey }) : component}
		</div>
	)
}
