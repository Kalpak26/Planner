import { TripSummary } from "@/components/trip-summary"
import { TripItinerary } from "@/components/trip-itinerary"
import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TripDetailsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />
        <h1 className="text-3xl font-bold mb-6">Trip Details</h1>

        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
          <div className="space-y-8">
            <Tabs defaultValue="itinerary" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="flights">Flights</TabsTrigger>
                <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
              </TabsList>
              <TabsContent value="itinerary" className="pt-6">
                <TripItinerary />
              </TabsContent>
              <TabsContent value="flights" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Flight Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Your flight details will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="accommodations" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Accommodation Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Your accommodation details will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <TripSummary />
            <div className="mt-6">
              <Button className="w-full bg-rose-500 hover:bg-rose-600 h-12">Book This Trip</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
