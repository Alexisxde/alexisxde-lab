"use client"
import Button from "@/components/ui/button"
import { ToastProvider, useToast } from "@/components/ui/toast"

export default function ToastExample() {
	return (
		<ToastProvider>
			<Toast />
		</ToastProvider>
	)
}

function Toast() {
	const { toast } = useToast()

	return (
		<div className="flex flex-wrap items-center justify-center gap-4">
			<Button size="sm" variant="ghost" onClick={() => toast.default({ text: "Default" })}>
				Default
			</Button>
			<Button size="sm" onClick={() => toast.success({ text: "Success." })}>
				Success
			</Button>
			{/* <Button
				size="sm"
				onClick={() => toast.error({ text: "Error." })}>
				Error
			</Button>
			<Button
				size="sm"
				onClick={() => toast.warning({ text: "Warning." })}>
				Warning
			</Button> */}
		</div>
	)
}
