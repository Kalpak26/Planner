import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Jessica Chen",
    location: "New York, USA",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "This travel planner made our honeymoon planning so easy! The personalized recommendations were spot on, and we discovered places we never would have found on our own.",
  },
  {
    id: 2,
    name: "Michael Brown",
    location: "London, UK",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "I've used many travel sites before, but this one stands out. The interface is beautiful and intuitive, and the trip organization features saved me hours of planning time.",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    location: "Sydney, Australia",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4,
    text: "As a frequent traveler, I appreciate how this platform helps me keep all my travel details organized in one place. The flight price alerts have saved me hundreds of dollars!",
  },
]

export function Testimonials() {
  return (
    <section className="py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Travelers Say</h2>
        <p className="text-muted-foreground max-w-2xl">
          Hear from travelers who have used our platform to plan their perfect trips
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="mb-6 italic text-muted-foreground">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
