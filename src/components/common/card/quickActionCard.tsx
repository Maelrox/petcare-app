export const QuickActionCard = ({ icon, title, description, color }) => (
    <div className={`${color} rounded-lg p-4 flex items-center space-x-4 hover:shadow-md transition-all duration-300 border-2 border-white_brand`}>
      <div className="bg-white/20 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>
      </div>
    </div>
  );