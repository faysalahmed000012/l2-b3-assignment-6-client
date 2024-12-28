import { AuthLayout } from "@/components/custom/auth/AuthLayout";
import LoginForm from "@/components/custom/auth/LoginForm";

const Login = () => {
  return (
    <div className="mt-[150px] mx-[80px] min-h-[70vh] flex flex-col items-center justify-center">
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </div>
  );
};

export default Login;
