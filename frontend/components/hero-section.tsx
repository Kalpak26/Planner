import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      <Image
        src="/images/HeroSec.png"
        alt="Beautiful travel destination"
        fill
        className="object-cover brightness-[0.7]"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
      <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
          Discover Your Perfect Journey
        </h1>
        <p className="mb-8 max-w-2xl text-lg md:text-xl">
          Plan your dream vacation with personalized itineraries, exclusive deals, and expert travel guides.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white">
            Plan Your Trip
          </Button>
          <Link href="/destinations" passHref>
            <Button
              size="lg"
              variant="outline"
              className="backdrop-blur bg-white/10 border border-white/40 text-white hover:bg-white/20 hover:text-white hover:border-white shadow-md"
            >
              Explore Destinations
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
