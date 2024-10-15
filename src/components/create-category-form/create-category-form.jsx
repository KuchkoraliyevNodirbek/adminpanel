import React, { useState } from "react";
import { useCreateCategory } from "../../service/mutation/useCreateCategory"; // Hookni import qilish

const CreateCategoryForm = () => {
    const [name, setName] = useState({
        additionalProp1: 'string',
        additionalProp2: '',
        additionalProp3: '',
    });

    const [description, setDescription] = useState({
        additionalProp1: '',
        additionalProp2: '',
        additionalProp3: '',
    });

    const { mutate: createCategory, isLoading, isError, error } = useCreateCategory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCategory = { name, description }; // Foydalanuvchi kiritgan ma'lumotlar
        createCategory(newCategory); // Kategoriya yaratish
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border">
            <h2 className="mb-4">Kategoriya yaratish</h2>

            <h3 className="mb-2">Kategoriya nomi:</h3>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Additional Prop 1"
                    value={name.additionalProp1}
                    onChange={(e) => setName({ ...name, additionalProp1: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Additional Prop 2"
                    value={name.additionalProp2}
                    onChange={(e) => setName({ ...name, additionalProp2: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Additional Prop 3"
                    value={name.additionalProp3}
                    onChange={(e) => setName({ ...name, additionalProp3: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
            </div>

            <h3 className="mb-2">Ta'rif (description):</h3>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Additional Prop 1"
                    value={description.additionalProp1}
                    onChange={(e) => setDescription({ ...description, additionalProp1: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Additional Prop 2"
                    value={description.additionalProp2}
                    onChange={(e) => setDescription({ ...description, additionalProp2: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Additional Prop 3"
                    value={description.additionalProp3}
                    onChange={(e) => setDescription({ ...description, additionalProp3: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2" disabled={isLoading}>
                {isLoading ? "Yaratilmoqda..." : "Kategoriya yaratish"}
            </button>
            {isError && <p className="text-red-500">Xatolik: {error.message}</p>}
        </form>
    );
};

export default CreateCategoryForm;
