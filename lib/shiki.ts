import { bundledLanguages, createHighlighter, type Highlighter } from "shiki/bundle/web"
import { noir } from "./custom-theme"

let highlighterPromise: Promise<Highlighter> | null = null

export const codeToHtml = async ({ code, lang }: { code: string; lang: string }) => {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: [noir],
			langs: [...Object.keys(bundledLanguages)]
		})
	}

	const highlighter = await highlighterPromise

	return highlighter.codeToHtml(code, {
		lang: lang,
		theme: "noir"
	})
}
