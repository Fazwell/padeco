// models/member.ts
import mongoose, { Schema, Document, Model } from "mongoose"

// Remove the interface extension — use mongoose's own types
export type MemberStatus =
  | "probation"
  | "permanent"
  | "contract"
  | "intern"
  | "suspended"

export type EmploymentType = "full-time" | "part-time" | "contract" | "intern"

// This is the correct way — no "extends Document" conflict
export interface IMember {
  firstName: string
  lastName: string
  jobTitle: string
  email: string
  phone?: string
  location?: string
  bio?: string
  image?: string
  employmentStatus: MemberStatus
  yearsExperience: string
  employmentType: EmploymentType
  company: string
  createdAt?: Date
  updatedAt?: Date
}

// Schema stays the same
const memberSchema = new Schema<IMember>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    location: { type: String },
    bio: { type: String },
    image: { type: String },
    employmentStatus: {
      type: String,
      enum: ["probation", "permanent", "contract", "intern", "suspended"],
      default: "permanent",
    },
    yearsExperience: { type: String, default: "0" },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "intern"],
      default: "full-time",
    },
    company: { type: String, default: "PADECO" },
  },
  { timestamps: true }
)

// Export the model
const Member: Model<IMember> =
  mongoose.models.Member || mongoose.model<IMember>("Member", memberSchema)

export default Member