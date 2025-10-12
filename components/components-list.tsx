"use client"
import Buttons from "@/components/examples/buttons"
import DockExample from "@/components/examples/dock"
import FloatingDockExample from "@/components/examples/floating-dock"
import InputExample from "@/components/examples/input"
import ModalExample from "@/components/examples/modal"
import MorphingDialogExample from "@/components/examples/morphing-dialog"
import ToastExample from "@/components/examples/toast"
import { createElement } from "react"

export default function ComponentsList() {
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
		<section className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-16">
			{COMPONENTS.map(({ name, example }, i) => (
				<article key={i} className="mx-4 flex flex-col">
					<div className="border-border flex h-72 w-full items-center justify-center gap-4 border-1 p-5">
						{createElement(example)}
					</div>
					<p className="border-border border-x-1 border-b-1 p-2 text-sm">{name}</p>
				</article>
			))}
		</section>
	)
}
