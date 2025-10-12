import Input from "@/components/ui/input"
import { UserCircle2 } from "lucide-react"

export default function InputExample() {
	return (
		<Input
			label="Nombre de usuario"
			placeholder="Ingrese su usuario"
			labelClassName="bg-background"
			icon={<UserCircle2 className="text-icon-primary size-5" />}
		/>
	)
}
