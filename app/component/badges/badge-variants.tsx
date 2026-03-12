"use client"
import Badge from "@/components/ui/badge"

export default function BadgeVariants() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-4">
			<Badge variant="primary">Primary</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="outline">Outline</Badge>
			<Badge variant="destructive">Destructive</Badge>
		</div>
	)
}
