import React, { type FC } from 'react';
import { scaleOrdinal } from '@visx/scale';
import {
  LegendOrdinal,
  LegendItem,
  LegendLabel,
} from '@visx/legend';

const ordinalColorScale = scaleOrdinal({
  domain: ['Consulta', 'Baño para Perros', 'Vacunación', 'Urgencias'],
  range: ['#66d981', '#71f5ef', '#4899f1', '#7d81f6'],
});

function LegendHolder({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pt-25 pl-25 text-white">
      <div className="title">{title}</div>
      {children}
    </div>
  );
}

const legendGlyphSize = 15;

interface ServicesCardProps {
  title: string;
  icon?: JSX.Element;
  data: { date: string; value: number }[];
  events?: any;
}
const ServicesCard: FC<ServicesCardProps> = ({ title, icon, data, events }) => (

  <div className=" bg-color_brand overflow-y-auto flex-grow pl-4 h-full pb-10" >
    <div className="flex justify-between flex-col h-full">
      <h2 className="text-white text-xs font-bold flex items-center gap-2 pt-6 pb-4 md:pb-0">
        {icon}
        {title}
      </h2>
      <LegendHolder title="">
        <LegendOrdinal scale={ordinalColorScale} labelFormat={(label) => `${label.toUpperCase()}`}>
          {(labels) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {labels.map((label, i) => (
                <LegendItem
                  key={`legend-quantile-${i}`}
                  margin="0 5px"
                  onClick={() => {
                    if (events) alert(`clicked: ${JSON.stringify(label)}`);
                  }}
                >
                  <svg width={legendGlyphSize} height={legendGlyphSize}>
                    <rect fill={label.value} width={legendGlyphSize} height={legendGlyphSize} />
                  </svg>
                  <LegendLabel align="left" margin="0 0 0 4px" className='font-bold lowercase ml-2 text-sm'>
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              ))}
            </div>
          )}
        </LegendOrdinal>
      </LegendHolder>
    </div>


  </div>
);

export default ServicesCard;