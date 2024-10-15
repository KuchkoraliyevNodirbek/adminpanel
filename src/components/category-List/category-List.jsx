import React from 'react';
import { useGetCategories } from '../../service/query/useGetCategoriesList'; // Custom hook import
import CategoryCard from '../category-card/category-card'; // Card component import

const CategoriesList = () => {
  const { data, error, isLoading } = useGetCategories('', 10, 0); // Call the hook with parameters
  console.log(data);
  

  if (isLoading) return <p>Yuklanmoqda...</p>; // Loading message
  if (error) return <p>Xatolik: {error.message}</p>; // Error message

  // Check if data is an array
  if (!Array.isArray(data)) {
    console.error("Ma'lumotlar massiv emas:", data);
    return <p>Ma'lumotlar formatida xato!</p>; // Error if data is not an array
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-red-500">
      {data.map((category) => (
        <CategoryCard key={category.id} category={category} /> // Render each category in a card
      ))}
    </div>
  );
};

export default CategoriesList;
