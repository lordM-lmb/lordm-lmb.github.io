import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

interface PresaleStatsProps {
  presaleData: {
    raised: number
    hardCap: number
    softCap: number
    startTime: Date
    endTime: Date
  }
  progressPercentage: number
}

export function PresaleStats({ presaleData, progressPercentage }: PresaleStatsProps) {
  // Format dates
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  // Calculate days remaining
  const daysRemaining = Math.ceil((presaleData.endTime.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Estado de la Preventa</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>Progreso</span>
              <span>{progressPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>{presaleData.raised} ETH</span>
              <span>{presaleData.hardCap} ETH</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-slate-400">Soft Cap</span>
              <span className="font-medium">{presaleData.softCap} ETH</span>
            </div>
            <Separator className="bg-slate-700" />
            <div className="flex justify-between">
              <span className="text-sm text-slate-400">Hard Cap</span>
              <span className="font-medium">{presaleData.hardCap} ETH</span>
            </div>
            <Separator className="bg-slate-700" />
            <div className="flex justify-between">
              <span className="text-sm text-slate-400">Fecha de Inicio</span>
              <span className="font-medium">{formatDate(presaleData.startTime)}</span>
            </div>
            <Separator className="bg-slate-700" />
            <div className="flex justify-between">
              <span className="text-sm text-slate-400">Fecha de Fin</span>
              <span className="font-medium">{formatDate(presaleData.endTime)}</span>
            </div>
            <Separator className="bg-slate-700" />
            <div className="flex justify-between">
              <span className="text-sm text-slate-400">Tiempo Restante</span>
              <span className="font-medium">{daysRemaining} días</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

