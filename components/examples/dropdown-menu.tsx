"use client"
import { DropDownMenu, DropDownMenuTrigger, DropDownMenuContent, DropDownMenuItem } from "@/components/ui/drop-down"
import { Edit, LogOut, Settings, User } from "lucide-react"
import Link from "next/link"

export default function DropDownMenuExample() {
	return (
		<div className="flex items-center justify-center p-20">
			<DropDownMenu>
				<DropDownMenuTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors">
					Mi Cuenta
				</DropDownMenuTrigger>
				<DropDownMenuContent className="w-56">
					<DropDownMenuItem>
						<User className="mr-2 size-4" />
						<span>Perfil</span>
					</DropDownMenuItem>
					<DropDownMenuItem>
						<Edit className="mr-2 size-4" />
						<span>Editar</span>
					</DropDownMenuItem>
					<DropDownMenuItem asChild>
						<Link href="/settings">
							<Settings className="mr-2 size-4" />
							<span>Configuración</span>
						</Link>
					</DropDownMenuItem>
					<div className="bg-muted my-1 h-px" />
					<DropDownMenuItem>
						<LogOut className="mr-2 size-4" />
						<span>Cerrar sesión</span>
					</DropDownMenuItem>
				</DropDownMenuContent>
			</DropDownMenu>
		</div>
	)
}
