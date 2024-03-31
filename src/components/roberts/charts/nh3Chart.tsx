'use client';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SparkAreaChart, AreaChart } from '@tremor/react';

export function AreaChartNh3({data}: {data: any}) {
  function calcularPorcentajeCrecimiento() {
    const n = data.length;
    if (n < 2) {
        return 0;
    }
    const ultimoValor = data[n - 1].NH3;
    const valorAnterior = data[n - 2].NH3;

    if (ultimoValor === valorAnterior) {
        return 0; 
    }

    if (valorAnterior === 0) {
        return 100; 
    }
    const porcentajeCrecimiento = ((ultimoValor - valorAnterior) / Math.abs(valorAnterior)) * 100;
    return porcentajeCrecimiento.toFixed(2);
}
  return (

    <Dialog>
    <DialogTrigger asChild>
    <Card className="flex items-center justify-between px-4 py-3.5 gap-2 hover:cursor-pointer hover:bg-slate-200">
      <div className="flex items-center space-x-2.5">
        <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">NH3</p>
      </div>
      
    <SparkAreaChart
      data={data || [{
        time: 0,
        CO2: 0
      }]}
      index="time"
      categories={['NH3']}
      colors={['orange-500']}
    />
      <div className="flex items-center space-x-2.5">
        <span className="rounded bg-[#E0823A] px-2 py-1 text-tremor-default font-medium text-white">
          {calcularPorcentajeCrecimiento()}%
        </span>
      </div>
    </Card>
    </DialogTrigger>
    
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          NH3
        </DialogTitle>
        <DialogDescription>
          This is the NH3 chart
        </DialogDescription>
      </DialogHeader>
    <div className="flex gap-4 py-4">
        <AreaChart
          data={data || [{
            time: 0,
            Temperature: 0
          }]}
          index="time"
          categories={['NH3']}
          colors={['orange-500']}
          yAxisWidth={30}
          showXAxis={false}
        />
      </div>
    </DialogContent>
    </Dialog>
  );
}