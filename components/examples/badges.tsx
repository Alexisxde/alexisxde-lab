import Badge from "@/components/ui/badge"

export default function Badges() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-4">
			<Badge>Primary</Badge>
			<Badge variant={"secondary"}>Secondary</Badge>
			<Badge variant={"outline"}>Outline</Badge>
			<Badge variant={"destructive"}>Destructive</Badge>
		</div>
	)
}
