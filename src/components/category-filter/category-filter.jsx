import React, { useState } from "react";
import { useGetCategories } from "../../service/query/useGetCategoriesList"; // Hookni import qilish

export const CategoriesFilter = () => {
    const [searchTerm, setSearchTerm] = useState(''); // Foydalanuvchi input uchun qidiruv qiymati
    const { data: categories, isLoading, error } = useGetCategories(searchTerm); // Hookdan foydalanish

    if (isLoading) return <div>Yuklanmoqda...</div>;
    if (error) return <div>Xatolik yuz berdi</div>;

    return (
        <div>
            {/* Filtr uchun input maydoni */}
            <input
                type="text"
                placeholder="Kategoriyani qidiring"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Qidiruv qiymatini yangilash
                className="border p-2 mb-4"
            />
            
            {/* Kategoriyalarni ko'rsatish */}
            <div className="grid grid-cols-3 gap-4">
                {categories?.map((category) => (
                    <div key={category.id} className="border p-4">
                        <h3 className="font-bold">{category.name}</h3>
                        <p>{category.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

