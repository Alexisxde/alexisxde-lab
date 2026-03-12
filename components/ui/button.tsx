"use client"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import React, { cloneElement, isValidElement, MouseEvent, useCallback, useEffect, useState, memo } from "react"

export const buttonVariants = cva(
	"relative flex items-center justify-center gap-2 whitespace-nowrap text-sm rounded-md font-medium transition-alls duration-300 ease-in-out [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6 shrink-0 [&_svg]:shrink-0 cursor-pointer focus:outline-none overflow-hidden active:scale-[0.97]",
	{
		variants: {
			variant: {
				primary: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/80",
				secondary: "text-secondary-foreground bg-secondary shadow-xs hover:bg-secondary/80",
				ghost: "hover:bg-muted text-secondary-foreground dark:hover:bg-muted/50",
				outline:
					"border bg-background shadow-xs border border-border ring ring-muted/25 hover:bg-muted/80 hover:text-accent-foreground",
				destructive:
					"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
			},
			size: {
				sm: "h-8 rounded-md px-3 gap-1.5 has-[>svg]:px-2.5",
				md: "h-9 px-4 py-2 has-[>svg]:px-3",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4 text-base",
				icon: "size-9"
			},
			disabled: { true: "opacity-50 cursor-not-allowed" }
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
			disabled: false
		}
	}
)

export type ButtonProps = VariantProps<typeof buttonVariants> & {
	duration?: string
	asChild?: boolean
	ripple?: boolean
} & React.ComponentPropsWithRef<"button">

const Button = memo(({
	className,
	children,
	duration = "600ms",
	onClick,
	variant,
	size,
	disabled = false,
	asChild = false,
	ripple = false,
	ref,
	...props
}: ButtonProps) => {
	const [buttonRipples, setButtonRipples] = useState<Array<{ x: number; y: number; size: number; key: number }>>([])

	const createRipple = useCallback((event: MouseEvent<HTMLElement>) => {
		if (!ripple) return
		const button = event.currentTarget
		const rect = button.getBoundingClientRect()
		const size = Math.max(rect.width, rect.height)
		const x = event.clientX - rect.left - size / 2
		const y = event.clientY - rect.top - size / 2

		const newRipple = { x, y, size, key: Date.now() }
		setButtonRipples(prevRipples => [...prevRipples, newRipple])
	}, [ripple])

	useEffect(() => {
		if (buttonRipples.length > 0) {
			const lastRipple = buttonRipples[buttonRipples.length - 1]
			const timeout = setTimeout(() => {
				setButtonRipples(prevRipples => prevRipples.filter(ripple => ripple.key !== lastRipple.key))
			}, parseInt(duration))
			return () => clearTimeout(timeout)
		}
	}, [buttonRipples, duration])

	const ripples = ripple ? (
		<span className="pointer-events-none absolute inset-0">
			{buttonRipples.map(ripple => (
				<span
					className="animate-rippling bg-foreground/75 absolute rounded-full opacity-30"
					key={ripple.key}
					style={{
						width: `${ripple.size}px`,
						height: `${ripple.size}px`,
						top: `${ripple.y}px`,
						left: `${ripple.x}px`,
						transform: `scale(0)`
					}}
				/>
			))}
		</span>
	) : null

	const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		createRipple(event)
		onClick?.(event)
	}, [createRipple, onClick])

	if (asChild && isValidElement(children)) {
		const childProps = children.props as any
		return cloneElement(children as React.ReactElement<any>, {
			className: cn(buttonVariants({ variant, size, disabled }), className, childProps.className),
			onClick: (e: MouseEvent<HTMLButtonElement>) => {
				createRipple(e)
				childProps.onClick?.(e)
				onClick?.(e)
			},
			children: (
				<>
					<div className="relative z-10 flex items-center justify-center gap-1.5">{childProps.children}</div>
					{ripples}
				</>
			),
			...props
		})
	}

	return (
		<button
			className={cn(buttonVariants({ variant, size, disabled }), className)}
			onClick={handleClick}
			disabled={disabled}
			ref={ref}
			{...props}>
			<div className="relative z-10 flex items-center justify-center gap-1.5">{children}</div>
			{ripples}
		</button>
	)
})

Button.displayName = "Button"

export default Button
