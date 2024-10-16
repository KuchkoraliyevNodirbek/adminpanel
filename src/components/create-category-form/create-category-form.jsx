import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateCategory } from '../../service/mutation/useCreateCategory'; // API chaqiruvini o'z ichiga olgan hook
import { toast } from 'react-toastify'; // Toastify kutubxonasini import qilish
import { useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css'; // CSS ni import qilish

const CreateCategoryForm = () => {
  const { register, handleSubmit, reset, formState: { errors }, setError } = useForm(); // useForm hookini chaqirish
  const createCategoryMutation = useCreateCategory(); // Kategoriya yaratish uchun hook
  const [loading, setLoading] = useState(false); // Loading holatini qo'shish
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setLoading(true); // Loadingni yoqish
    try {
      await createCategoryMutation.mutateAsync({ name: data.name, description: data.description }); // API chaqiruvini yuborish
      toast.success('Kategoriya muvaffaqiyatli yaratildi!'); // Toast ko'rsatish
      reset(); // Formani tozalash
      navigate(-1)

    } catch (error) {
      setError('server', { message: error.message }); // Xato bo'lganda xato ko'rsatish
      toast.error('Kategoriya yaratishda xato yuz berdi.'); // Xato toast ko'rsatish
    } finally {
      setLoading(false); // Loadingni o'chirish
    }
  };

  return (
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

      <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
        {loading ? 'Yaratyapti...' : 'Kategoriya Yaratish'}
      </button>

      {/* Serverdan kelgan xato xabarini ko'rsatish */}
      {errors.server && <p className="text-red-500">{errors.server.message}</p>}
    </form>
  );
};

export default CreateCategoryForm;
