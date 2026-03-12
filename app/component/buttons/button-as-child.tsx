"use client"
import Button from "@/components/ui/button"
import Link from "next/link"

export default function ButtonAsChild() {
	return (
		<div className="flex items-center justify-center">
			<Button asChild variant="outline" size="lg">
				<Link href="/">Ir al Inicio</Link>
			</Button>
		</div>
	)
}
