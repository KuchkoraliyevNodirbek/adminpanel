import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useGetAllAdmin } from "./useGetAllAdmin"; // Ensure correct path to your hook
import { useAdminDelete } from "./useAdminDelete"; // Ensure correct path to your delete hook

export const AdminChange = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [limit, setLimit] = useState(10); // Set limit
  const [offset, setOffset] = useState(0); // Set offset
  const { data, isLoading, isError, error } = useGetAllAdmin(limit, offset);

  // Setup the delete mutation
  const deleteMutation = useAdminDelete();

  console.log(data);

  if (isLoading) return <div>Yuklanmoqda...</div>;
  if (isError) return <div>Xatolik: {error?.message}</div>;

  // Filter by role
  const superAdmins =
    data?.users?.filter((user) => user.role === "superadmin") || [];
  const admins = data?.users?.filter((user) => user.role === "admin") || [];
  const users = data?.users?.filter((user) => user.role === "user") || [];

  // Check if there is more data for pagination
  const hasMoreData = data?.users?.length === limit;

  // Handle deletion of admin (redirecting to Single Admin page)
  const handleDelete = (id) => {
    navigate(`/admin-change/${id}`); // Navigate to Single Admin page with admin ID
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Hamma Adminlar</h2>

      {/* SuperAdmins */}
      {superAdmins.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mt-4">SuperAdmins</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {superAdmins.map((admin) => (
              <div
                key={admin.id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <p className="font-bold">Email: {admin.email}</p>
                <p>Role: {admin.role}</p>
                {admin.first_name && <p>First Name: {admin.first_name}</p>}
                {admin.last_name && <p>Last Name: {admin.last_name}</p>}
                {admin.phone_number && (
                  <p>Phone Number: {admin.phone_number}</p>
                )}
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleDelete(admin.id)} // Navigate to Single Admin page
                    className="py-1 px-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    className="py-1 px-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    onClick={() => alert(`Edit ${admin.email}`)} // Placeholder for edit functionality
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Adminlar */}
      {admins.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mt-4">Admins</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {admins.map((admin) => (
              <div
                key={admin.id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <p className="font-bold">Email: {admin.email}</p>
                <p>Role: {admin.role}</p>
                {admin.first_name && <p>First Name: {admin.first_name}</p>}
                {admin.last_name && <p>Last Name: {admin.last_name}</p>}
                {admin.phone_number && (
                  <p>Phone Number: {admin.phone_number}</p>
                )}
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleDelete(admin.id)} // Navigate to Single Admin page
                    className="py-1 px-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    className="py-1 px-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    onClick={() => alert(`Edit ${admin.email}`)} // Placeholder for edit functionality
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Userlar */}
      {users.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mt-4">Users</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <p className="font-bold">Email: {user.email}</p>
                <p>Role: {user.role}</p>
                {user.first_name && <p>First Name: {user.first_name}</p>}
                {user.last_name && <p>Last Name: {user.last_name}</p>}
                {user.phone_number && <p>Phone Number: {user.phone_number}</p>}
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleDelete(user.id)} // Navigate to Single Admin page
                    className="py-1 px-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    className="py-1 px-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    onClick={() => alert(`Edit ${user.email}`)} // Placeholder for edit functionality
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setOffset((prev) => Math.max(prev - limit, 0))} // Previous
          disabled={offset === 0}
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Oldingi
        </button>
        <button
          onClick={() => {
            if (hasMoreData) {
              setOffset((prev) => prev + limit); // Next
            }
          }} // Next
          disabled={!hasMoreData} // Disable if no more data
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Keyingi
        </button>
      </div>
    </div>
  );
};
