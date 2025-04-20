import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumb() {
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
      <Link href="/" className="flex items-center hover:text-foreground">
        <Home className="h-4 w-4 mr-1" />
        <span>Home</span>
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/results" className="hover:text-foreground">
        Search Results
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground font-medium">Flights to Paris</span>
    </nav>
  )
}
