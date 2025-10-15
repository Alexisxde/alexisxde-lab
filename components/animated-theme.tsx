"use client"
import { Moon, SunDim } from "lucide-react"
import { useTheme } from "next-themes"
import { useRef } from "react"
import { flushSync } from "react-dom"
import Button from "./ui/button"

type Props = { className?: string }

export default function AnimatedThemeToggle({ className }: Props) {
	const { theme, setTheme } = useTheme()
	const buttonRef = useRef<HTMLButtonElement | null>(null)

	const changeTheme = async () => {
		if (!buttonRef.current) return

		await document.startViewTransition(() => {
			flushSync(() => setTheme(prev => (prev === "dark" ? "light" : "dark")))
		}).ready

		const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
		const y = top + height / 2
		const x = left + width / 2

		const right = window.innerWidth - left
		const bottom = window.innerHeight - top
		const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom))

		document.documentElement.animate(
			{ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRad}px at ${x}px ${y}px)`] },
			{ duration: 700, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
		)
	}
	return (
		<Button ref={buttonRef} variant="ghost" size="icon" onClick={changeTheme} className={`rounded-full ${className}`}>
			{theme === "dark" ? <SunDim className="size-5" /> : <Moon className="size-5" />}
		</Button>
	)
}
