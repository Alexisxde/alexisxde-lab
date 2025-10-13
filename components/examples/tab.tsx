import { Tab, TabContainer, TabContent, TabHeader, TabOption } from "@/components/ui/tab"

export default function TabExample() {
	return (
		<Tab defaultTab={1}>
			<TabContainer>
				<TabHeader>
					<TabOption tab={1}>One</TabOption>
					<TabOption tab={2}>Two</TabOption>
					<TabOption tab={3}>Three</TabOption>
				</TabHeader>
				<TabContent tab={1}>One Tab</TabContent>
				<TabContent tab={2}>Two Tab</TabContent>
				<TabContent tab={3}>Three Tab</TabContent>
			</TabContainer>
		</Tab>
	)
}
