import React, { type FC } from 'react';

const legendGlyphSize = 15;

interface ServicesCardProps {
  title: string;
  icon?: JSX.Element;
  data?: { mapTotals: string[] };
  events?: any;
}

function Holder({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pt-25 pl-25 text-white">
      <div className="title">{title}</div>
      {children}
    </div>
  );
}

const ServicesCard: FC<ServicesCardProps> = ({ title, icon, data, events }) => {
  const colors = ['#66d981', '#71f5ef', '#4899f1', '#7d81f6'];
  const services = data?.mapTotals?.slice(0, 4) || [];

  return (
    <div className="bg-color_brand overflow-y-auto flex-grow pl-4 h-full pb-10">
      <div className="flex justify-between flex-col h-full">
        <h2 className="text-white text-xs font-bold flex items-center gap-2 pt-6 pb-4 md:pb-0">
          {icon}
          {title}
        </h2>
        <Holder title="">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {services.map((service, i) => (
              <div
                key={i}
                style={{ display: 'flex', alignItems: 'center', cursor: events ? 'pointer' : 'default' }}
              >
                <svg width={legendGlyphSize} height={legendGlyphSize}>
                  <rect fill={colors[i % colors.length]} width={legendGlyphSize} height={legendGlyphSize} />
                </svg>
                <span className="font-bold lowercase ml-2 text-sm">{service.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </Holder>
      </div>
    </div>
  );
};

export default ServicesCard;
