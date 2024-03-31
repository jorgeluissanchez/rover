"use client";

import {
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { io } from 'socket.io-client'
import { DateTimePicker } from "@/components/datepicker";
import { Button } from "@/components/ui/button";
const socket = io('http://localhost:3000/test', {
  path: '/api/v1',
  transports: ['websocket', 'polling']
});

export function RobertDataTable<TData, TValue>() {
  const [newData, setNewData] = useState([]);
  
  const [time, setTime] = useState(
    {
      dateStart: new Date(),
      dateEnd: new Date(),
    });
  useEffect(() => {
    socket.emit('read-db', 'all-db-data');

    const handleNewData = (general: any) => {
      const newGeneral = general.data;
      setNewData(newGeneral)
      console.log(newGeneral)
    };
    socket.on('all-db-data', handleNewData);


    return () => {
      socket.off('all-db-data', handleNewData);
    };
  }, []);

  return (
    <div className="space-y-4 w-full">
      
      <div className="flex flex-col md:flex-row gap-4 items-center">
          <DateTimePicker
            value={{
              date: time.dateEnd,
              hasTime: true
            }} onChange={(date) => {
              setTime((prev) => ({
                ...prev,
                dateEnd: date.date,
              }));
            }} />
          <DateTimePicker value={{
            date: time.dateEnd,
            hasTime: true
          }} onChange={(date) => {
            console.log(date.date)
            setTime((prev) => ({
              ...prev,
              dateEnd: date.date,
            }));
          }} />
          <Button onClick={() => {
            socket.emit('start-stream', 'new-data');
          }} className="w-full md:w-fit"
          >Filter</Button>
        </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead>
              CO2
            </TableHead>
            <TableHead>
              Humidity
            </TableHead>
            <TableHead>
              Pressure
            </TableHead>
            <TableHead>
              Temperature
            </TableHead>
            <TableHead>
              NH3
            </TableHead>
            <TableHead>
              UVIndex
            </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newData?.map((row: any) =>
              <TableRow key={"o-"+row.CO2+"h-"+row.Humidity}>
                <TableCell>
                  {row.CO2}
                </TableCell>
                <TableCell>
                  {row.Humidity}
                </TableCell>
                <TableCell>
                  {row.Pressure}
                </TableCell>
                <TableCell>
                  {row.Temperature}
                </TableCell>
                <TableCell>
                  {row.NH3}
                </TableCell>
                <TableCell>
                  {row.UVIndex}
                </TableCell>
              </TableRow>
            )}
            {newData?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
