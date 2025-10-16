import Input from "@/components/ui/input"
import { Mail } from "lucide-react"

export default function InputDisabled() {
	return (
		<Input
			disabled
			type="email"
			label="Correo electrónico"
			placeholder="Ingresar su correo"
			labelClassName="bg-card"
			icon={<Mail className="text-icon-primary size-5" />}
		/>
	)
}
