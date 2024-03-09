'use client';
import { AreaChart } from '@tremor/react';

 const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export function AreaChartOxigen({chartdata}: any) {
  return (
    <AreaChart
      className="h-80"
      data={chartdata}
      index="date"
      categories={['SemiAnalysis', 'The Pragmatic Engineer']}
      colors={['indigo', 'rose']}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      onValueChange={(v: any) => console.log(v)}
    />
  );
}