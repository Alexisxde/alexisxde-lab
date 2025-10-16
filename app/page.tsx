import ComponentsList from "@/components/components-list"
import Header from "@/components/header"
import { TransitionPanelCard } from "@/components/ui/tab-transition"

export default function Home() {
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
							Aquí subo mis experimentos con React: Componentes bonitos que nacen del código y la curiosidad.
						</h1>
					</div>
				</section>
				<main className="max-w-8xl mx-auto w-full px-4 sm:px-6">
					<ComponentsList />
				</main>
			</div>
			<TransitionPanelCard />
			{/* <Footer /> */}
		</section>
	)
}
