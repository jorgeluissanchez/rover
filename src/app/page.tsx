import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Roberts } from "@/components/roberts/table/roberts"
import { ChartOxigen } from "@/components/roberts/oxigen/charts"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto h-screen p-4 overflow-auto">
      <div className="flex justify-between items-center bg-white rounded-md p-4">
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
        <div className="flex gap-4">
          <Button size="sm" variant="outline"
          >Oxigeno</Button>
          <Button size="sm" variant="secondary"
          >CO2</Button>
          </div>

      </div>
      <div className="flex flex-col bg-white rounded-md p-4 gap-5">
      <ChartOxigen />
      <Roberts questionId="1" />

      </div>
    </div>
  )
}
