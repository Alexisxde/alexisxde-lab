"use client"
import { Dock, DockAnchor, DockButton } from "@/components/ui/dock"
import { FolderIcon, GithubIcon, HomeIcon } from "lucide-react"

export default function DockExample() {
	return (
		<Dock>
			<DockAnchor title="Inicio" icon={<HomeIcon className="text-icon-primary size-full" />} href="#" />
			<DockButton title="Carpetas" icon={<FolderIcon className="text-icon-primary size-full" />} onClick={() => alert("Click")} />
			<DockAnchor title="Github" icon={<GithubIcon className="text-icon-primary size-full" />} href="#" />
		</Dock>
	)
}
