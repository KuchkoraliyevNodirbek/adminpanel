import React, { useEffect } from "react";
import { message, Button, Spin } from "antd";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom"; // Import useParams hook
import { useUpdateTranslator } from "../../service/mutation/useUpdateTranslator"; // Custom hook for updating translator
import { useGetTranslatorById } from "../../service/query/useGetTranslatorById"; // Custom hook for fetching translator data

export const TranslatorUpdate = () => {
  const { id: translatorId } = useParams(); // Get translatorId from URL params
  const { data: translator, isLoading } = useGetTranslatorById(translatorId); // Fetch translator data by ID
  const updateTranslatorMutation = useUpdateTranslator(); // Hook to update translator details

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  useEffect(() => {
    if (translator) {
      reset(translator); // Set form values with fetched translator data
    }
  }, [translator, reset]);

  const onSubmit = async (data) => {
    try {
      // Only include 'name' and 'surname' in the update request
      await updateTranslatorMutation.mutateAsync({
        id: translatorId,
        name: data.name,
        surname: data.surname,
      });
      message.success("Translator updated successfully");
    } catch (error) {
      setError("server", { message: error.message });
      message.error("Failed to update translator");
    }
  };

  if (isLoading) {
    return <Spin size="large" tip="Loading translator..." />;
  }

  return (
    <div className="translator-update max-w-5xl mx-auto p-6 bg-white shadow-primary shadow-md border border-gray-200 rounded-lg mt-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700 text-center">
        Update Translator Details
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-2">Name:</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="border rounded-lg p-3 focus:outline-none focus:border-blue-500"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Surname Field */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-2">Surname:</label>
          <input
            type="text"
            {...register("surname", { required: "Surname is required" })}
            className="border rounded-lg p-3 focus:outline-none focus:border-blue-500"
          />
          {errors.surname && (
            <p className="text-red-500">{errors.surname.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full text-center">
          <Button
            type="primary"
            htmlType="submit"
            className="mx-auto bg-primary text-white font-bold py-3 rounded-lg w-full max-w-lg hover:bg-dark transition-all duration-300"
            loading={updateTranslatorMutation.isLoading}
            disabled={updateTranslatorMutation.isLoading}
          >
            {updateTranslatorMutation.isLoading
              ? "Updating..."
              : "Update Translator"}
          </Button>
        </div>

        {/* Server Error Message */}
        {errors.server && (
          <p className="text-red-500">{errors.server.message}</p>
        )}
      </form>
    </div>
  );
};
