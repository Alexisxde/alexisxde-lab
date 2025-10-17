import Button from "@/components/ui/button"

export default function Buttons() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-4">
			<Button>Primary</Button>
			<Button variant={"secondary"}>Secondary</Button>
			<Button variant={"ghost"}>Ghost</Button>
			<Button variant={"outline"}>Outline</Button>
			<Button variant={"destructive"}>Destructive</Button>
		</div>
	)
}
