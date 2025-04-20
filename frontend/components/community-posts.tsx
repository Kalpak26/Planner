"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Heart, MessageCircle, Share2 } from "lucide-react"

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
    content:
      "After three weeks exploring Portugal's lesser-known regions, I've compiled a guide to the country's most underrated destinations. From the mystical forests of Sintra to the untouched beaches of the Alentejo coast, Portugal offers so much more than its famous cities. In this post, I'll share my favorite hidden spots, local restaurants, and tips for traveling off the beaten path in this beautiful country.",
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
    content:
      "As a woman traveling alone through Morocco for a month, I encountered incredible hospitality alongside some challenges. Here's my honest account of navigating the medinas, desert tours, and mountain villages with practical advice for fellow solo female travelers. From what to wear to how to handle unwanted attention, this guide covers everything I wish I'd known before my trip.",
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
    content:
      "From tacos al pastor to the perfect chilaquiles, this guide will take you through Mexico City's vibrant street food culture. I spent two weeks eating my way through different neighborhoods and markets to find the most authentic and delicious spots. Learn about the history behind iconic dishes, where to find the best vendors, and how to eat like a local in one of the world's greatest food cities.",
    likes: 189,
    comments: 28,
    tags: ["Food", "Latin America", "City Guide"],
  },
  {
    id: 4,
    title: "How to Travel Southeast Asia on ₹3,000 a Day",
    author: {
      name: "David Chen",
      avatar: "/images/pfp/david.jpg?height=40&width=40",
    },
    date: "November 15, 2023",
    image: "/images/destinations/SEasia.jpg?height=400&width=600",
    excerpt:
      "Budget travel doesn't mean missing out on amazing experiences. In this comprehensive guide, I break down exactly how I traveled through Thailand, Vietnam, Cambodia, and Laos for three months on just ₹3,000 per day...",
    content:
      "Budget travel doesn't mean missing out on amazing experiences. In this comprehensive guide, I break down exactly how I traveled through Thailand, Vietnam, Cambodia, and Laos for three months on just ₹3,000 per day. From accommodation hacks to transportation tips and affordable food options, this post covers everything you need to know to make your Southeast Asia adventure both affordable and unforgettable.",
    likes: 156,
    comments: 41,
    tags: ["Budget Travel", "Asia", "Backpacking"],
  },
  {
    id: 5,
    title: "The Ultimate Road Trip Through New Zealand's South Island",
    author: {
      name: "Sarah Miller",
      avatar: "/images/pfp/sarah.jpg?height=40&width=40",
    },
    date: "November 8, 2023",
    image: "/images/destinations/nz.jpg?height=400&width=600",
    excerpt:
      "Two weeks, one campervan, and the most spectacular landscapes you'll ever see. Follow my detailed itinerary for the perfect South Island road trip, including hidden spots that most tourists miss...",
    content:
      "Two weeks, one campervan, and the most spectacular landscapes you'll ever see. Follow my detailed itinerary for the perfect South Island road trip, including hidden spots that most tourists miss. From the majestic fjords of Milford Sound to the stargazing paradise of Lake Tekapo, this guide includes driving times, camping spots, hiking trails, and photography tips for capturing New Zealand's breathtaking scenery.",
    likes: 178,
    comments: 35,
    tags: ["Road Trip", "Oceania", "Nature"],
  },
]

export function CommunityPosts() {
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const toggleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId))
    } else {
      setLikedPosts([...likedPosts, postId])
    }
  }

  return (
    <div className="space-y-6">
      {communityPosts.map((post) => (
        <Card key={post.id} className="overflow-hidden border-none shadow-md">
          <div className="grid md:grid-cols-[300px_1fr] gap-6">
            <div className="relative h-48 md:h-auto overflow-hidden">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
            <div className="flex flex-col p-6">
              <CardHeader className="p-0 pb-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-xl mb-2">
                  <Link href={`/community/post/${post.id}`} className="hover:text-rose-500 transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.author.avatar || "/images/pfp/default.jpg"} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{post.author.name}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-grow">
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="p-0 pt-4 flex justify-between items-center border-t">
                <Link href={`/community/post/${post.id}`}>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </Link>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm" onClick={() => toggleLike(post.id)}>
                    <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? "fill-rose-500 text-rose-500" : ""}`} />
                    <span>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
      <div className="flex justify-center mt-8">
        <Button variant="outline">Load More Posts</Button>
      </div>
    </div>
  )
}
