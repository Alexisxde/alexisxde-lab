import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import React, { cloneElement, isValidElement, memo } from "react"

export const badgeVariants = cva(
	"transition-all duration-300 ease-in-out pointer-events-none flex items-center justify-center gap-x-1 font-medium capitalize",
	{
		variants: {
			variant: {
				primary: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/80",
				secondary: "text-secondary-foreground bg-secondary shadow-xs hover:bg-secondary/80",
				outline:
					"border bg-background shadow-xs border border-border ring ring-muted/25 hover:bg-muted/80 hover:text-accent-foreground",
				destructive:
					"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
			},
			size: {
				xs: "px-2 py-1 text-xs rounded-md",
				sm: "px-3 py-1.5 text-xs rounded-md",
				md: "px-4 py-2 text-sm rounded-lg",
				lg: "px-5 py-2.5 text-sm rounded-lg"
			},
			disabled: { true: "cursor-not-allowed opacity-50" }
		},
		defaultVariants: { variant: "primary", size: "xs", disabled: false }
	}
)

export type BadgeProps = VariantProps<typeof badgeVariants> & { asChild?: boolean } & React.ComponentPropsWithRef<"span">

function Badge({
	className,
	children,
	variant,
	size,
	disabled,
	ref,
	asChild = false,
	...props
}: BadgeProps) {
	if (asChild && isValidElement(children)) {
		const childProps = children.props as any
		return cloneElement(children as React.ReactElement<any>, {
			className: cn(badgeVariants({ variant, size, disabled }), className, childProps.className),
			...props
		})
	}

	return (
		<span
			className={cn(badgeVariants({ variant, size, disabled }), className)}
			ref={ref}
			{...props}>
			{children}
		</span>
	)
}

export default memo(Badge)
