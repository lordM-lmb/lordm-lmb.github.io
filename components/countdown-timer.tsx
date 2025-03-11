"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  endTime: Date
}

export function CountdownTimer({ endTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <Card className="border-amber-500/20 bg-amber-500/5">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-amber-500">
          <Clock className="mr-2 h-5 w-5" />
          Tiempo restante
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{timeLeft.days}</span>
            <span className="text-xs text-slate-400">Días</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{timeLeft.hours}</span>
            <span className="text-xs text-slate-400">Horas</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{timeLeft.minutes}</span>
            <span className="text-xs text-slate-400">Minutos</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{timeLeft.seconds}</span>
            <span className="text-xs text-slate-400">Segundos</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

