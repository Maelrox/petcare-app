import React from 'react';
import { 
  FileText, 
  CloudUpload, 
  Users, 
  Bell, 
  Plus, 
  Download 
} from 'lucide-react';

const QuickActionsWidget = () => {
  const actions = [
    { 
      icon: <FileText className="text-blue-500" size={24} />, 
      title: "Generate Report", 
      description: "Create monthly summary" 
    },
    { 
      icon: <CloudUpload className="text-green-500" size={24} />, 
      title: "Upload Data", 
      description: "Import new records" 
    },
    { 
      icon: <Users className="text-purple-500" size={24} />, 
      title: "Manage Users", 
      description: "Edit team access" 
    }
  ];

  return (
    <div className="bg-white shadow-md p-6 border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-color_brand">Quick Actions</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button 
            key={index} 
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition group"
          >
            <div className="bg-gray-100 p-2 rounded-full">
              {action.icon}
            </div>
            <div className="text-left">
              <p className="font-semibold text-color_brand group-hover:text-blue-600 transition">
                {action.title}
              </p>
              <p className="text-xs text-color_brand">
                {action.description}
              </p>
            </div>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition">
              <Download size={16} className="text-color_brand" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsWidget;