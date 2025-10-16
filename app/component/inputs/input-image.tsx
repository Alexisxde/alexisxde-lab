import Input from "@/components/ui/input"
import { Image } from "lucide-react"

export default function InputFile() {
	return (
		<Input
			type="file"
			label="Imagen"
			accept="jpg, png, webp"
			placeholder="Seleccione una imagen"
			labelClassName="bg-card"
			icon={<Image className="text-icon-primary size-5" />}
		/>
	)
}
