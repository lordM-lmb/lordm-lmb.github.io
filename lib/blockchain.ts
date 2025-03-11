import { ethers } from "ethers"
import { TOKEN_CONFIG } from "@/components/token-config"

// Función para conectar con el proveedor de Web3
export async function getProvider() {
  // Comprobar si window.ethereum está disponible (MetaMask u otro wallet)
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum)
  }

  // Fallback a un proveedor RPC si no hay wallet
  return new ethers.JsonRpcProvider(TOKEN_CONFIG.network.rpcUrl)
}

// Función para conectar con el contrato de preventa
export async function getPresaleContract(withSigner = false) {
  const provider = await getProvider()

  if (withSigner) {
    const signer = await provider.getSigner()
    return new ethers.Contract(TOKEN_CONFIG.presaleAddress, TOKEN_CONFIG.presaleABI, signer)
  }

  return new ethers.Contract(TOKEN_CONFIG.presaleAddress, TOKEN_CONFIG.presaleABI, provider)
}

// Función para conectar con el contrato USDT
export async function getUsdtContract(withSigner = false) {
  const provider = await getProvider()

  if (withSigner) {
    const signer = await provider.getSigner()
    return new ethers.Contract(TOKEN_CONFIG.usdtAddress, TOKEN_CONFIG.erc20ABI, signer)
  }

  return new ethers.Contract(TOKEN_CONFIG.usdtAddress, TOKEN_CONFIG.erc20ABI, provider)
}

// Función para obtener el balance de USDT
export async function getUsdtBalance(address: string) {
  try {
    const contract = await getUsdtContract()
    const balance = await contract.balanceOf(address)
    return ethers.formatUnits(balance, 6) // USDT suele tener 6 decimales
  } catch (error) {
    console.error("Error al obtener balance de USDT:", error)
    return "0"
  }
}

// Función para obtener la contribución actual del usuario
export async function getUserContribution(address: string) {
  try {
    const contract = await getPresaleContract()
    const contribution = await contract.contributions(address)
    return ethers.formatUnits(contribution, 6) // USDT suele tener 6 decimales
  } catch (error) {
    console.error("Error al obtener contribución del usuario:", error)
    return "0"
  }
}

// Función para aprobar el gasto de USDT
export async function approveUsdtSpending(amount: string) {
  try {
    const amountInWei = ethers.parseUnits(amount, 6) // USDT suele tener 6 decimales
    const contract = await getUsdtContract(true)

    const tx = await contract.approve(TOKEN_CONFIG.presaleAddress, amountInWei)
    return await tx.wait()
  } catch (error) {
    console.error("Error al aprobar gasto de USDT:", error)
    throw error
  }
}

// Función para comprar tokens
export async function buyTokens(amount: string) {
  try {
    const amountInWei = ethers.parseUnits(amount, 6) // USDT suele tener 6 decimales
    const contract = await getPresaleContract(true)

    const tx = await contract.buyTokens(amountInWei)
    return await tx.wait()
  } catch (error) {
    console.error("Error al comprar tokens:", error)
    throw error
  }
}

// Función para obtener la etapa actual y su precio
export async function getCurrentStage() {
  try {
    const contract = await getPresaleContract()
    const currentStageIndex = await contract.currentStage()
    const stageData = await contract.stages(currentStageIndex)

    return {
      stageIndex: Number(currentStageIndex),
      price: Number(ethers.formatUnits(stageData.price, 0)) / 100, // Convertir a formato decimal
      maxTokens: ethers.formatEther(stageData.maxTokens),
      soldTokens: ethers.formatEther(stageData.soldTokens),
    }
  } catch (error) {
    console.error("Error al obtener etapa actual:", error)
    return {
      stageIndex: 0,
      price: TOKEN_CONFIG.presale.stages[0].price,
      maxTokens: "0",
      soldTokens: "0",
    }
  }
}

// Función para obtener el total de tokens vendidos
export async function getTotalTokensSold() {
  try {
    const contract = await getPresaleContract()
    const totalSold = await contract.totalTokensSold()
    return ethers.formatEther(totalSold)
  } catch (error) {
    console.error("Error al obtener total de tokens vendidos:", error)
    return "0"
  }
}

// Función para obtener información de todas las wallets
export async function getWalletAddresses() {
  try {
    const contract = await getPresaleContract()

    const [preSaleWallet, marketReleaseWallet, rewardsWallet, marketingWallet, ceoWallet, ownerWallet] =
      await Promise.all([
        contract.preSaleWallet(),
        contract.marketReleaseWallet(),
        contract.rewardsWallet(),
        contract.marketingWallet(),
        contract.ceoWallet(),
        contract.ownerWallet(),
      ])

    return {
      preSaleWallet,
      marketReleaseWallet,
      rewardsWallet,
      marketingWallet,
      ceoWallet,
      ownerWallet,
    }
  } catch (error) {
    console.error("Error al obtener direcciones de wallets:", error)
    return {}
  }
}

