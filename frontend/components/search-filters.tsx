"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SearchFilters() {
  const [priceRange, setPriceRange] = useState([200, 1000])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <Accordion type="multiple" defaultValue={["price", "stops", "airlines", "times"]}>
            <AccordionItem value="price">
              <AccordionTrigger>Price</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[20000, 200000]}
                    min={0}
                    max={200000}
                    step={1000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">₹{priceRange[0]}</span>
                    <span className="text-sm">₹{priceRange[1]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="stops">
              <AccordionTrigger>Stops</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="nonstop" />
                    <Label htmlFor="nonstop">Nonstop</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="1stop" />
                    <Label htmlFor="1stop">1 Stop</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="2stops" />
                    <Label htmlFor="2stops">2+ Stops</Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="airlines">
              <AccordionTrigger>Airlines</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="airline1" />
                    <Label htmlFor="airline1">Air France</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="airline2" />
                    <Label htmlFor="airline2">British Airways</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="airline3" />
                    <Label htmlFor="airline3">Lufthansa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="airline4" />
                    <Label htmlFor="airline4">Delta</Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="times">
              <AccordionTrigger>Times</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Departure</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="justify-start">
                        Morning
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        Afternoon
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        Evening
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        Night
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Return</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="justify-start">
                        Morning
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        Afternoon
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        Evening
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        Night
                      </Button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="flexible-dates">Flexible dates</Label>
              <Switch id="flexible-dates" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="include-nearby">Include nearby airports</Label>
              <Switch id="include-nearby" />
            </div>
          </div>
          <Button className="w-full mt-6">Apply Filters</Button>
        </CardContent>
      </Card>
    </div>
  )
}
