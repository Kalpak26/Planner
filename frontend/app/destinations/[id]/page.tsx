"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, Globe, Heart, MapPin, Star, Users } from "lucide-react"
import { destinationService } from "@/lib/api"
import { fallbackDestinations } from "@/lib/fallback-data"

export default function DestinationDetailPage({ params }: { params: { id: string } }) {
  const [destination, setDestination] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true)
        const data = await destinationService.getById(parseInt(params.id))
        setDestination(data)
      } catch (err) {
        setError("Failed to load destination details")
        // Fallback to static data
        const fallback = fallbackDestinations.find(d => d.id === parseInt(params.id))
                      || fallbackDestinations[0]
        setDestination(fallback)
      } finally {
        setLoading(false)
      }
    }

    fetchDestination()
  }, [params.id])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!destination) {
    return <div className="min-h-screen flex items-center justify-center">Destination not found</div>
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src={destination.imageUrl || "/placeholder.svg?height=800&width=1200"}
          alt={destination.name}
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <div className="container relative z-10 mx-auto flex h-full flex-col justify-end px-4 pb-12">
          <div className="flex items-center gap-2 text-white mb-2">
            <Link href="/destinations" className="text-sm hover:underline">
              Destinations
            </Link>
            <span>›</span>
            <Link href={`/destinations?continent=${destination.continent?.toLowerCase()}`} className="text-sm hover:underline">
              {destination.continent}
            </Link>
            <span>›</span>
            <Link href={`/destinations?country=${destination.country?.toLowerCase()}`} className="text-sm hover:underline">
              {destination.country}
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{destination.name}</h1>
          <div className="flex items-center gap-2 text-white">
            <MapPin className="h-4 w-4" />
            <span>{destination.country}</span>
            {destination.rating && (
              <div className="flex items-center ml-4">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1">{destination.rating}</span>
                <span className="ml-1 text-sm">({destination.reviews || 0} reviews)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <p className="text-lg">{destination.description}</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {destination.gallery.map((image: string, index: number) => (
                <div key={index} className="relative h-40 overflow-hidden rounded-lg">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${destination.name} gallery ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <Tabs defaultValue="attractions" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="attractions">Attractions</TabsTrigger>
                <TabsTrigger value="hotels">Hotels</TabsTrigger>
                <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
              </TabsList>
              <TabsContent value="attractions" className="pt-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {destination.attractions.map((attraction: any, index: number) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={attraction.image || "/placeholder.svg"}
                          alt={attraction.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{attraction.name}</h3>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm">{attraction.rating}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="hotels" className="pt-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {destination.hotels.map((hotel: any, index: number) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{hotel.name}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm">{hotel.rating}</span>
                          </div>
                          <span className="font-medium text-rose-500">{hotel.price}/night</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="restaurants" className="pt-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {destination.restaurants.map((restaurant: any, index: number) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{restaurant.name}</h3>
                        <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm">{restaurant.rating}</span>
                          </div>
                          <span className="text-sm">{restaurant.price}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Plan Your Trip</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-rose-500 hover:bg-rose-600">Check Availability</Button>
                <div className="flex items-center justify-between">
                  <span>Price</span>
                  <span className="font-semibold">{destination.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Best time to visit</span>
                  <span>{destination.timeToVisit}</span>
                </div>
                <Button variant="outline" className="w-full gap-2">
                  <Heart className="h-4 w-4" />
                  Save to Wishlist
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Destination Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Language</p>
                    <p className="text-sm text-muted-foreground">{destination.language}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Currency</p>
                    <p className="text-sm text-muted-foreground">{destination.currency}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Weather</p>
                    <p className="text-sm text-muted-foreground">{destination.weather}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Best Time to Visit</p>
                    <p className="text-sm text-muted-foreground">{destination.timeToVisit}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Tours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    <Image src="/placeholder.svg?height=100&width=100" alt="Tour" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">Paris City Tour</p>
                    <p className="text-sm text-muted-foreground">3 hours • From ₹4,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    <Image src="/placeholder.svg?height=100&width=100" alt="Tour" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">Skip-the-Line Eiffel Tower</p>
                    <p className="text-sm text-muted-foreground">2 hours • From ₹4,500</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    <Image src="/placeholder.svg?height=100&width=100" alt="Tour" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">Seine River Dinner Cruise</p>
                    <p className="text-sm text-muted-foreground">2.5 hours • From ₹8,000</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View All Tours
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
