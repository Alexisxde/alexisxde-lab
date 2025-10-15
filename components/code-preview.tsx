"use client"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

type CodePreviewProps = {
	code: string
	children: React.ReactNode
}

export default function CodePreview({ code, children }: CodePreviewProps) {
	const [hasCheckIcon, setHasCheckIcon] = useState(false)

	const onCopy = async () => {
		await navigator.clipboard?.writeText(code)
		setHasCheckIcon(true)

		setTimeout(() => {
			setHasCheckIcon(false)
		}, 1000)
	}

	return (
		<div className="relative">
			<button
				className="border-border bg-secondary hover:bg-muted absolute top-4 right-4 flex cursor-pointer items-center justify-center rounded-md border p-4 transition-colors duration-300 ease-in-out"
				onClick={onCopy}>
				<div
					className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform transition-all duration-300 ${
						hasCheckIcon ? "scale-0 opacity-0" : "scale-100 opacity-100"
					}`}>
					<Copy className="text-primary size-4" />
				</div>
				<div
					className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform transition-all duration-300 ${
						hasCheckIcon ? "scale-100 opacity-100" : "scale-0 opacity-0"
					}`}>
					<Check className="text-primary size-4" />
				</div>
			</button>
			<div className="max-h-[650px] overflow-auto rounded-md bg-zinc-900">
				<div className="inline-block overflow-x-auto p-4 text-sm">{children}</div>
			</div>
		</div>
	)
}
