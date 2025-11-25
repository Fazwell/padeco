// app/api/members/route.ts
import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Member from "@/models/member"
import cloudinary from "@/lib/cloudinary"

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const formData = await req.formData()

    const getString = (key: string) => {
      const val = formData.get(key)
      return val instanceof File ? null : (val as string)?.trim() || null
    }

    const email = getString("email")
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check duplicate email
    const existingMember = await Member.findOne({ email })
    if (existingMember) {
      return NextResponse.json(
        { error: "A member with this email already exists" },
        { status: 409 }
      )
    }

    let imageUrl = ""
    const file = formData.get("image") as File | null

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "padeco/members" },
          (error, result) => (error ? reject(error) : resolve(result))
        ).end(buffer)
      })
      imageUrl = (result as any).secure_url
    }

    // FIXED: Use new Member() + save() → perfect TypeScript + works 100%
    const memberDoc = new Member({
      firstName: getString("firstName"),
      lastName: getString("lastName"),
      jobTitle: getString("jobTitle"),
      email,
      phone: getString("phone") || undefined,
      location: getString("location") || undefined,
      bio: getString("bio") || undefined,
      image: imageUrl || undefined,
      employmentStatus: getString("employmentStatus") || "permanent",
      yearsExperience: getString("yearsExperience") || "0",
      employmentType: getString("employmentType") || "full-time",
    })

    const member = await memberDoc.save()

    return NextResponse.json({ success: true, member }, { status: 201 })
  } catch (error: any) {
    console.error("Create member error:", error)

    if (error.code === 11000) {
      return NextResponse.json(
        { error: "A member with this email already exists" },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: "Failed to create member", details: error.message },
      { status: 500 }
    )
  }
}