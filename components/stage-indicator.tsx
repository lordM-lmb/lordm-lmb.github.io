"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TOKEN_CONFIG } from "./token-config"
import { getCurrentStage } from "@/lib/blockchain"

export function StageIndicator() {
  const [currentStage, setCurrentStage] = useState({
    stageIndex: 0,
    price: TOKEN_CONFIG.presale.stages[0].price,
    maxTokens: "0",
    soldTokens: "0",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStageData = async () => {
      try {
        const stageData = await getCurrentStage()
        setCurrentStage(stageData)
      } catch (error) {
        console.error("Error al cargar datos de etapa:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStageData()
    const interval = setInterval(fetchStageData, 30000) // Actualizar cada 30 segundos

    return () => clearInterval(interval)
  }, [])

  // Calcular el progreso de la etapa actual
  const stageProgress = loading
    ? 0
    : (Number.parseFloat(currentStage.soldTokens) / Number.parseFloat(currentStage.maxTokens)) * 100

  // Obtener la siguiente etapa si existe
  const nextStage = currentStage.stageIndex < 7 ? TOKEN_CONFIG.presale.stages[currentStage.stageIndex + 1] : null

  return (
    <Card className="border-amber-500/20 bg-amber-500/5">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Etapa {currentStage.stageIndex + 1} de 8</span>
          <span className="text-amber-500">{currentStage.price} USDT</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>Progreso de la etapa</span>
              <span>{stageProgress.toFixed(1)}%</span>
            </div>
            <Progress value={stageProgress} className="h-2" />
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>
                {loading
                  ? "Cargando..."
                  : `${Number.parseFloat(currentStage.soldTokens).toLocaleString()} ${TOKEN_CONFIG.symbol}`}
              </span>
              <span>
                {loading ? "" : `${Number.parseFloat(currentStage.maxTokens).toLocaleString()} ${TOKEN_CONFIG.symbol}`}
              </span>
            </div>
          </div>

          {nextStage && (
            <div className="rounded-md bg-slate-800 p-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Próxima etapa:</span>
                <span className="font-medium">{nextStage.price} USDT</span>
              </div>
              <div className="mt-1 text-xs text-slate-500">
                El precio aumentará cuando se vendan todos los tokens de la etapa actual
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

