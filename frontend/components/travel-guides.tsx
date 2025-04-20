import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, Clock, MapPin } from "lucide-react"

const guides = [
  {
    id: 1,
    title: "Ultimate Guide to Tokyo: 7 Day Itinerary",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "May 15, 2023",
    readTime: "12 min read",
    location: "Tokyo, Japan",
  },
  {
    id: 2,
    title: "Hidden Gems of Barcelona: Local's Guide",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "Carlos Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "April 22, 2023",
    readTime: "9 min read",
    location: "Barcelona, Spain",
  },
  {
    id: 3,
    title: "Island Hopping in Thailand: Complete Guide",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "June 3, 2023",
    readTime: "15 min read",
    location: "Thailand",
  },
]

export function TravelGuides() {
  return (
    <section className="py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Travel Guides & Itineraries</h2>
        <p className="text-muted-foreground max-w-2xl">
          Expert recommendations and detailed itineraries to help you plan the perfect trip
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {guides.map((guide) => (
          <Link href="#" key={guide.id} className="group">
            <Card className="overflow-hidden border-none transition-all hover:shadow-lg h-full flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={guide.image || "/placeholder.svg"}
                  alt={guide.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6 flex-grow">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{guide.location}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-rose-500 transition-colors">
                  {guide.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{guide.date}</span>
                  <span className="mx-1">•</span>
                  <Clock className="h-4 w-4" />
                  <span>{guide.readTime}</span>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0 border-t">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={guide.author.avatar || "/placeholder.svg"} alt={guide.author.name} />
                    <AvatarFallback>{guide.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{guide.author.name}</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
