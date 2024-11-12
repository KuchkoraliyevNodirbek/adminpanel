import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateTranslator } from "../../service/mutation/useCreateTranslator"; // API call hook for creating a translator
import { toast } from "react-toastify"; // Toast notification library
import { useNavigate } from "react-router-dom";

export const CreateTranslatorForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm(); // Initialize form handling
  const createTranslatorMutation = useCreateTranslator(); // Hook for translator creation
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    try {
      await createTranslatorMutation.mutateAsync({
        name: data.name,
        surname: data.surname,
      }); // API request to create translator
      toast.success("Translator created successfully!"); // Show success toast
      reset(); // Reset the form
      navigate(-1); // Navigate back
    } catch (error) {
      setError("server", { message: error.message }); // Show error if any
      toast.error("Error creating translator."); // Show error toast
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 bg-white shadow-md shadow-primary rounded-lg max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Create Translator</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block font-medium mb-2">Name:</label>
          <input
            type="text"
            {...register("name", { required: "This field is required" })}
            className={`border p-2 w-full rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter name"
          />
          {errors.name && (
            <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Surname */}
        <div>
          <label className="block font-medium mb-2">Surname:</label>
          <input
            type="text"
            {...register("surname", { required: "This field is required" })}
            className={`border p-2 w-full rounded-md ${
              errors.surname ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter surname"
          />
          {errors.surname && (
            <p className="text-red-500 mt-1 text-sm">{errors.surname.message}</p>
          )}
        </div>
      </div>

      {/* Submit button */}
      <div className="text-center">
        <button
          type="submit"
          className="max-w-lg w-full bg-primary hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition duration-300 disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Translator"}
        </button>
      </div>

      {/* Server error message */}
      {errors.server && (
        <p className="text-red-500 text-center mt-4">{errors.server.message}</p>
      )}
    </form>
  );
};
