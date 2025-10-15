"use client"
import { COMPONENTS } from "@/components/components"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function Sidebar() {
	const pathname = usePathname()

	return (
		<aside className="sticky top-12 z-30 hidden h-screen w-sm flex-col p-4 md:flex">
			<h2 className="text-gray mb-2 text-sm">Componentes</h2>
			<nav className="flex w-full max-w-sm flex-col gap-2">
				{COMPONENTS.map(({ name, href }, i) => (
					<a key={`${name}-${i}`} href={href} className="cursor-pointer select-none">
						<div
							className={cn(
								"group relative flex min-h-8 w-full items-center gap-2",
								"before:border-muted before:bg-muted before:absolute before:inset-0 before:scale-75 before:rounded-md before:border before:opacity-0 before:transition",
								"px-4 py-2 hover:before:scale-100 hover:before:opacity-100",
								{ "bg-muted rounded-md": pathname === href }
							)}>
							<span className="text-primary transform-gpu text-sm font-medium tracking-tight transition-transform group-hover:translate-x-0.5">
								{name}
							</span>
						</div>
					</a>
				))}
			</nav>
		</aside>
	)
}
