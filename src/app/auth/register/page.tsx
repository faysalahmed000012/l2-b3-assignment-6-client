import { AuthLayout } from "@/components/custom/auth/AuthLayout";
import RegisterForm from "@/components/custom/auth/RegistrationForm";

const Register = () => {
  return (
    <div className="mt-[150px] mx-[80px] min-h-[70vh] flex items-center justify-center">
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </div>
  );
};

export default Register;
