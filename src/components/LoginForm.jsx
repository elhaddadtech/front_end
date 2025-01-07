import "../app/globals.css";
import { doSocialLogin } from "../app/actions";
import placeholder from "../../public/img/login.png";
import logo from "../../public/img/logo-dark.png";
import google from "../../public/icons/google.svg";
import Image from "next/image";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function LoginPage() {
  // Function to handle form submission

  return (
    <div className="h-screen w-full flex items-center justify-center lg:justify-start overflow-hidden">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-40 lg:w-64 lg:h-64">
              <Image
                src={logo}
                alt="Université Cadi Ayyad Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Login Form */}
          <form className="space-y-7">
            <div>
              <Input
                required
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <Input
                required
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <Button
              className="w-full bg-[#A44F28] hover:bg-[#d66c3b] text-white py-2 rounded-md"
              type="submit"
            >
              Log in
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">ou</span>
            </div>
          </div>

          {/* Google Login */}
          <form action={doSocialLogin}>
            <Button
              type="submit"
              name="action"
              value="google"
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border rounded-md py-2"
            >
              <div className="relative w-6 h-6">
                <Image
                  src={google}
                  alt="Google Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm">Votre compte @uca.ac.ma</span>
            </Button>
          </form>
        </div>
      </div>

      {/* Right Section - Only visible on large screens (lg and up) */}
      <div className="hidden lg:flex w-1/2 bg-[#4B77BE] p-8 items-center h-screen justify-center text-white">
        <div className="w-full max-w-2xl pt-32">
          <h1 className="text-4xl font-bold text-center">
            Bienvenue dans votre espace privé
          </h1>

          {/* Illustration */}
          <div className="relative w-full aspect-square -mt-14">
            <Image
              src={placeholder}
              alt="Educational Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
