"use client"
import { FloatingDock, FloatingDockAnchor, FloatingDockContent, FloatingDockTrigger } from "@/components/ui/floating-dock"
import { FacebookIcon, GithubIcon, TwitterIcon } from "lucide-react"

export default function FloatingDockExample() {
	return (
		<FloatingDock>
			<FloatingDockTrigger />
			<FloatingDockContent>
				<FloatingDockAnchor title="Twitter" icon={<TwitterIcon className="text-icon-primary size-5" />} href="#" />
				<FloatingDockAnchor title="Github" icon={<GithubIcon className="text-icon-primary size-5" />} href="#" />
				<FloatingDockAnchor title="Facebook" icon={<FacebookIcon className="text-icon-primary size-5" />} href="#" />
			</FloatingDockContent>
		</FloatingDock>
	)
}
