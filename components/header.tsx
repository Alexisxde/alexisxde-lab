export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-12 max-h-12 min-h-12 items-center justify-between border-b-1 border-neutral-200 bg-neutral-100 px-6 dark:border-neutral-800 dark:bg-neutral-950">
      <nav className="flex items-center gap-4 border-r-1 border-neutral-200 pr-4 text-sm font-medium">
        {/* <a
          className="text-neutral-400 transition-colors duration-300 ease-in-out hover:text-neutral-100"
          href="/components/button">
          Components
        </a> */}
      </nav>
    </header>
  )
}
