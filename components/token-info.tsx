import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface TokenInfoProps {
  presaleData: {
    tokenName: string
    tokenSymbol: string
    tokenDecimals: number
    tokenPrice: number
  }
}

export function TokenInfo({ presaleData }: TokenInfoProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Información del Token</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">Nombre</span>
            <span className="font-medium">{presaleData.tokenName}</span>
          </div>
          <Separator className="bg-slate-700" />
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">Símbolo</span>
            <span className="font-medium">{presaleData.tokenSymbol}</span>
          </div>
          <Separator className="bg-slate-700" />
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">Decimales</span>
            <span className="font-medium">{presaleData.tokenDecimals}</span>
          </div>
          <Separator className="bg-slate-700" />
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">Precio</span>
            <span className="font-medium">{presaleData.tokenPrice} ETH</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

