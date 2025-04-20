import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CommunityPosts } from "@/components/community-posts"
import { CommunityReviews } from "@/components/community-reviews"
import { Breadcrumb } from "@/components/breadcrumb"

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />
        <h1 className="text-3xl font-bold mb-6">Community</h1>

        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          <div>
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
                <TabsTrigger value="posts">Community Posts</TabsTrigger>
                <TabsTrigger value="reviews">Traveler Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Latest Posts</h2>
                  <Button className="bg-rose-500 hover:bg-rose-600">Create Post</Button>
                </div>
                <CommunityPosts />
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Traveler Reviews</h2>
                  <Button className="bg-rose-500 hover:bg-rose-600">Write a Review</Button>
                </div>
                <CommunityReviews />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Input placeholder="Search posts and reviews..." className="pr-10" />
                  <Button className="absolute right-1 top-1 h-8 w-8 p-0" variant="ghost">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    Europe
                  </Button>
                  <Button variant="outline" size="sm">
                    Solo Travel
                  </Button>
                  <Button variant="outline" size="sm">
                    Budget
                  </Button>
                  <Button variant="outline" size="sm">
                    Food
                  </Button>
                  <Button variant="outline" size="sm">
                    Adventure
                  </Button>
                  <Button variant="outline" size="sm">
                    City Guide
                  </Button>
                  <Button variant="outline" size="sm">
                    Asia
                  </Button>
                  <Button variant="outline" size="sm">
                    Tips
                  </Button>
                  <Button variant="outline" size="sm">
                    Photography
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img src="/placeholder.svg?height=40&width=40" alt="User avatar" />
                  </div>
                  <div>
                    <p className="font-medium">Emma Wilson</p>
                    <p className="text-sm text-muted-foreground">42 posts</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img src="/placeholder.svg?height=40&width=40" alt="User avatar" />
                  </div>
                  <div>
                    <p className="font-medium">Carlos Rodriguez</p>
                    <p className="text-sm text-muted-foreground">38 posts</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img src="/placeholder.svg?height=40&width=40" alt="User avatar" />
                  </div>
                  <div>
                    <p className="font-medium">Aisha Johnson</p>
                    <p className="text-sm text-muted-foreground">29 posts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
