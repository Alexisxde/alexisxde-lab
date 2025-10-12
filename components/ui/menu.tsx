"use client"
import Button from "@/components/ui/button"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"

type Item = { title: string; icon: React.ReactNode; href: string }

interface MenuProps {
	items: Item[]
}

export default function Menu({ items }: MenuProps) {
	const pathname = usePathname()

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9, y: 15 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			className="sticky bottom-2 flex items-center justify-center">
			<div className="bg-card border-border flex items-center justify-center gap-2 rounded-full border px-4 py-2">
				{items.map((item, idx) => (
					<Button key={idx} variant={"ghost"} className={`bg-muted h-10 rounded-full ${pathname !== item.href && "size-10"}`}>
						<div className="flex items-center gap-1">
							{item.icon}
							{pathname === item.href && <span className="text-xs">{item.title}</span>}
						</div>
					</Button>
				))}
			</div>
		</motion.div>
	)
}
