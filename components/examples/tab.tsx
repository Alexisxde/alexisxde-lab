import { Tab, TabContent, TabHeader, TabOption } from "@/components/ui/tab"

export default function TabExample() {
	return (
		<Tab defaultValue={1}>
			<TabHeader>
				<TabOption value={1}>Primero</TabOption>
				<TabOption value={2}>Segundo</TabOption>
				<TabOption value={3}>Tercero</TabOption>
			</TabHeader>
			<TabContent value={1}>Contenido del primer tab</TabContent>
			<TabContent value={2}>Contenido del segundo tab</TabContent>
			<TabContent value={3}>Contenido del tercer tab</TabContent>
		</Tab>
	)
}
