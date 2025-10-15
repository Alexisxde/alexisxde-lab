"use client"
import { COMPONENTS } from "@/components/components"
import { createElement } from "react"

export default function ComponentsList() {
	return (
		<section className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-16">
			{COMPONENTS.map(({ name, example, href }) => (
				<article key={name} className="mx-4 flex flex-col">
					<div className="border-border flex h-72 w-full items-center justify-center gap-4 border-1 p-5">
						{createElement(example)}
					</div>
					<div className="border-border border-x-1 border-b-1 p-2 text-sm">
						<a href={href} className="underline-offset-4 hover:underline">
							{name}
						</a>
					</div>
				</article>
			))}
		</section>
	)
}
