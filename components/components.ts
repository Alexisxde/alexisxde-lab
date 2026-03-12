import Badges from "@/components/examples/badges"
import Buttons from "@/components/examples/buttons"
import DockExample from "@/components/examples/dock"
import DropDownMenuExample from "@/components/examples/dropdown-menu"
import FloatingDockExample from "@/components/examples/floating-dock"
import InputExample from "@/components/examples/input"
import MenuExample from "@/components/examples/menu"
import ModalExample from "@/components/examples/modal"
import MorphingDialogExample from "@/components/examples/morphing-dialog"
import TabExample from "@/components/examples/tab"
import ToastExample from "@/components/examples/toast"

export const COMPONENTS = [
	{ name: "Dock", example: DockExample, href: "/component/dock" },
	{ name: "Floating Dock", example: FloatingDockExample, href: "/component/floating-dock" },
	{ name: "Tab", example: TabExample, href: "/component/tab" },
	{ name: "Inputs", example: InputExample, href: "/component/inputs" },
	{ name: "Buttons", example: Buttons, href: "/component/buttons" },
	{ name: "Badges", example: Badges, href: "/component/badges" },
	{ name: "Morphing Dialog", example: MorphingDialogExample, href: "/component/morphing-dialog" },
	{ name: "Modal", example: ModalExample, href: "/component/modal" },
	{ name: "Navegation", example: MenuExample, href: "/component/navegation" },
	{ name: "Toast", example: ToastExample, href: "/component/toast" },
	{ name: "Dropdown Menu", example: DropDownMenuExample, href: "/component/dropdown-menu" }
] as const
