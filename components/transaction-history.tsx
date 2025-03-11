"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownToLine, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock transaction data - would come from blockchain in real app
const mockTransactions = [
  {
    id: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    amount: "0.5",
    tokens: "5000",
    status: "confirmed",
  },
  {
    id: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    amount: "1.2",
    tokens: "12000",
    status: "confirmed",
  },
]

interface TransactionHistoryProps {
  tokenSymbol: string
}

export function TransactionHistory({ tokenSymbol }: TransactionHistoryProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Transacciones</CardTitle>
      </CardHeader>
      <CardContent>
        {mockTransactions.length > 0 ? (
          <div className="space-y-4">
            {mockTransactions.map((tx) => (
              <div key={tx.id} className="rounded-lg border border-slate-700 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-500/20 p-1">
                      <ArrowDownToLine className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Compra de {tokenSymbol}</p>
                      <p className="text-xs text-slate-400">{formatDate(tx.date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {tx.tokens} {tokenSymbol}
                    </p>
                    <p className="text-xs text-slate-400">{tx.amount} ETH</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-400">TX: {shortenAddress(tx.id)}</span>
                  <Button variant="ghost" size="sm" className="h-6 gap-1 px-2 text-xs text-slate-400">
                    Ver <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-sm text-slate-400">No hay transacciones para mostrar</div>
        )}
      </CardContent>
    </Card>
  )
}

