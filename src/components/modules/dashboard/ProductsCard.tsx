import { type FC } from 'react';
import type { ProductResume } from '../../../types/DashboardType';

interface ProductsCardProps {
  title: string;
  icon?: JSX.Element;
  data: ProductResume[] | undefined;
}

const ProductsCard: FC<ProductsCardProps> = ({ title, icon, data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-800 text-white p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            {icon}
            {title}
          </h2>
        </div>
        <p className="text-center text-gray-400">No data available</p>
      </div>
    );
  }

  const sortedData = [...data]
    .sort((a, b) => b.name.localeCompare(a.name))
    .slice(0, 5);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          {icon}
          {title}
        </h2>
      </div>
      <ul className="space-y-4 p-4">
        {sortedData.map((product, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-700 rounded-md shadow-md"
          >
            <div className="flex items-center gap-1">
              <span className="bg-rose-600 text-white font-bold text-sm px-3">
                {index + 1}
              </span>
              <span className="text-sm">{product.name}</span>
            </div>
            <span className="text-xs text-gray-300 pr-2">{product.quantity} sold</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsCard;
