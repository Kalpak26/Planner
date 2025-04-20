import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, MapPin } from "lucide-react"

const communityReviews = [
  {
    id: 1,
    name: "Jessica Chen",
    location: "New York, USA",
    avatar: "/images/pfp/jessica.jpg?height=60&width=60",
    verified: true,
    date: "October 15, 2023",
    destination: "Kyoto, Japan",
    text: "My trip to Kyoto was absolutely magical. The autumn colors at the temples were breathtaking, and I found this amazing little tea house tucked away near Arashiyama that wasn't in any guidebook. The owner spoke little English but was so welcoming. If you go, try to stay in a traditional ryokan for at least one night - sleeping on tatami mats and experiencing the kaiseki dinner was unforgettable.",
  },
  {
    id: 2,
    name: "Michael Brown",
    location: "London, UK",
    avatar: "/images/pfp/michaelbrown.jpg?height=60&width=60",
    verified: true,
    date: "September 22, 2023",
    destination: "Amalfi Coast, Italy",
    text: "The Amalfi Coast exceeded all my expectations. We rented a car (not for the faint-hearted on those winding roads!) and spent a week exploring the small towns. Ravello was my favorite - less crowded than Positano but equally beautiful. Pro tip: the best limoncello is found in the small family shops, not the tourist spots. And don't miss the Path of the Gods hike for the most spectacular views of the coastline.",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    location: "Sydney, Australia",
    avatar: "/images/pfp/sophia.png?height=60&width=60",
    verified: true,
    date: "November 3, 2023",
    destination: "Bali, Indonesia",
    text: "I spent a month in Bali as a digital nomad and discovered so much beyond the typical tourist spots. Sidemen Valley is still relatively untouched and offers the rice terrace views without the crowds of Ubud. For those looking for wellness, check out the small studios in Canggu rather than the expensive retreats. The local warungs (small family restaurants) serve the most authentic and delicious food - my favorite was Warung Biah Biah in Ubud.",
  },
  {
    id: 4,
    name: "James Wilson",
    location: "Toronto, Canada",
    avatar: "/images/pfp/james.jpg?height=60&width=60",
    verified: true,
    date: "October 28, 2023",
    destination: "Marrakech, Morocco",
    text: "Marrakech is a sensory overload in the best possible way. The medina is a maze of narrow alleys filled with shops, food stalls, and incredible architecture. I recommend staying in a traditional riad within the medina walls for the full experience. Don't miss Jardin Majorelle and the YSL Museum, and be sure to book a guided tour for at least your first day to get oriented. For a break from the hustle, the Agafay Desert just outside the city offers a peaceful contrast.",
  },
  {
    id: 5,
    name: "Elena Petrova",
    location: "Berlin, Germany",
    avatar: "/images/pfp/elena.jpg?height=60&width=60",
    verified: true,
    date: "November 12, 2023",
    destination: "Mexico City, Mexico",
    text: "Mexico City surprised me with its incredible art scene, architecture, and of course, the food. The Frida Kahlo Museum was a highlight, but make sure to book tickets well in advance. I stayed in Roma Norte, which is perfect for walking to great restaurants and cafes. Don't miss the Anthropology Museum - you could spend an entire day there. For a special experience, book a table at Pujol or Quintonil, but also try the street food - the tacos al pastor are life-changing!",
  },
]

export function CommunityReviews() {
  return (
    <div className="space-y-6">
      {communityReviews.map((review) => (
        <Card key={review.id} className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="h-12 w-12 border">
                <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{review.name}</h3>
                  {review.verified && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      Verified Traveler
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">{review.location}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <CalendarIcon className="h-3 w-3" />
                  <span>{review.date}</span>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1 text-sm font-medium text-rose-500">
                <MapPin className="h-4 w-4" />
                {review.destination}
              </div>
            </div>
            <p className="text-muted-foreground">{review.text}</p>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-center mt-8">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  )
}
