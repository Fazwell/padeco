// app/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  HandshakeIcon,
  Briefcase,
  FileText,
  MessageSquare,
  DollarSign,
  Building2,
  CreditCard,
  TrendingUp,
} from "lucide-react"

export const metadata = {
  title: "Overview • Dashboard",
}

const stats = [
  {
    title: "Total Members",
    value: "3,429",
    change: "+12.4% this month",
    icon: Users,
    color: "text-blue-600 bg-blue-600/10",
  },
  {
    title: "Business Partners",
    value: "68",
    change: "+5 new partners",
    icon: HandshakeIcon,
    color: "text-purple-600 bg-purple-600/10",
  },
  {
    title: "Services Listed",
    value: "142",
    change: "+18 this week",
    icon: Briefcase,
    color: "text-emerald-600 bg-emerald-600/10",
  },
  {
    title: "Jobs Listed",
    value: "89",
    change: "+23 active",
    icon: Building2,
    color: "text-indigo-600 bg-indigo-600/10",
  },
  {
    title: "Applications Received",
    value: "317",
    change: "+84 today",
    icon: FileText,
    color: "text-orange-600 bg-orange-600/10",
  },
  {
    title: "Feedbacks & Reviews",
    value: "892",
    change: "4.8 average rating",
    icon: MessageSquare,
    color: "text-pink-600 bg-pink-600/10",
  },
  {
    title: "Payments Received",
    value: "MWK 5,120,000",
    change: "+22.1% this month",
    icon: CreditCard,
    color: "text-green-600 bg-green-600/10",
  },
  {
    title: "Platform Revenue",
    value: "MWK 1,280,000",
    change: "+31% vs last month",
    icon: DollarSign,
    color: "text-amber-600 bg-amber-600/10",
  },
]

export default function DashboardOverview() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Real-time insights into your platform’s performance and growth.
        </p>
      </div>

      {/* 8 Stat Cards – 4 per row on large screens */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Colored accent bar on left */}
            <div className={`absolute left-0 top-0 h-full w-1.5 ${stat.color.split(" ")[1].replace("bg-", "bg-")}`} />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color.split(" ")[1]}`}>
                <stat.icon className={`h-5 w-5 ${stat.color.split(" ")[0]}`} />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="font-medium text-emerald-600">{stat.change}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Section – Activity + Growth */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "New job posted: Senior Developer at TechHub",
              "Payment received: MWK 49,000 from Sarah K.",
              "New member: James Banda joined as freelancer",
              "5-star review received for Mzuni Digital",
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b last:border-0">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-sm">{activity}</p>
                <span className="ml-auto text-xs text-muted-foreground">
                  {i === 0 ? "Just now" : `${i * 15 + 10} mins ago`}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Growth</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-52">
            <TrendingUp className="h-16 w-16 text-green-600 mb-4" />
            <p className="text-4xl font-bold">+28.7%</p>
            <p className="text-sm text-muted-foreground mt-2">Overall growth</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}