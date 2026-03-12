"use client"
import Button from "@/components/ui/button"
import { ToastProvider, useToast } from "@/components/ui/toast"

export default function ToastVariants() {
	return (
		<ToastProvider>
			<ToastTrigger />
		</ToastProvider>
	)
}

function ToastTrigger() {
	const { toast } = useToast()

	return (
		<div className="flex flex-wrap gap-4">
			<Button onClick={() => toast.default({ text: "Mensaje por defecto." })}>
				Default
			</Button>
			<Button onClick={() => toast.success({ text: "Operación exitosa." })}>
				Success
			</Button>
			<Button onClick={() => toast.warning({ text: "Cuidado con esta acción." })}>
				Warning
			</Button>
			<Button onClick={() => toast.error({ text: "Ocurrió un error." })}>
				Error
			</Button>
		</div>
	)
}
