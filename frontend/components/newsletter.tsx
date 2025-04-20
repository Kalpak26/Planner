"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Plane } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section className="py-12">
      <Card className="border-none bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-xl">
        <CardContent className="p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Get Travel Inspiration</h2>
              <p className="mb-6 text-rose-100">
                Subscribe to our newsletter and receive exclusive deals, travel guides, and expert tips directly to your
                inbox.
              </p>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus-visible:ring-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="bg-white text-rose-600 hover:bg-rose-100">
                    Subscribe
                  </Button>
                </form>
              ) : (
                <div className="flex items-center gap-2 text-white">
                  <Check className="h-5 w-5" />
                  <span>Thank you for subscribing! Check your inbox soon.</span>
                </div>
              )}
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                <Plane className="h-24 w-24 text-white" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
