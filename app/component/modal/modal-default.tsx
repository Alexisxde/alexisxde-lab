"use client"
import Button from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { useState } from "react"

export default function ModalDefault() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="flex items-center justify-center p-8">
			<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
				<Modal.Trigger asChild>
					<Button>Abrir Modal (asChild)</Button>
				</Modal.Trigger>
				<Modal.Container>
					<Modal.Header>
						<h3 className="text-lg font-semibold text-primary">Confirmar acción</h3>
						<Modal.Close className="h-8 w-8 rounded-full p-0">✕</Modal.Close>
					</Modal.Header>
					<Modal.Content>
						<p className="text-muted-foreground">
							¿Estás seguro de que deseas continuar? Al usar `asChild`, puedes integrar cualquier botón manteniendo la lógica del Modal.
						</p>
					</Modal.Content>
					<Modal.Footer>
						<Modal.Close asChild>
							<button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:underline">
								Cancelar
							</button>
						</Modal.Close>
						<Modal.Action onClick={() => console.log("Confirmado")}>
							Confirmar
						</Modal.Action>
					</Modal.Footer>
				</Modal.Container>
			</Modal>
		</div>
	)
}
