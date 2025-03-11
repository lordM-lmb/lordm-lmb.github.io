"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getTotalTokensSold } from "@/lib/blockchain"
import { TOKEN_CONFIG } from "./token-config"

export function PresaleProgress() {
  const [totalSold, setTotalSold] = useState("0")
  const [loading, setLoading] = useState(true)

  // Calcular el total de tokens disponibles en la preventa
  const totalPresaleTokens = TOKEN_CONFIG.presale.stages.reduce((total, stage) => total + stage.maxTokens, 0)

  useEffect(() => {
    const fetchTotalSold = async () => {
      try {
        const sold = await getTotalTokensSold()
        setTotalSold(sold)
      } catch (error) {
        console.error("Error al obtener tokens vendidos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTotalSold()
    const interval = setInterval(fetchTotalSold, 60000) // Actualizar cada minuto

    return () => clearInterval(interval)
  }, [])

  // Calcular el progreso general de la preventa
  const overallProgress = loading ? 0 : (Number.parseFloat(totalSold) / totalPresaleTokens) * 100

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Progreso de la Preventa</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>Tokens vendidos</span>
              <span>{overallProgress.toFixed(1)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>
                {loading ? "Cargando..." : `${Number.parseFloat(totalSold).toLocaleString()} ${TOKEN_CONFIG.symbol}`}
              </span>
              <span>
                {totalPresaleTokens.toLocaleString()} ${TOKEN_CONFIG.symbol}
              </span>
            </div>
          </div>

          <div className="rounded-md bg-slate-800 p-3 text-sm">
            <p className="text-center">La preventa continuará hasta que se vendan todos los tokens</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

