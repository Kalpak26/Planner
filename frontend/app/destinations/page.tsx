"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { destinationService } from "@/lib/api"

interface Destination {
  id: number
  name: string
  country: string
  continent: string
  description: string
  imageUrl: string
  priceStarting: number
  badge?: string
}

const continents = [
  { id: "europe", name: "Europe" },
  { id: "asia", name: "Asia" },
  { id: "north-america", name: "North America" },
  { id: "south-america", name: "South America" },
  { id: "africa", name: "Africa" },
  { id: "oceania", name: "Oceania" },
]

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true)
        const data = await destinationService.getAll()
        setDestinations(data)
      } catch (err) {
        setError("Failed to load destinations")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      setLoading(true)
      const data = await destinationService.search(searchQuery)
      setDestinations(data)
    } catch (err) {
      setError("Search failed")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const filterByContinent = async (continent: string) => {
    try {
      setLoading(true)
      const data =
        continent === "all"
          ? await destinationService.getAll()
          : await destinationService.getByContinent(continent)
      setDestinations(data)
    } catch (err) {
      setError("Failed to filter destinations")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />
        <h1 className="text-3xl font-bold mb-6">Explore Destinations</h1>

        <div className="mb-8 max-w-xl">
          <div className="relative">
            <Input 
              placeholder="Search destinations..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Search 
              className="absolute left-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer" 
              onClick={handleSearch}
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 flex flex-wrap h-auto">
            <TabsTrigger 
              value="all" 
              className="mb-2 mr-2"
              onClick={() => filterByContinent("all")}
            >
              All Destinations
            </TabsTrigger>
            {continents.map((continent) => (
              <TabsTrigger 
                key={continent.id} 
                value={continent.id} 
                className="mb-2 mr-2"
                onClick={() => filterByContinent(continent.id)}
              >
                {continent.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {loading ? (
              <div className="text-center py-10">Loading destinations...</div>
            ) : destinations.length === 0 ? (
              <div className="text-center py-10">
                No destinations found. Try a different search or filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((destination) => (
                  <Link 
                    key={destination.id} 
                    href={`/destinations/${destination.id}`} 
                    className="group"
                  >
                    <Card className="overflow-hidden border-none transition-all hover:shadow-lg">
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={destination.imageUrl || "/placeholder.svg?height=600&width=800"}
                          alt={destination.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {destination.badge && (
                          <Badge className="absolute top-3 right-3 bg-rose-500 hover:bg-rose-600">
                            {destination.badge}
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-xl font-semibold mb-1">{destination.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{destination.country}</p>
                        <p className="text-muted-foreground text-sm mb-3">{destination.description}</p>
                        <p className="font-semibold text-rose-500">From ₹{destination.priceStarting}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
