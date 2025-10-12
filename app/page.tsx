import Buttons from "@/components/examples/buttons"
import DockExample from "@/components/examples/dock"
import FloatingDockExample from "@/components/examples/floating-dock"
import InputExample from "@/components/examples/input"
import ModalExample from "@/components/examples/modal"
import MorphingDialogExample from "@/components/examples/morphing-dialog"
import ToastExample from "@/components/examples/toast"
import Header from "@/components/header"
import React from "react"

export default function Home() {
	const COMPONENTS = [
		{ name: "Buttons", example: Buttons, href: "/components/buttons" },
		{ name: "Floating Dock", example: FloatingDockExample, href: "/components/floating-dock" },
		{ name: "Dock", example: DockExample, href: "/components/dock" },
		{ name: "Morphing Dialog", example: MorphingDialogExample, href: "/components/morphing-dialog" },
		{ name: "Modal", example: ModalExample, href: "/components/modal" },
		// { name: "Navegation", example: MenuExample, href: "/components/navegation" },
		{ name: "Toast", example: ToastExample, href: "/components/toast" },
		{ name: "Inputs", example: InputExample, href: "/components/inputs" }
	] as const

	return (
		<section className="flex w-full flex-col">
			<Header />
			<div className="relative h-full">
				<div className="pointer-events-none absolute inset-0 z-0 px-4 sm:px-6">
					<div className="max-w-8xl mx-auto flex h-full gap-4">
						<div className="border-border flex-1 border-x-1"></div>
						<div className="border-border hidden flex-1 border-x-1 sm:block"></div>
						<div className="border-border hidden flex-1 border-x-1 lg:block"></div>
					</div>
				</div>
				<slot />
				<section className="relative z-10 px-4 sm:px-6">
					<div className="mx-auto max-w-7xl px-2 py-16 lg:py-24">
						<h1 className="text-primary text-2xl font-semibold tracking-tight text-pretty sm:text-[length:clamp(2rem,3.75vw,3rem)]/tight">
							Espacio creativo para experimentos de UI, exploraciones de componentes y diseño de interacción.
						</h1>
					</div>
				</section>
				<main className="max-w-8xl mx-auto w-full px-4 sm:px-6">
					<section className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-16">
						{COMPONENTS.map(({ name, example }, i) => (
							<article key={i} className="mx-4 flex flex-col">
								<div className="border-border flex h-72 w-full items-center justify-center gap-4 border-1 p-5">
									{React.createElement(example)}
								</div>
								<p className="border-border border-x-1 border-b-1 p-2 text-sm">{name}</p>
							</article>
						))}
					</section>
				</main>
			</div>
			{/* <Footer /> */}
		</section>
	)
}
