import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    image: "/images/destinations/santorini.jpg?height=600&width=800",
    description: "Iconic white buildings with blue domes overlooking the Aegean Sea",
    price: "₹74,999",
    badge: "Popular",
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    image: "/images/destinations/kyoto.jpg?height=600&width=800",
    description: "Ancient temples, traditional gardens, and cherry blossoms",
    price: "₹1,09,999",
    badge: "Cultural",
  },
  {
    id: 3,
    name: "Bali, Indonesia",
    image: "/images/destinations/bali.png?height=600&width=800",
    description: "Tropical paradise with lush rice terraces and vibrant culture",
    price: "₹74,999",
    badge: "Best Value",
  },
  {
    id: 4,
    name: "Amalfi Coast, Italy",
    image: "/images/destinations/AmalfiCoast.jpg?height=600&width=800",
    description: "Stunning coastal views, colorful villages, and Mediterranean charm",
    price: "₹1,00,999",
    badge: "Trending",
  },
]

export function FeaturedDestinations() {
  return (
    <section className="py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Destinations</h2>
        <p className="text-muted-foreground max-w-2xl">
          Discover our handpicked selection of the most breathtaking destinations around the world
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <Link href="#" key={destination.id} className="group">
            <Card className="overflow-hidden border-none transition-all hover:shadow-lg">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {destination.badge && (
                  <Badge className="absolute top-3 right-3 bg-rose-500 hover:bg-rose-600">{destination.badge}</Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{destination.description}</p>
                <p className="font-semibold text-rose-500">From {destination.price}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
