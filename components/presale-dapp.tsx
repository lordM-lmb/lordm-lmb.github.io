"use client"

import { useState } from "react"
import { ConnectWallet } from "./connect-wallet"
import { LanguageSwitcher } from "./language-switcher"
import { StageIndicator } from "./stage-indicator"
import { BuyForm } from "./buy-form"
import { TransactionHistory } from "./transaction-history"
import { PresaleProgress } from "./presale-progress"
import { AdminPanel } from "./admin-panel"
import { SocialMediaButtons } from "./social-media-buttons"
import { TOKEN_CONFIG } from "./token-config"
import { ethers } from "ethers"
import Image from "next/image"

export default function PresaleDapp() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState("")
  const [language, setLanguage] = useState("es")

  // Manejar cambio de idioma
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
  }

  // Manejar conexión de wallet
  const handleConnect = async () => {
    try {
      // En una implementación real, esto conectaría con MetaMask u otro wallet
      if (typeof window !== "undefined" && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const signer = await provider.getSigner()
        const connectedAddress = await signer.getAddress()

        setAddress(connectedAddress)
        setIsConnected(true)
      } else {
        alert("Por favor instala MetaMask u otro wallet compatible")
      }
    } catch (error) {
      console.error("Error al conectar wallet:", error)
    }
  }

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="relative h-12 w-12 mr-3">
              <Image src="/logo-lmb.png" alt="LORD M Logo" fill className="object-contain" />
            </div>
            <h1 className="text-3xl font-bold">Preventa de {TOKEN_CONFIG.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher onLanguageChange={handleLanguageChange} />
            <ConnectWallet isConnected={isConnected} address={address} isLoading={false} onConnect={handleConnect} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-slate-300">Participa en nuestra preventa de tokens {TOKEN_CONFIG.symbol}</p>
          <SocialMediaButtons />
        </div>
      </div>

      {/* Progreso general de la preventa */}
      <div className="mb-6">
        <PresaleProgress />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Formulario de compra */}
          <BuyForm address={address} isConnected={isConnected} />

          {/* Historial de transacciones (solo visible si está conectado) */}
          {isConnected && <TransactionHistory tokenSymbol={TOKEN_CONFIG.symbol} />}
        </div>

        <div className="space-y-6">
          {/* Indicador de etapa actual */}
          <StageIndicator />

          {/* Panel de administración (solo visible para el propietario) */}
          <AdminPanel address={address} isConnected={isConnected} />

          {/* Información sobre el token y la preventa */}
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <h3 className="mb-3 font-medium">Información de la Preventa</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Token:</span>
                <span>{TOKEN_CONFIG.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Método de pago:</span>
                <span>USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contribución mínima:</span>
                <span>{TOKEN_CONFIG.presale.minContribution} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contribución máxima:</span>
                <span>{TOKEN_CONFIG.presale.maxContribution} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tarifa de marketing:</span>
                <span>{TOKEN_CONFIG.presale.marketingFee}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total de etapas:</span>
                <span>{TOKEN_CONFIG.presale.totalStages}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total de tokens:</span>
                <span>
                  {TOKEN_CONFIG.presale.totalTokens.toLocaleString()} {TOKEN_CONFIG.symbol}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

