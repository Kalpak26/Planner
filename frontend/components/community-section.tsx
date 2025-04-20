"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Heart, MessageCircle, Share2 } from "lucide-react"

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
]

const communityPosts = [
  {
    id: 1,
    title: "Hidden Gems of Portugal: Beyond Lisbon and Porto",
    author: {
      name: "Emma Wilson",
      avatar: "/images/pfp/emma.jpg?height=40&width=40",
    },
    date: "November 10, 2023",
    image: "/images/destinations/protug.jpg?height=400&width=600",
    excerpt:
      "After three weeks exploring Portugal's lesser-known regions, I've compiled a guide to the country's most underrated destinations. From the mystical forests of Sintra to the untouched beaches of the Alentejo coast...",
    likes: 124,
    comments: 32,
    tags: ["Europe", "Off the Beaten Path", "Budget Travel"],
  },
  {
    id: 2,
    title: "Solo Female Travel in Morocco: Tips and Experiences",
    author: {
      name: "Aisha Johnson",
      avatar: "/images/pfp/Aisha.jpg?height=40&width=40",
    },
    date: "October 28, 2023",
    image: "/images/destinations/morocco.jpg?height=400&width=600",
    excerpt:
      "As a woman traveling alone through Morocco for a month, I encountered incredible hospitality alongside some challenges. Here's my honest account of navigating the medinas, desert tours, and mountain villages with practical advice for fellow solo female travelers...",
    likes: 215,
    comments: 47,
    tags: ["Solo Travel", "Africa", "Travel Tips"],
  },
  {
    id: 3,
    title: "A Foodie's Guide to Mexico City's Street Food Scene",
    author: {
      name: "Carlos Rodriguez",
      avatar: "/images/pfp/carlos.jpg?height=40&width=40",
    },
    date: "November 5, 2023",
    image: "/images/destinations/mexico.jpeg?height=400&width=600",
    excerpt:
      "From tacos al pastor to the perfect chilaquiles, this guide will take you through Mexico City's vibrant street food culture. I spent two weeks eating my way through different neighborhoods and markets to find the most authentic and delicious spots...",
    likes: 189,
    comments: 28,
    tags: ["Food", "Latin America", "City Guide"],
  },
]

export function CommunitySection() {
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const toggleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId))
    } else {
      setLikedPosts([...likedPosts, postId])
    }
  }

  return (
    <section className="py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Community</h2>
        <p className="text-muted-foreground max-w-2xl">
          Connect with fellow travelers, share experiences, and discover authentic insights from our community
        </p>
      </div>

      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="reviews">Traveler Reviews</TabsTrigger>
          <TabsTrigger value="posts">Community Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-8">
          <div className="grid grid-cols-1 gap-8">
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
                        <span className="font-medium text-rose-500">• {review.destination}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Button variant="outline">View More Reviews</Button>
          </div>
        </TabsContent>

        <TabsContent value="posts" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden border-none transition-all hover:shadow-lg h-full flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2 flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 border-t flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.author.avatar || "/images/pfp/default.jpg"} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 text-xs" onClick={() => toggleLike(post.id)}>
                      <Heart
                        className={`h-4 w-4 ${likedPosts.includes(post.id) ? "fill-rose-500 text-rose-500" : ""}`}
                      />
                      <span>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/community">
              <Button variant="outline">View All Community Posts</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
