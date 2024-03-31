"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { AreaChartCo2 } from '@/components/roberts/charts/co2Chart'
import { AreaChartNh3 } from '@/components/roberts/charts/nh3Chart'
import { AreaChartTemp } from "@/components/roberts/charts/tempChart"
import { AreaChartHum } from "@/components/roberts/charts/humChart"
import { AreaChartUvi } from "@/components/roberts/charts/uviChart"
import { AreaChartPres } from "@/components/roberts/charts/presChart"
import { RobertDataTable } from "@/components/roberts/table/robert-data-table"
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
const socket = io('http://localhost:3000/test', {
  path: '/api/v1',
  transports: ['websocket', 'polling']
});
export default function Home() {
  const [newData, setNewData] = useState<any>([]);

  useEffect(() => {
    socket.emit('start-stream', 'new-data');

    const handleNewData = (general: any) => {
      const newGeneral = general.data;
      setNewData((prevData: any) => {
        const time = (prevData[prevData.length - 1]?.time || 0) + 1;
        const updatedData =
          prevData.length < 20
            ? [...prevData, { ...newGeneral, time }]
            : [...prevData.slice(1), { ...newGeneral, time }];
        return updatedData;
      });
    };
    socket.on('new-data', handleNewData);
    return () => {
      socket.off('new-data', handleNewData);
      socket.emit('stop-stream', 'new-data');
    };
  }, []);
  return (
    <div className="flex flex-col py-5 px-4 gap-4 max-w-5xl mx-auto h-fit">
      <div className="flex justify-between items-center bg-white rounded-md p-4">
        <Image src="/logo.svg" alt="logo" width={710} height={128} priority className="cursor-pointer w-[190px]" />
        <div className="flex flex-row space-x-2">
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full  bg-white rounded-md p-4 gap-5">
        <AreaChartCo2 data={newData} />
        <AreaChartHum data={newData} />
        <AreaChartNh3 data={newData} />
        <AreaChartPres data={newData} />
        <AreaChartTemp data={newData} />
        <AreaChartUvi data={newData} />
      </div>
      <div className="flex flex-col h-fit bg-white rounded-md p-4 gap-5">
        <RobertDataTable />
      </div>
    </div>
  )
}


/*

        <div className="flex space-x-2">
          <AreaChart
            className="h-64"
            data={newData}
            index="time"
            categories={['Humidity', 'NH3', 'Temperature']}
            colors={['indigo', 'rose', 'green']}
            yAxisWidth={50}
          />
          <AreaChart
            className="h-64"
            data={newData}
            index="time"
            categories={['Pressure', 'CO2']}
            colors={['yellow', 'violet']}
            yAxisWidth={50}
          />
        </div>
        {
          newData.map((data: any) => {
            return (
              <p key={data.time}>
                {data.time} - {data.CO2} - {data.NH3} - {data.Humidity} - {data.Temperature} - {data.Pressure}
              </p>
            )
          })
        }
*/