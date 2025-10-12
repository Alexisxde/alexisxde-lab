"use client"
import {
	MorphingDialog,
	MorphingDialogClose,
	MorphingDialogContainer,
	MorphingDialogContent,
	MorphingDialogImage,
	MorphingDialogSubtitle,
	MorphingDialogTitle,
	MorphingDialogTrigger
} from "@/components/ui/morphing-dialog"
import { useState } from "react"

export default function MorphingDialogExample() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<MorphingDialog isOpen={isOpen} setIsOpen={setIsOpen}>
			<MorphingDialogTrigger className="border-border bg-card rounded-xl border">
				<div className="flex items-center space-x-3 p-3">
					<MorphingDialogImage
						src="https://m.media-amazon.com/images/I/61p6VxskKVL._SL1430_.jpg"
						alt="What I Talk About When I Talk About Running - book cover"
						className="size-8 object-cover object-top"
					/>
					<div className="flex flex-col items-start justify-center space-y-0">
						<MorphingDialogTitle className="text-primary text-left text-[10px] font-medium sm:text-xs">
							Aprendiendo Git y GitHub: Desde cero hasta...
						</MorphingDialogTitle>
						<MorphingDialogSubtitle className="text-gray text-[10px] sm:text-xs">
							Miguel Ángel Durán García
						</MorphingDialogSubtitle>
					</div>
				</div>
			</MorphingDialogTrigger>
			<MorphingDialogContainer>
				<MorphingDialogContent className="border-border bg-card relative h-[96dvh] w-[98dvw] overflow-y-auto border p-4 md:w-[50dvw]">
					<div className="relative p-6">
						<div className="flex justify-center py-10">
							<MorphingDialogImage
								src="https://m.media-amazon.com/images/I/61p6VxskKVL._SL1430_.jpg"
								alt="What I Talk About When I Talk About Running - book cover"
								className="h-auto w-[200px]"
							/>
						</div>
						<MorphingDialogTitle className="text-primary mb-2">
							Aprendiendo Git y GitHub: Desde cero hasta buenas prácticas y estrategias de trabajo en equipo
						</MorphingDialogTitle>
						<MorphingDialogSubtitle className="text-gray text-xs font-light">Miguel Ángel Durán García</MorphingDialogSubtitle>
						<p className="text-muted-foreground mt-4 text-xs">
							Hoy en día es imposible imaginar el desarrollo de software sin Git. Según la encuesta de Stack Overflow de 2018,
							casi el 90% de los desarrolladores usaban Git para manejar su código fuente. Si te preguntas por qué no hay
							encuestas más recientes... ¡Es simplemente porque no preguntaron más! Su dominio empezaba a ser tan evidente que no
							dejaba margen a la curiosidad.
						</p>
					</div>
					<MorphingDialogClose className="text-zinc-500" />
				</MorphingDialogContent>
			</MorphingDialogContainer>
		</MorphingDialog>
	)
}
