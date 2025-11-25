// app/dashboard/members/create/page.tsx
"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  MapPin,
  Upload,
  Loader2,
} from "lucide-react"
import Link from "next/link"

const selectBgClass = "bg-card/95 border border-input/70 hover:bg-accent/40 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-colors"

export default function CreateMemberProfilePage() {
  const [preview, setPreview] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch("/api/members", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || "Failed to create member")

      toast.success("Member created!", {
        description: `${formData.get("firstName")} ${formData.get("lastName")} has been added to PADECO.`,
      })

      e.currentTarget.reset()
      setPreview("")
    } catch (err: any) {
      toast.error("Failed to create member", {
        description: err.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="mb-8 sm:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <Link href="/dashboard/members">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Create Member Profile
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Add a new employee or team member to PADECO
              </p>
            </div>
          </div>
          <Badge variant="outline" className="self-start sm:self-center py-1.5 px-3">
            Admin Only
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Profile Photo</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-28 h-28 ring-4 ring-background">
                  <AvatarImage src={preview} alt="Preview" />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    ?
                  </AvatarFallback>
                </Avatar>
                <label htmlFor="image" className="absolute inset-0 cursor-pointer rounded-full" />
              </div>

              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) setPreview(URL.createObjectURL(file))
                }}
              />

              <Button variant="outline" size="sm" className="w-full" asChild>
                <label htmlFor="image" className="cursor-pointer">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </label>
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                JPG, PNG or GIF • Max 5MB
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Employment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Select name="employmentStatus" defaultValue="permanent">
                <SelectTrigger className={selectBgClass}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="probation">Probation</SelectItem>
                  <SelectItem value="permanent">Permanent</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="intern">Intern</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Required fields are marked with *</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input name="firstName" id="firstName" placeholder="e.g. Linda" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input name="lastName" id="lastName" placeholder="e.g. Chizimu" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input name="jobTitle" id="jobTitle" placeholder="e.g. Senior Frontend Developer" required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input name="email" id="email" type="email" placeholder="name@padeco.mw" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input name="phone" id="phone" placeholder="+265 999 123 456" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input name="location" id="location" className="pl-10" placeholder="e.g. Lilongwe, Malawi" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea name="bio" id="bio" placeholder="Brief description..." className="min-h-32 resize-none" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company & Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Company</Label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 bg-primary/10 px-4 py-3 rounded-lg">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span className="font-semibold">PADECO</span>
                  </div>
                  <Badge variant="secondary">Default</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Years of Experience</Label>
                  <Select name="yearsExperience" defaultValue="3">
                    <SelectTrigger className={selectBgClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(11)].map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i === 0 ? "< 1 year" : i === 10 ? "10+ years" : `${i} year${i > 1 ? "s" : ""}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Employment Type</Label>
                  <Select name="employmentType" defaultValue="full-time">
                    <SelectTrigger className={selectBgClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="intern">Intern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pt-6">
            <Button variant="outline" asChild>
              <Link href="/dashboard/members">Cancel</Link>
            </Button>
            <Button type="submit" size="lg" disabled={isLoading} className="px-8">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Create Member
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}