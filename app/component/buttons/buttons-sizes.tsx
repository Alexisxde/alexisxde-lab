import Button from "@/components/ui/button"
import { Github } from "lucide-react"

export default function ButtonsSizes() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-4">
			<Button variant="secondary" size="sm">sm</Button>
			<Button variant="secondary" size="md">md</Button>
			<Button variant="secondary" size="lg">lg</Button>
			<Button variant="secondary" size="icon">
				<Github className="size-5" />
			</Button>
		</div>
	)
}
