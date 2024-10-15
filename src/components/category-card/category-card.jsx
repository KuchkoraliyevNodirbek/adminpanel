import React from 'react';

const CategoryCard = ({ category }) => {
    console.log(category);
    
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-xl font-bold mb-2">
        {category.name || 'N/A'} {/* Nomini ko'rsatadi */}
      </h3>
      <p className="text-gray-600">
        {category.description || 'No description available'} {/* Tavsifini ko'rsatadi */}
      </p>
      {/* Qo'shimcha ma'lumotlarni ko'rsatish */}
      <div className="mt-4">
        <p>
          <strong>ID:</strong> {category.id}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
