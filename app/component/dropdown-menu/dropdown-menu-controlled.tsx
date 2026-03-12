"use client"
import DropDownMenu from "@/components/ui/drop-down"
import { useState } from "react"

export default function DropdownMenuControlled() {
	const [open, setOpen] = useState(false)

	return (
		<div className="flex flex-col items-center justify-center gap-4 p-10">
			<DropDownMenu open={open} onOpenChange={setOpen}>
				<DropDownMenu.Trigger className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-4 py-2 text-sm font-medium transition-colors">
					Controlado desde afuera
				</DropDownMenu.Trigger>
				<DropDownMenu.Content>
					<DropDownMenu.Item onClick={() => alert("Acción 1")}>Acción 1</DropDownMenu.Item>
					<DropDownMenu.Item onClick={() => alert("Acción 2")}>Acción 2</DropDownMenu.Item>
				</DropDownMenu.Content>
			</DropDownMenu>
		</div>
	)
}
