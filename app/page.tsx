import PresaleDapp from "@/components/presale-dapp"

export default function Home() {
  return (
    <main className="min-h-screen bg-[url('/bg-presale.jpg')] bg-cover bg-center bg-fixed text-white">
      <div className="min-h-screen w-full bg-slate-900/80 backdrop-blur-sm">
        <PresaleDapp />
      </div>
    </main>
  )
}

