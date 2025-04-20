import { SearchForm } from "@/components/search-form"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { TravelGuides } from "@/components/travel-guides"
import { CommunitySection } from "@/components/community-section"
import { Newsletter } from "@/components/newsletter"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div className="container mx-auto px-4 py-12 space-y-24">
        <SearchForm />
        <FeaturedDestinations />
        <TravelGuides />
        <CommunitySection />
        <Newsletter />
      </div>
    </main>
  )
}
