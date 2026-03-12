import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import React, { memo } from "react"

interface InputProps extends React.ComponentPropsWithRef<"input"> {
	message?: string
	label: string
	icon?: React.ReactNode
	optional?: boolean
	labelClassName?: string
}

const Input = memo(({
	icon,
	label,
	labelClassName,
	optional = false,
	className,
	type,
	message,
	disabled,
	...props
}: InputProps) => {
	return (
		<>
			<label
				aria-disabled={disabled}
				aria-invalid={!!message}
				className="group border-input aria-invalid:border-destructive relative mb-0 flex w-full items-center justify-between rounded-lg border px-3 py-1.5 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
				<label
					className={cn(
						"bg-card text-gray pointer-events-none absolute -top-2 left-2.5 h-fit px-1.5 text-[10px]",
						labelClassName
					)}>
					{label} {!optional ? <b className="text-destructive">*</b> : null}
				</label>
				{icon}
				<input
					disabled={disabled}
					type={type}
					className={cn(
						"text-primary placeholder:text-muted-foreground size-full px-1 py-1.5 pl-1 text-base focus:outline-none md:text-sm",
						"file:text-foreground file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium",
						{ "pl-2": !!icon },
						className
					)}
					{...props}
				/>
			</label>
			{message ? (
				<motion.p
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.5 }}
					className="text-destructive ml-0.5 text-xs">
					{message}
				</motion.p>
			) : null}
		</>
	)
})

Input.displayName = "Input"

export default Input
