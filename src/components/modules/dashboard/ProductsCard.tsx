import React, { type FC } from 'react';
import { scaleThreshold } from '@visx/scale';
import {
  LegendThreshold,
  LegendItem,
  LegendLabel,
} from '@visx/legend';

const thresholdScale = scaleThreshold({
  domain: [2, 4, 6, 8, 10],
  range: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'],
});

interface PrdouctsCardProps {
  title: string;
  icon?: JSX.Element;
  data: { date: string; value: number }[];
  events?: any;
}

function LegendHolder({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="legend">
      <div className="title">{title}</div>
      {children}
      <style    >{`
        .legend {
          line-height: 0.9em;
          color: #efefef;
          font-size: 10px;
          font-family: arial;
          padding: 10px 10px;
          float: left;
          border: 1px solid rgba(255, 255, 255, 0.3);
          margin: 5px 5px;
        }
        .title {
          font-size: 12px;
          margin-bottom: 10px;
          font-weight: 100;
        }
      `}</style>
    </div>
  );
}

const legendGlyphSize = 15;

const ProductsCard: FC<PrdouctsCardProps> = ({ title, icon, data, events }) => (
  <div className="legends">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-white text-xs font-bold flex items-center gap-2">
        {icon}
        {title}
      </h2>
    </div>
    <div>
      <span className='text-white text-xs text-center font-bold'>20 Shampoo para perro</span>
    </div>
    
    <LegendHolder title="Disponibilidad">
      <LegendThreshold scale={thresholdScale}>
        {(labels) =>
          labels.reverse().map((label, i) => (
            <LegendItem
              key={`legend-quantile-${i}`}
              margin="1px 0"
              onClick={() => {
                if (events) alert(`clicked: ${JSON.stringify(label)}`);
              }}
            >
              <svg width={legendGlyphSize} height={legendGlyphSize}>
                <rect fill={label.value} width={legendGlyphSize} height={legendGlyphSize} />
              </svg>
              <LegendLabel align="left" margin="2px 0 0 10px">
                {label.text}
              </LegendLabel>
            </LegendItem>
          ))
        }
      </LegendThreshold>
    </LegendHolder>
    
    <style>{`
        .legends {
          font-family: arial;
          font-weight: 900;
          background-color: black;
          padding: 24px 24px 24px 32px;
          overflow-y: auto;
          flex-grow: 1;
        }
        .chart h2 {
          margin-left: 10px;
        }
      `}</style>
  </div>
);

export default ProductsCard;