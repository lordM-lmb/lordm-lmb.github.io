"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getWalletAddresses, getPresaleContract } from "@/lib/blockchain"

interface AdminPanelProps {
  address: string
  isConnected: boolean
}

export function AdminPanel({ address, isConnected }: AdminPanelProps) {
  const [wallets, setWallets] = useState<any>({})
  const [isOwner, setIsOwner] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [withdrawSuccess, setWithdrawSuccess] = useState(false)

  useEffect(() => {
    if (isConnected && address) {
      const loadData = async () => {
        try {
          const walletAddresses = await getWalletAddresses()
          setWallets(walletAddresses)

          // Comprobar si la dirección conectada es el propietario
          const contract = await getPresaleContract()
          const owner = await contract.owner()
          setIsOwner(owner.toLowerCase() === address.toLowerCase())
        } catch (error) {
          console.error("Error al cargar datos de administrador:", error)
        }
      }

      loadData()
    }
  }, [isConnected, address])

  // Función para retirar fondos (solo para el propietario)
  const handleWithdrawFunds = async () => {
    if (!isOwner) return

    setIsLoading(true)
    setWithdrawSuccess(false)

    try {
      const contract = await getPresaleContract(true)
      const tx = await contract.withdrawFunds()
      await tx.wait()
      setWithdrawSuccess(true)
    } catch (error) {
      console.error("Error al retirar fondos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Función para formatear direcciones
  const formatAddress = (address: string) => {
    if (!address) return "No disponible"
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  if (!isConnected || !isOwner) {
    return null // No mostrar el panel si no es el propietario
  }

  return (
    <Card className="border-amber-500/20 bg-amber-500/5">
      <CardHeader>
        <CardTitle>Panel de Administración</CardTitle>
        <CardDescription>Gestiona la preventa de tokens LMB</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 font-medium">Direcciones de Wallets</h3>
            <div className="rounded-md bg-slate-800 p-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Wallet de Preventa:</span>
                <span>{formatAddress(wallets.preSaleWallet)}</span>
              </div>
              <Separator className="bg-slate-700" />
              <div className="flex justify-between">
                <span className="text-slate-400">Wallet de Marketing:</span>
                <span>{formatAddress(wallets.marketingWallet)}</span>
              </div>
              <Separator className="bg-slate-700" />
              <div className="flex justify-between">
                <span className="text-slate-400">Wallet de Recompensas:</span>
                <span>{formatAddress(wallets.rewardsWallet)}</span>
              </div>
              <Separator className="bg-slate-700" />
              <div className="flex justify-between">
                <span className="text-slate-400">Wallet de CEO:</span>
                <span>{formatAddress(wallets.ceoWallet)}</span>
              </div>
              <Separator className="bg-slate-700" />
              <div className="flex justify-between">
                <span className="text-slate-400">Wallet de Propietario:</span>
                <span>{formatAddress(wallets.ownerWallet)}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-medium">Acciones de Administrador</h3>
            <div className="rounded-md bg-slate-800 p-3">
              <Button variant="destructive" className="w-full" onClick={handleWithdrawFunds} disabled={isLoading}>
                {isLoading ? "Procesando..." : "Retirar Fondos"}
              </Button>

              {withdrawSuccess && (
                <p className="mt-2 text-center text-sm text-green-500">Fondos retirados exitosamente</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

