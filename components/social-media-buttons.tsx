"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { TOKEN_CONFIG } from "./token-config"

export function SocialMediaButtons() {
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-transparent hover:bg-pink-600/10 border-pink-600/30 text-pink-600 hover:text-pink-500"
        onClick={() => window.open(TOKEN_CONFIG.socialMedia.instagram, "_blank")}
      >
        <Instagram className="h-4 w-4" />
        <span className="sr-only">Instagram</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-transparent hover:bg-blue-600/10 border-blue-600/30 text-blue-600 hover:text-blue-500"
        onClick={() => window.open(TOKEN_CONFIG.socialMedia.facebook, "_blank")}
      >
        <Facebook className="h-4 w-4" />
        <span className="sr-only">Facebook</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-transparent hover:bg-red-600/10 border-red-600/30 text-red-600 hover:text-red-500"
        onClick={() => window.open(TOKEN_CONFIG.socialMedia.youtube, "_blank")}
      >
        <Youtube className="h-4 w-4" />
        <span className="sr-only">YouTube</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-transparent hover:bg-sky-500/10 border-sky-500/30 text-sky-500 hover:text-sky-400"
        onClick={() => window.open(TOKEN_CONFIG.socialMedia.twitter, "_blank")}
      >
        <Twitter className="h-4 w-4" />
        <span className="sr-only">Twitter</span>
      </Button>
    </div>
  )
}

