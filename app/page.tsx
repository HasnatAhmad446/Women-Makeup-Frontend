import Link from "next/link"
import { LollipopIcon as Lipstick } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9F7F3]">
      <header className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Lipstick className="h-6 w-6 text-[#8B5D76]" />
          <span className="text-xl font-semibold text-[#333333]">Glow & Grace</span>
        </Link>
        <nav className="ml-auto flex gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-[#333333] hover:text-[#8B5D76] hover:bg-[#F7D1CD]/20">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90">Sign Up</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-[#333333] sm:text-4xl md:text-5xl">
                  Discover Your Natural Beauty
                </h1>
                <p className="mx-auto max-w-[700px] text-[#757575] md:text-xl">
                  Join our community of beauty enthusiasts and unlock exclusive offers.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup">
                  <Button className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90">Create an Account</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="border-[#A3B18A] text-[#333333] hover:bg-[#A3B18A]/10">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
