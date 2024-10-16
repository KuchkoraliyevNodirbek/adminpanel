import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useGetCategoryById } from '../../service/query/useGetCAtegoryById'; // Hook to get category
import { useUpdateCategory } from '../../service/mutation/useUpdateCategory'; // Hook to update category
import { toast } from 'react-toastify';
import { Loading } from '../../components/loading/loading';

const EditCategory = () => {
    const { id } = useParams(); // Get the category ID from the URL
    const { data: category, isLoading } = useGetCategoryById(id); // Fetch the category
    const updateCategoryMutation = useUpdateCategory(); // Hook to update category
    const { register, handleSubmit, reset, formState: { errors }, setError } = useForm();

    const navigate = useNavigate()

    useEffect(() => {
        if (category) {
            reset(category); // Set form values with fetched category data
        }
    }, [category, reset]);

    const onSubmit = async (data) => {
        try {
            await updateCategoryMutation.mutateAsync({ id, ...data });
            toast.success('Kategoriya muvaffaqiyatli yangilandi!');
            navigate(-1)
        } catch (error) {
            setError('server', { message: error.message });
            toast.error('Kategoriya yangilanishida xato yuz berdi.');
        }
    };

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div className='max-w-5xl mx-auto border-2 p-5 border-blue-500 rounded-lg'>
            {/* Access specific property of the category object */}
            <h1>Edit Category: {category.name.uz}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block">Nom (O'zbek):</label>
                    <input 
                        type="text" 
                        {...register('name.uz', { required: 'Bu maydon talab qilinadi' })} 
                        className="border p-2 w-full" 
                    />
                    {errors.name?.uz && <p className="text-red-500">{errors.name.uz.message}</p>}
                </div>

                <div>
                    <label className="block">Nom (Ingliz):</label>
                    <input 
                        type="text" 
                        {...register('name.en', { required: 'Bu maydon talab qilinadi' })} 
                        className="border p-2 w-full" 
                    />
                    {errors.name?.en && <p className="text-red-500">{errors.name.en.message}</p>}
                </div>

                <div>
                    <label className="block">Nom (Rus):</label>
                    <input 
                        type="text" 
                        {...register('name.ru', { required: 'Bu maydon talab qilinadi' })} 
                        className="border p-2 w-full" 
                    />
                    {errors.name?.ru && <p className="text-red-500">{errors.name.ru.message}</p>}
                </div>

                <div>
                    <label className="block">Tavsif (O'zbek):</label>
                    <textarea 
                        {...register('description.uz', { required: 'Bu maydon talab qilinadi' })} 
                        className="border p-2 w-full" 
                    />
                    {errors.description?.uz && <p className="text-red-500">{errors.description.uz.message}</p>}
                </div>

                <div>
                    <label className="block">Tavsif (Ingliz):</label>
                    <textarea 
                        {...register('description.en', { required: 'Bu maydon talab qilinadi' })} 
                        className="border p-2 w-full" 
                    />
                    {errors.description?.en && <p className="text-red-500">{errors.description.en.message}</p>}
                </div>

                <div>
                    <label className="block">Tavsif (Rus):</label>
                    <textarea 
                        {...register('description.ru', { required: 'Bu maydon talab qilinadi' })} 
                        className="border p-2 w-full" 
                    />
                    {errors.description?.ru && <p className="text-red-500">{errors.description.ru.message}</p>}
                </div>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full" disabled={updateCategoryMutation.isLoading}>
                    {updateCategoryMutation.isLoading ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>

                {errors.server && <p className="text-red-500">{errors.server.message}</p>}
            </form>
        </div>
    );
};

export default EditCategory;
