"use client"
import Menu from "@/components/ui/menu"
import { Folder, House, PackageCheck } from "lucide-react"

export default function MenuExample() {
	const items = [
		{ title: "Inicio", icon: <House className="text-primary size-5" />, href: "/" },
		{ title: "Carpetas", icon: <Folder className="text-primary size-5" />, href: "#" },
		{ title: "Tareas", icon: <PackageCheck className="text-primary size-5" />, href: "#" }
	]

	return <Menu items={items} />
}
