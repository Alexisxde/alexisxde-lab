"use client"
import Input from "@/components/ui/input"
import {
	Modal,
	ModalAction,
	ModalClose,
	ModalContainer,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalTrigger
} from "@/components/ui/modal"
import { XIcon } from "lucide-react"
import { useState } from "react"

export default function ModalExample() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
				<ModalTrigger>Abrir Modal</ModalTrigger>
				<ModalContainer>
					<ModalHeader>
						<h2 className="text-xl font-medium">Únete a la lista de espera</h2>
						<ModalClose size={"icon"}>
							<XIcon className="text-icon-primary size-5" />
						</ModalClose>
					</ModalHeader>
					<ModalContent>
						<p className="text-gray max-w-md text-sm">
							Ingrese su dirección de correo electrónico para recibir actualizaciones cuando lancemos.
						</p>
						<Input label="Correo electrónico" placeholder="Ingrese su correo electrónico" />
					</ModalContent>
					<ModalFooter>
						<ModalAction>Únete ahora</ModalAction>
					</ModalFooter>
				</ModalContainer>
			</Modal>
		</>
	)
}
