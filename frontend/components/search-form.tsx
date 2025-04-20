"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

const popularDestinations = [
  { value: "paris", label: "Paris, France" },
  { value: "tokyo", label: "Tokyo, Japan" },
  { value: "new-york", label: "New York, USA" },
  { value: "bali", label: "Bali, Indonesia" },
  { value: "rome", label: "Rome, Italy" },
  { value: "london", label: "London, UK" },
  { value: "sydney", label: "Sydney, Australia" },
  { value: "barcelona", label: "Barcelona, Spain" },
]

export function SearchForm() {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("flights")

  // Common
  const [destination, setDestination] = useState("")
  const [openDestination, setOpenDestination] = useState(false)

  // Flights
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [openDeparture, setOpenDeparture] = useState(false)
  const [openReturn, setOpenReturn] = useState(false)
  const [travelers, setTravelers] = useState("1")
  const [departureCity, setDepartureCity] = useState("new-york")

  // Hotels
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [hotelGuests, setHotelGuests] = useState("2")

  // Activities
  const [activityDate, setActivityDate] = useState<Date>()
  const [activityCategory, setActivityCategory] = useState("all")
  const [activityTravelers, setActivityTravelers] = useState("2")

  const handleSearch = () => {
    if (!destination) {
      alert("Please select a destination")
      return
    }

    let searchParams = new URLSearchParams()

    if (activeTab === "flights") {
      if (!departureDate) {
        alert("Please select a departure date")
        return
      }
      searchParams.set("from", departureCity)
      searchParams.set("to", destination)
      searchParams.set("departDate", format(departureDate, 'yyyy-MM-dd'))
      if (returnDate) {
        searchParams.set("returnDate", format(returnDate, 'yyyy-MM-dd'))
      }
      searchParams.set("travelers", travelers)
      router.push(`/flights?${searchParams.toString()}`)

    } else if (activeTab === "hotels") {
      if (!checkInDate || !checkOutDate) {
        alert("Please select check-in and check-out dates")
        return
      }
      searchParams.set("location", destination)
      searchParams.set("checkIn", format(checkInDate, 'yyyy-MM-dd'))
      searchParams.set("checkOut", format(checkOutDate, 'yyyy-MM-dd'))
      searchParams.set("guests", hotelGuests)
      router.push(`/hotels?${searchParams.toString()}`)

    } else if (activeTab === "activities") {
      if (!activityDate) {
        alert("Please select a date for activities")
        return
      }
      searchParams.set("location", destination)
      searchParams.set("date", format(activityDate, 'yyyy-MM-dd'))
      searchParams.set("category", activityCategory)
      searchParams.set("travelers", activityTravelers)
      router.push(`/activities?${searchParams.toString()}`)
    }
  }

  return (
    <section className="py-8">
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">Find your perfect trip</CardTitle>
          <CardDescription>
            Search flights, hotels, and activities all in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="flights">Flights</TabsTrigger>
              <TabsTrigger value="hotels">Hotels</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
            </TabsList>

            {/* Flights Tab */}
            <TabsContent value="flights" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Destination */}
                <Popover open={openDestination} onOpenChange={setOpenDestination}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="justify-between h-16">
                      <div className="flex flex-col items-start">
                        <p className="text-xs text-muted-foreground">Destination</p>
                        {destination ? (
                          <span>{popularDestinations.find(d => d.value === destination)?.label}</span>
                        ) : (
                          <span className="text-muted-foreground">Where to?</span>
                        )}
                      </div>
                      <MapPinIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search destination..." />
                      <CommandList>
                        <CommandEmpty>No destination found.</CommandEmpty>
                        <CommandGroup>
                          {popularDestinations.map(d => (
                            <CommandItem
                              key={d.value}
                              value={d.value}
                              onSelect={val => {
                                setDestination(val)
                                setOpenDestination(false)
                              }}
                            >
                              {d.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* Departure Date */}
                <Popover open={openDeparture} onOpenChange={setOpenDeparture}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("justify-between h-16", !departureDate && "text-muted-foreground")}>
                      <div className="flex flex-col items-start">
                        <p className="text-xs text-muted-foreground">Departure</p>
                        {departureDate ? <span>{format(departureDate, "PPP")}</span> : <span>Select date</span>}
                      </div>
                      <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                  </PopoverContent>
                </Popover>

                {/* Return Date */}
                <Popover open={openReturn} onOpenChange={setOpenReturn}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("justify-between h-16", !returnDate && "text-muted-foreground")}>
                      <div className="flex flex-col items-start">
                        <p className="text-xs text-muted-foreground">Return</p>
                        {returnDate ? <span>{format(returnDate, "PPP")}</span> : <span>Select date</span>}
                      </div>
                      <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
                  </PopoverContent>
                </Popover>

                {/* Travelers */}
                <Select onValueChange={setTravelers}>
                  <SelectTrigger className="h-16">
                    <div className="flex flex-col items-start">
                      <p className="text-xs text-muted-foreground">Travelers</p>
                      <SelectValue placeholder="1 Adult" />
                    </div>
                    <UsersIcon className="ml-2 h-4 w-4 opacity-50" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Adult</SelectItem>
                    <SelectItem value="2">2 Adults</SelectItem>
                    <SelectItem value="3">2 Adults, 1 Child</SelectItem>
                    <SelectItem value="4">2 Adults, 2 Children</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSearch} className="w-full bg-rose-500 hover:bg-rose-600 h-12 mt-4">Search Flights</Button>
            </TabsContent>

            {/* Hotels Tab */}
            <TabsContent value="hotels" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Destination */}
                <Popover open={openDestination} onOpenChange={setOpenDestination}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-between h-16">
                      <div className="flex flex-col items-start">
                        <p className="text-xs text-muted-foreground">Destination</p>
                        {destination ? (
                          <span>{popularDestinations.find(d => d.value === destination)?.label}</span>
                        ) : (
                          <span className="text-muted-foreground">Where to?</span>
                        )}
                      </div>
                      <MapPinIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search destination..." />
                      <CommandList>
                        <CommandEmpty>No destination found.</CommandEmpty>
                        <CommandGroup>
                          {popularDestinations.map(d => (
                            <CommandItem
                              key={d.value}
                              value={d.value}
                              onSelect={val => {
                                setDestination(val)
                                setOpenDestination(false)
                              }}
                            >
                              {d.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* Check-in */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-between h-16">
                      <div className="flex flex-col items-start">
                        <p className="text-xs text-muted-foreground">Check-in</p>
                        {checkInDate ? <span>{format(checkInDate, "PPP")}</span> : <span>Select date</span>}
                      </div>
                      <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
                  </PopoverContent>
                </Popover>

                {/* Check-out */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-between h-16">
                      <div className="flex flex-col items-start">
                        <p className="text-xs text-muted-foreground">Check-out</p>
                        {checkOutDate ? <span>{format(checkOutDate, "PPP")}</span> : <span>Select date</span>}
                      </div>
                      <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus />
                  </PopoverContent>
                </Popover>

                {/* Guests */}
                <Select onValueChange={setHotelGuests}>
                  <SelectTrigger className="h-16">
                    <div className="flex flex-col items-start">
                      <p className="text-xs text-muted-foreground">Guests</p>
                      <SelectValue placeholder="2 Guests, 1 Room" />
                    </div>
                    <UsersIcon className="ml-2 h-4 w-4 opacity-50" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest, 1 Room</SelectItem>
                    <SelectItem value="2">2 Guests, 1 Room</SelectItem>
                    <SelectItem value="3">3 Guests, 1 Room</SelectItem>
                    <SelectItem value="4">4 Guests, 2 Rooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSearch} className="w-full bg-rose-500 hover:bg-rose-600 h-12 mt-4">Search Hotels</Button>
            </TabsContent>

            {/* Activities Tab */}
            <TabsContent value="activities" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Destination */}
                <Popover open={openDestination} onOpenChange={setOpenDestination}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-between h-16">
                      <div className="flex flex-col items-start">
                        <p className="text-xs text-muted-foreground">Destination</p>
                        {destination ? (
                          <span>{popularDestinations.find(d => d.value === destination)?.label}</span>
                        ) : (
                          <span className="text-muted-foreground">Where to?</span>
                        )}
                      </div>
                      <MapPinIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search destination..." />
                      <CommandList>
                        <CommandEmpty>No destination found.</CommandEmpty>
                        <CommandGroup>
                          {popularDestinations.map(d => (
                            <CommandItem
                              key={d.value}
                              value={d.value}
                              onSelect={val => {
                                setDestination(val)
                                setOpenDestination(false)
                              }}
                            >
                              {d.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* Activity Date */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-between h-16">
                      <div className="flex flex-col items-start">
                        <p className="text-xs text-muted-foreground">Date</p>
                        {activityDate ? <span>{format(activityDate, "PPP")}</span> : <span>Select date</span>}
                      </div>
                      <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={activityDate} onSelect={setActivityDate} initialFocus />
                  </PopoverContent>
                </Popover>

                {/* Category */}
                <Select onValueChange={setActivityCategory}>
                  <SelectTrigger className="h-16">
                    <div className="flex flex-col items-start">
                      <p className="text-xs text-muted-foreground">Category</p>
                      <SelectValue placeholder="All Categories" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="tours">Tours & Sightseeing</SelectItem>
                    <SelectItem value="outdoor">Outdoor Activities</SelectItem>
                    <SelectItem value="food">Food & Drink</SelectItem>
                    <SelectItem value="cultural">Cultural Experiences</SelectItem>
                  </SelectContent>
                </Select>

                {/* Travelers */}
                <Select onValueChange={setActivityTravelers}>
                  <SelectTrigger className="h-16">
                    <div className="flex flex-col items-start">
                      <p className="text-xs text-muted-foreground">Travelers</p>
                      <SelectValue placeholder="2 Adults" />
                    </div>
                    <UsersIcon className="ml-2 h-4 w-4 opacity-50" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Adult</SelectItem>
                    <SelectItem value="2">2 Adults</SelectItem>
                    <SelectItem value="3">2 Adults, 1 Child</SelectItem>
                    <SelectItem value="4">2 Adults, 2 Children</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSearch} className="w-full bg-rose-500 hover:bg-rose-600 h-12 mt-4">Search Activities</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}
