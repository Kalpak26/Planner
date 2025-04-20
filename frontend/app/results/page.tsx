"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { SearchResults } from "@/components/search-results"
import { SearchFilters } from "@/components/search-filters"
import { Breadcrumb } from "@/components/breadcrumb"
import { flightService } from "@/lib/api"
import { fallbackFlights } from "@/lib/fallback-data"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const [flights, setFlights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  const from = searchParams.get('from') || ''
  const to = searchParams.get('to') || ''
  const departDate = searchParams.get('departDate') || ''
  
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true)
        if (!from || !to || !departDate) {
          setFlights(fallbackFlights)
          return
        }
        
        const data = await flightService.search({
          departureCity: from,
          arrivalCity: to,
          departureDate: departDate,
          travelers: 1
        })
        
        setFlights(data)
      } catch (err) {
        setError("Failed to load flights")
        console.error(err)
        setFlights(fallbackFlights)
      } finally {
        setLoading(false)
      }
    }
    
    fetchFlights()
  }, [from, to, departDate])
  
  const destination = to || "Paris"

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />
        <h1 className="text-3xl font-bold mb-6">Flights to {destination}</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}
        
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          <SearchFilters />
          <SearchResults isLoading={loading} flights={flights} />
        </div>
      </div>
    </main>
  )
}