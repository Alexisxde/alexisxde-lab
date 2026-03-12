"use client"
import Badge from "@/components/ui/badge"
import Link from "next/link"

export default function BadgeAsChild() {
	return (
		<div className="flex items-center justify-center">
			<Badge asChild variant="outline">
				<Link href="/">Volver al Inicio</Link>
			</Badge>
		</div>
	)
}
