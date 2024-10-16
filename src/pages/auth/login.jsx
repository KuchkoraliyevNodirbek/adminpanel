import { useForm } from "react-hook-form";
import { useLogin } from "./uselogin";
import { useNavigate } from "react-router-dom";
import { saveState } from "../../config/stroge";
import { toast } from "react-toastify";
import { Form, Input, Button, Typography } from "antd";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { mutate, isLoading } = useLogin();
  const navigate = useNavigate();

  const submit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log(res);

        // Save token and role
        saveState("user", {
          access_token: res.access_token,
          refresh_token: res.refresh_token,
          role: res.role,
        });

        // Redirect based on user's role
        if (res.role === "admin") {
          navigate("/admin");
          toast.success("Login successful!", {
            autoClose: 3000,
            hideProgressBar: true,
          });
        } else if (res.role === "superadmin") {
          navigate("/super-admin");
          toast.success("Login successful!", { autoClose: 3000 });
        } else {
          navigate("/"); // Default page
        }
      },
      onError: (error) => {
        console.error("Login failed:", error);
        toast.error("Incorrect login or password", { position: "top-center" });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <Typography.Title level={2} className="text-center mb-6">
          Login
        </Typography.Title>
        <Form onFinish={handleSubmit(submit)} layout="vertical">
          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email ? errors.email.message : null}
          >
            <Input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setValue("email", e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password ? errors.password.message : null}
          >
            <Input.Password
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              onChange={(e) => setValue("password", e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
