import Input from "@/components/ui/input"
import { LucideTimer } from "lucide-react"

export default function InputDateTime() {
	return (
		<Input
			type="datetime-local"
			label="Seleccionar fecha"
			labelClassName="bg-card max-w-xs"
			icon={<LucideTimer className="text-icon-primary size-5" />}
		/>
	)
}
