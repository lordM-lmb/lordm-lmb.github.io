"use client"

import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ConnectWalletProps {
  isConnected: boolean
  address: string
  isLoading: boolean
  onConnect: () => void
}

export function ConnectWallet({ isConnected, address, isLoading, onConnect }: ConnectWalletProps) {
  return (
    <Button
      variant={isConnected ? "outline" : "default"}
      onClick={onConnect}
      disabled={isLoading}
      className={isConnected ? "border-green-500 text-green-500 hover:bg-green-500/10" : ""}
    >
      <Wallet className="mr-2 h-4 w-4" />
      {isConnected ? address : "Connect Wallet"}
    </Button>
  )
}

