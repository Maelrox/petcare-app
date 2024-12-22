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
    <div className="legend-services">
      <div className="title">{title}</div>
      {children}
      <style>
        {`
        .legend-services {
          line-height: 0.9em;
          color: #efefef;
          font-size: 14px;
          padding-top:25px;
          padding-left:25px;
        }
        .title {
          font-size: 12px;
          font-weight: 100;
        }
      `}
      </style>
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

  <div className="legends-service">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-white text-xs font-bold flex items-center gap-2 pt-6 pl-6">
        {icon}
        {title}
      </h2>
    </div>

    <LegendHolder title="">
      <LegendOrdinal scale={ordinalColorScale} labelFormat={(label) => `${label.toUpperCase()}`}>
        {(labels) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
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
                <LegendLabel align="left" margin="0 0 0 4px">
                  {label.text}
                </LegendLabel>
              </LegendItem>
            ))}
          </div>
        )}
      </LegendOrdinal>
    </LegendHolder>

    <style>{`
        .legends-service {
          font-weight: 900;
          background-color: #0c2a34;
          overflow-y: auto;
          flex-grow: 1;
          padding:5px;
        }
        .chart h2 {
          margin-left: 10px;
        }
      `}</style>
  </div>
);

export default ServicesCard;