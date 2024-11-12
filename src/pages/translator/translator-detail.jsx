import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message, Spin, Button } from "antd";
import { useGetTranslatorById } from "../../service/query/useGetTranslatorById"; // Your custom hook for fetching translator details

const TranslatorDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // Hook to navigate the user
  const {
    data: translator,
    isLoading,
    isError,
    error,
  } = useGetTranslatorById(id);

  // Show loading spinner if data is still being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Show error message if there's an error
  if (isError) {
    message.error(error?.message || "Failed to load translator details.");
    return <div className="p-4">Error loading translator details.</div>;
  }

  // If no translator is found
  if (!translator) {
    return <div className="p-4">Translator not found.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <Button
          type="primary"
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="mb-4"
        >
          Back
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-4">Translator Details</h1>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">
            Name:{" "}
            <span className="font-normal">{translator.name || "N/A"}</span>
          </h3>
        </div>
        <div>
          <h3 className="text-xl font-semibold">
            Surname:{" "}
            <span className="font-normal">{translator.surname || "N/A"}</span>
          </h3>
        </div>
        <div>
          <h3 className="text-xl font-semibold">
            Phone:{" "}
            <span className="font-normal">{translator.phone || "N/A"}</span>
          </h3>
        </div>
        <div>
          <h3 className="text-xl font-semibold">
            Email:{" "}
            <span className="font-normal">{translator.email || "N/A"}</span>
          </h3>
        </div>
        <div>
          <h3 className="text-xl font-semibold">
            Languages:{" "}
            <span className="font-normal">
              {translator.languages?.join(", ") || "N/A"}
            </span>
          </h3>
        </div>
        <div>
          <h3 className="text-xl font-semibold">
            Bio: <span className="font-normal">{translator.bio || "N/A"}</span>
          </h3>
        </div>
        <div>
          <h3 className="text-xl font-semibold">
            Rating:{" "}
            <span className="font-normal">{translator.rating || "N/A"}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TranslatorDetail;
