import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Luggage } from "lucide-react"

interface SearchResultsProps {
  isLoading: boolean;
  flights: any[];
}

export function SearchResults({ isLoading, flights }: SearchResultsProps) {
  if (isLoading) {
    return <div className="text-center py-8">Loading flights...</div>
  }
  
  if (flights.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="mb-4">No flights found matching your criteria.</p>
        <p>Try adjusting your search parameters.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Showing {flights.length} results</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select className="text-sm border rounded-md px-2 py-1">
            <option>Price (Low to High)</option>
            <option>Price (High to Low)</option>
            <option>Duration (Shortest)</option>
            <option>Departure (Earliest)</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {flights.map((flight) => (
          <Card key={flight.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-[1fr_auto] border-b">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 relative">
                      <Image
                        src={flight.airlineLogoUrl || "/placeholder.svg?height=40&width=40"}
                        alt={flight.airline}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{flight.airline}</p>
                      <p className="text-sm text-muted-foreground">{flight.flightNumber || "Flight AF1234"}</p>
                    </div>
                    {flight.deal && <Badge className="ml-auto bg-rose-500 hover:bg-rose-600">{flight.deal}</Badge>}
                  </div>

                  <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                    <div>
                      <p className="text-2xl font-bold">{typeof flight.departureTime === 'string' ? flight.departureTime : new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      <p className="text-sm font-medium">{flight.departureAirport}</p>
                      <p className="text-sm text-muted-foreground">{flight.departureCity}</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                        <Clock className="h-3 w-3" /> {flight.duration}
                      </p>
                      <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-dashed"></div>
                        </div>
                        <div className="relative flex justify-center">
                          {flight.stops === 0 ? (
                            <span className="bg-white px-2 text-xs text-muted-foreground">Nonstop</span>
                          ) : (
                            <span className="bg-white px-2 text-xs text-muted-foreground">
                              {flight.stops} stop ({flight.stopAirport})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold">{typeof flight.arrivalTime === 'string' ? flight.arrivalTime : new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      <p className="text-sm font-medium">{flight.arrivalAirport}</p>
                      <p className="text-sm text-muted-foreground">{flight.arrivalCity}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Luggage className="h-4 w-4" />
                      <span>Carry-on included</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 flex flex-col justify-between">
                  <div className="text-center mb-4">
                    <p className="text-3xl font-bold">₹{typeof flight.price === 'number' ? flight.price : flight.price?.toFixed(0)}</p>
                    <p className="text-sm text-muted-foreground">Round trip</p>
                  </div>
                  <Link href={`/trip-details?flightId=${flight.id}`}>
                    <Button className="w-full bg-rose-500 hover:bg-rose-600">
                      Select <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline" className="mx-auto">
          Load More Results
        </Button>
      </div>
    </div>
  )
}