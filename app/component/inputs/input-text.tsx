import Input from "@/components/ui/input"
import { User2 } from "lucide-react"

export default function InputText() {
	return (
		<Input
			type="text"
			label="Nombre de usuario"
			placeholder="Ingresar su usuario"
			labelClassName="bg-card"
			icon={<User2 className="text-icon-primary size-5" />}
		/>
	)
}
