"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Plane, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Plane className="h-6 w-6 text-rose-500" />
          <span className="font-bold text-xl">WanderLust</span>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Destinations</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                  <Link
                    href="/destinations"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Explore All Destinations</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Discover amazing places around the world
                    </p>
                  </Link>
                  <Link
                    href="/destinations?continent=europe"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Europe</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Explore the historic cities and beautiful landscapes of Europe
                    </p>
                  </Link>
                  <Link
                    href="#"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Beach Getaways</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Relax on pristine beaches and enjoy crystal clear waters
                    </p>
                  </Link>
                  <Link
                    href="#"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">City Breaks</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Explore vibrant cities with rich culture and history
                    </p>
                  </Link>
                  <Link
                    href="#"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Adventure Travel</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Embark on thrilling adventures in the world's most exciting destinations
                    </p>
                  </Link>
                  <Link
                    href="#"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Luxury Travel</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Indulge in premium experiences with top-tier accommodations and services
                    </p>
                  </Link>
                  
                  {/* More destination links */}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/results" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Flights
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/community" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Community
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center ml-auto gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{user?.username || 'Account'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/user/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user/trips">My Trips</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user/bookings">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login" className="hidden md:block">
                <Button variant="ghost" size="sm" className="hover:bg-transparent hover:text-rose-500">
                  Log in
                </Button>
              </Link>
              <Link href="/signup" className="hidden md:block">
                <Button size="sm" className="bg-rose-500 hover:bg-rose-600 text-white">
                  Sign up
                </Button>
              </Link>
            </>
          )}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <Link href="/destinations" onClick={() => setIsOpen(false)}>
                  Destinations
                </Link>
                <Link href="/results" onClick={() => setIsOpen(false)}>
                  Flights
                </Link>
                <Link href="/community" onClick={() => setIsOpen(false)}>
                  Community
                </Link>
                
                {isAuthenticated ? (
                  <>
                    <Link href="/user/profile" onClick={() => setIsOpen(false)}>
                      My Profile
                    </Link>
                    <Link href="/user/trips" onClick={() => setIsOpen(false)}>
                      My Trips
                    </Link>
                    <Link href="#" onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}>
                      Log out
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      Log in
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-rose-500 hover:bg-rose-600">Sign up</Button>
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}