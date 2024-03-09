import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Roberts } from "@/components/roberts/table/roberts"
import { ChartOxigen } from "@/components/roberts/oxigen/charts"
import Image from "next/image"

export default function Home() {
  return (
    <div className="space-4 flex flex-col">
      <div className="flex justify-between items-center p-4 bg-white shadow-sm dark:bg-gray-800">
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
      <ModeToggle />

      </div>
      <main className="p-4 space-y-4 flex flex-col md:flex-row md:space-x-5">
        <section className="flex-1">
      <ChartOxigen />

        </section>
        <section className="flex-1">

      <Roberts questionId="1" />
        </section>
      </main>
    </div>
  )
}
