"use client"
import Button from "@/components/ui/button"
import { ToastProvider, useToast } from "@/components/ui/toast"

export default function ToastDefault() {
	return (
		<ToastProvider>
			<ToastTrigger />
		</ToastProvider>
	)
}

function ToastTrigger() {
	const { toast } = useToast()

	return (
		<Button onClick={() => toast.default({ text: "Este es un mensaje de notificación." })}>
			Mostrar Toast
		</Button>
	)
}
