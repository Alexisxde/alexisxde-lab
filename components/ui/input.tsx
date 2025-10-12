import { cn } from "@/lib/utils"
import { motion } from "motion/react"

interface InputProps extends React.ComponentPropsWithRef<"input"> {
	message?: string
	label: string
	icon?: React.ReactNode
	optional?: boolean
	labelClassName?: string
}

export default function Input({ icon, label, labelClassName, optional = false, className, type, message, ...props }: InputProps) {
	return (
		<>
			<label
				aria-invalid={!!message}
				className="border-input aria-invalid:border-destructive relative mb-0 flex w-full items-center justify-between rounded-lg border px-3 py-1.5">
				<label
					className={cn(
						"bg-card text-gray pointer-events-none absolute -top-2 left-2.5 h-fit px-1.5 text-[10px]",
						labelClassName
					)}>
					{label} {!optional && <b className="text-destructive">*</b>}
				</label>
				{icon}
				<input
					type={type}
					className={cn(
						"text-primary placeholder:text-muted-foreground size-full px-1 py-1.5 pl-1 text-base focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						"file:text-foreground file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium",
						{ "pl-2": !!icon },
						className
					)}
					{...props}
				/>
			</label>
			{!!message && (
				<motion.p
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.5 }}
					className="text-destructive ml-0.5 text-xs">
					{message}
				</motion.p>
			)}
		</>
	)
}
