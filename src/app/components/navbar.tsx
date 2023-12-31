import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="p-4 sticky top-0 drop-shadow-xl z-10 bg-amber-900 dark:bg-slate-950">
            <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
                <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
                    <Link href="/" className="text-white/90 no-underline hover:text-white">Project Linnaeus</Link>
                </h1>
            </div>
        </nav>
    )
}