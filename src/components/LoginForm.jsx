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
    <div className="h-screen w-full flex items-center justify-center lg:justify-start overflow-hidden ">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col items-center justify-center ">
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
                placeholder="Email"
                className="w-full px-4 py-2 border "
              />
            </div>
            <div>
              <Input
                required
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border "
              />
            </div>
            <Button variant="login" type="submit">
              Log in
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-4"> </div>
            </div>
            <div className="relative text-center text-lg after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login */}
          <form action={doSocialLogin}>
            <Button
              type="submit"
              name="action"
              value="google"
              variant="outline"
              className="w-full flex items-center justify-center gap-2  py-2"
            >
              <div className="relative w-6 h-6 ">
                <Image
                  src={google}
                  alt="Google Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm r">
                Votre compte {process.env.DOMAIN_NAME?.toLowerCase()}
              </span>
            </Button>
          </form>
        </div>
      </div>

      {/* Right Section - Only visible on large screens (lg and up)  bg-[#A64F24] bg-[#4B77BE] */}
      <div className="hidden lg:flex w-1/2 bg-[#A64F24] p-8 items-center h-screen justify-center text-white">
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
