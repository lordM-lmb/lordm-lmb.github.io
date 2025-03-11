"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TOKEN_CONFIG } from "./token-config"
import { approveUsdtSpending, buyTokens, getCurrentStage, getUsdtBalance, getUserContribution } from "@/lib/blockchain"

interface BuyFormProps {
  address: string
  isConnected: boolean
}

export function BuyForm({ address, isConnected }: BuyFormProps) {
  const [amount, setAmount] = useState("")
  const [tokenAmount, setTokenAmount] = useState("0")
  const [usdtBalance, setUsdtBalance] = useState("0")
  const [userContribution, setUserContribution] = useState("0")
  const [currentStage, setCurrentStage] = useState({ price: 0.2 })
  const [isLoading, setIsLoading] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Cargar datos cuando el usuario está conectado
  useEffect(() => {
    if (isConnected && address) {
      const loadData = async () => {
        try {
          const [balance, contribution, stage] = await Promise.all([
            getUsdtBalance(address),
            getUserContribution(address),
            getCurrentStage(),
          ])

          setUsdtBalance(balance)
          setUserContribution(contribution)
          setCurrentStage({ price: stage.price })
        } catch (error) {
          console.error("Error al cargar datos del usuario:", error)
        }
      }

      loadData()
    }
  }, [isConnected, address])

  // Calcular cantidad de tokens basado en USDT
  useEffect(() => {
    if (amount && !isNaN(Number(amount))) {
      const tokens = (Number(amount) * 100) / (currentStage.price * 100)
      setTokenAmount(tokens.toLocaleString(undefined, { maximumFractionDigits: 2 }))
    } else {
      setTokenAmount("0")
    }
  }, [amount, currentStage.price])

  // Manejar la compra de tokens
  const handleBuy = async () => {
    if (!amount || isNaN(Number(amount))) return

    setError("")
    setSuccess("")

    const amountNum = Number(amount)
    if (amountNum < TOKEN_CONFIG.presale.minContribution) {
      setError(`La contribución mínima es ${TOKEN_CONFIG.presale.minContribution} USDT`)
      return
    }

    if (amountNum > TOKEN_CONFIG.presale.maxContribution) {
      setError(`La contribución máxima es ${TOKEN_CONFIG.presale.maxContribution} USDT`)
      return
    }

    const remainingAllowance = TOKEN_CONFIG.presale.maxContribution - Number(userContribution)
    if (amountNum > remainingAllowance) {
      setError(`Solo puedes contribuir ${remainingAllowance} USDT más en total`)
      return
    }

    try {
      // Primero aprobar el gasto de USDT
      setIsApproving(true)
      await approveUsdtSpending(amount)
      setIsApproving(false)

      // Luego comprar los tokens
      setIsLoading(true)
      await buyTokens(amount)

      setSuccess(`¡Compra exitosa! Has adquirido ${tokenAmount} tokens ${TOKEN_CONFIG.symbol}`)
      setAmount("")

      // Actualizar balances y contribución
      const [newBalance, newContribution] = await Promise.all([getUsdtBalance(address), getUserContribution(address)])

      setUsdtBalance(newBalance)
      setUserContribution(newContribution)
    } catch (error: any) {
      console.error("Error en la compra:", error)
      setError(error.message || "Error al procesar la compra")
    } finally {
      setIsLoading(false)
    }
  }

  // Calcular la tarifa de marketing (20%)
  const calculateMarketingFee = () => {
    if (!amount || isNaN(Number(amount))) return "0"
    return ((Number(amount) * TOKEN_CONFIG.presale.marketingFee) / 100).toFixed(2)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comprar Tokens {TOKEN_CONFIG.symbol}</CardTitle>
        <CardDescription>Adquiere tokens {TOKEN_CONFIG.symbol} con USDT</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-500/10 text-green-500">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium">Cantidad en USDT</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder={`Mín: ${TOKEN_CONFIG.presale.minContribution} USDT`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={!isConnected || isLoading || isApproving}
                min={TOKEN_CONFIG.presale.minContribution}
                max={TOKEN_CONFIG.presale.maxContribution}
                step="1"
              />
              <div className="rounded-md bg-slate-700 px-3 py-2 text-sm">USDT</div>
            </div>
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>Balance: {Number.parseFloat(usdtBalance).toFixed(2)} USDT</span>
              <span>
                Contribuido: {Number.parseFloat(userContribution).toFixed(2)} / {TOKEN_CONFIG.presale.maxContribution}{" "}
                USDT
              </span>
            </div>
          </div>

          <div className="rounded-lg bg-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Recibirás:</span>
              <span className="text-lg font-bold">
                {tokenAmount} {TOKEN_CONFIG.symbol}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Precio actual:</span>
              <span>{currentStage.price} USDT</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Tarifa de marketing (20%):</span>
              <span>{calculateMarketingFee()} USDT</span>
            </div>
            <div className="pt-2 text-xs text-amber-500/80">
              Nota: Se requiere aprobar el gasto de USDT antes de comprar tokens.
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button className="w-full" disabled={!isConnected || !amount || isLoading || isApproving} onClick={handleBuy}>
          {isApproving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Aprobando USDT...
            </>
          ) : isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Comprando tokens...
            </>
          ) : (
            `Comprar Tokens ${TOKEN_CONFIG.symbol}`
          )}
        </Button>
        <div className="text-center text-xs text-slate-500">
          Mín: {TOKEN_CONFIG.presale.minContribution} USDT | Máx: {TOKEN_CONFIG.presale.maxContribution} USDT por wallet
        </div>
      </CardFooter>
    </Card>
  )
}

