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
			<Button size="sm" onClick={() => toast.success({ text: "Success." })}>
				Success
			</Button>
		</div>
	)
}
