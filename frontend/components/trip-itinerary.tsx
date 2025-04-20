import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPin } from "lucide-react"

export function TripItinerary() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-rose-500" />
          <h2 className="text-xl font-semibold">Day 1 - June 15, 2023</h2>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-[250px_1fr] border-b">
              <div className="relative h-48 md:h-full">
                <Image src="/images/leMarais.jpg" alt="Eiffel Tower" fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">Arrival & Hotel Check-in</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>Le Marais, Paris</span>
                    </div>
                  </div>
                  <Badge>Accommodation</Badge>
                </div>
                <p className="text-muted-foreground mb-4">
                  Arrive at Charles de Gaulle Airport and transfer to your boutique hotel in the heart of Le Marais
                  district. Take time to settle in and explore the charming neighborhood.
                </p>
                <div className="text-sm">
                  <p>
                    <strong>Check-in:</strong> 3:00 PM
                  </p>
                  <p>
                    <strong>Hotel:</strong> Hôtel Jeanne d'Arc Le Marais
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-[250px_1fr] border-b">
              <div className="relative h-48 md:h-full">
                <Image src="/images/ParisCafe.jpg" alt="Parisian Cafe" fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">Welcome Dinner</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>Saint-Germain-des-Prés, Paris</span>
                    </div>
                  </div>
                  <Badge>Dining</Badge>
                </div>
                <p className="text-muted-foreground mb-4">
                  Enjoy an authentic French dinner at a charming bistro in Saint-Germain-des-Prés. Experience classic
                  French cuisine and wine in a cozy atmosphere.
                </p>
                <div className="text-sm">
                  <p>
                    <strong>Time:</strong> 7:30 PM
                  </p>
                  <p>
                    <strong>Restaurant:</strong> Bistrot des Augustins
                  </p>
                  <p>
                    <strong>Reservation:</strong> Confirmed
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-rose-500" />
          <h2 className="text-xl font-semibold">Day 2 - June 16, 2023</h2>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-[250px_1fr] border-b">
              <div className="relative h-48 md:h-full">
                <Image src="/images/Day2.jpg" alt="Eiffel Tower" fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">Eiffel Tower & Seine River Cruise</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>7th Arrondissement, Paris</span>
                    </div>
                  </div>
                  <Badge>Activity</Badge>
                </div>
                <p className="text-muted-foreground mb-4">
                  Visit the iconic Eiffel Tower with skip-the-line tickets to the summit for panoramic views of Paris.
                  In the evening, enjoy a romantic Seine River dinner cruise to see the city's illuminated landmarks.
                </p>
                <div className="text-sm">
                  <p>
                    <strong>Eiffel Tower:</strong> 10:00 AM (2-hour visit)
                  </p>
                  <p>
                    <strong>Seine Cruise:</strong> 7:00 PM (2.5 hours)
                  </p>
                  <p>
                    <strong>Tickets:</strong> Included
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
