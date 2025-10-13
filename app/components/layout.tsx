import Header from "@/components/header"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto flex w-full flex-col items-center md:space-x-12">
					<main className="prose prose-zinc dark:prose-invert prose-h1:scroll-m-20 prose-h1:text-2xl prose-h1:font-semibold prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-xl prose-h2:font-medium prose-h3:scroll-m-20 prose-h3:text-base prose-h3:font-medium prose-h4:scroll-m-20 prose-h5:scroll-m-20 prose-h6:scroll-m-20 prose-strong:font-medium prose-table:block prose-table:overflow-y-auto mr-0 max-w-full min-w-0 flex-1 pt-8 pb-16 lg:pt-12 xl:mr-12 xl:max-w-2xl">
						{children}
					</main>
				</div>
			</div>
		</>
	)
}
