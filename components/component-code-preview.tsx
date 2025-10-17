import CodePreview from "@/components/code-preview"
import CodeRenderer from "@/components/code-renderer"
import ComponentPreview from "@/components/component-preview"
import { extractCodeFromFilePath } from "@/lib/code"
import { Tab, TabContent, TabHeader, TabOption } from "./ui/tab"

type ComponentCodePreview = {
	component: React.ReactElement
	filePath: string
	hasReTrigger?: boolean
	classNameComponentContainer?: string
}

export default function ComponentCodePreview({
	component,
	filePath,
	hasReTrigger,
	classNameComponentContainer
}: ComponentCodePreview) {
	const fileContent = extractCodeFromFilePath(filePath)

	return (
		<div className="not-prose relative z-0 flex items-center justify-between pb-4">
			<Tab defaultValue="preview">
				<TabHeader>
					<TabOption value="preview">Preview</TabOption>
					<TabOption value="code">Code</TabOption>
				</TabHeader>
				<TabContent value="preview" className="border-border border">
					<ComponentPreview component={component} hasReTrigger={hasReTrigger} className={classNameComponentContainer} />
				</TabContent>
				<TabContent value="code" className="border-border border">
					<CodePreview code={fileContent}>
						<CodeRenderer code={fileContent} lang="tsx" />
					</CodePreview>
				</TabContent>
			</Tab>
		</div>
	)
}
