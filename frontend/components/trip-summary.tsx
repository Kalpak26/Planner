import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function TripSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Destination</h3>
          <p>Paris, France</p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Travel Dates</h3>
          <p>June 15 - June 22, 2023</p>
          <p className="text-sm text-muted-foreground">7 nights</p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Travelers</h3>
          <p>2 Adults</p>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-2">Price Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Flights (2 adults)</span>
              <span>₹1,00,000</span>
            </div>
            <div className="flex justify-between">
              <span>Hotel (7 nights)</span>
              <span>₹1,50,000</span>
            </div>
            <div className="flex justify-between">
              <span>Activities</span>
              <span>₹30,000</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Fees</span>
              <span>₹20,000</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹3,00,00</span>
        </div>

        <p className="text-sm text-muted-foreground">Price shown is the total trip price for 2 adults</p>
      </CardContent>
    </Card>
  )
}
