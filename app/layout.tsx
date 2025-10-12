import "@/styles/globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"

const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	subsets: ["latin"]
})

export const metadata: Metadata = {
	title: "LabUI - @Alexisxde",
	description: "Generated LabUI - @Alexisxde"
}

interface Props {
	children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<Props>) {
	return (
		<html lang="es" className="dark">
			<body className={`${poppins.className} antialiased`}>{children}</body>
		</html>
	)
}
