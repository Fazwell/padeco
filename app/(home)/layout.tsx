// app/(home)/layout.tsx
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import ChatWidget from "@/components/bot/chatWidget"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      {/* Main content – perfectly centered, consistent padding */}
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20 py-12 md:py-16">
          {children}
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  )
}