"use client"
import Menu from "@/components/ui/menu"
import { Home, Search, User, Settings } from "lucide-react"

export default function MenuDefault() {
	const items = [
		{ title: "Inicio", icon: <Home className="size-4" />, href: "/component/navegation" },
		{ title: "Buscar", icon: <Search className="size-4" />, href: "/search" },
		{ title: "Perfil", icon: <User className="size-4" />, href: "/profile" },
		{ title: "Ajustes", icon: <Settings className="size-4" />, href: "/settings" }
	]

	return (
		<div className="relative h-20 w-full overflow-hidden p-4">
			<Menu items={items} />
		</div>
	)
}
