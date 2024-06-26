"use client";

import { useState, FormEvent } from "react";
import NextLink from "next/link";
import { Button } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { Divider } from "@/components";
import { internalUrls } from "@/config/site";
import {
  handleAuthErrors,
  loginAnonymously,
  loginWithGoogle,
  signUpWithEmail,
} from "@/lib/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/auth_provider";

export default function SignUpPage() {
  const router = useRouter();
  const { user } = useAuth();

  if (user) router.back();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [errors, setErrors] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!(password === password2)) {
      setErrors("Passwords not the same!");
      return;
    }
    try {
      const user = await signUpWithEmail({ email, password });
      router.back();
    } catch (error) {
      handleAuthErrors(error, setErrors);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const user = await loginWithGoogle();
      router.back();
    } catch (error) {
      handleAuthErrors(error, setErrors);
    }
  };

  const handleAnonymousAuth = async () => {
    try {
      const user = await loginAnonymously();
      router.back();
    } catch (error) {
      handleAuthErrors(error, setErrors);
    }
  };

  return (
    <div className="card bg-transparent border-primary px-3 py-6 sm:px-6 sm:py-8 rounded-md">
      <div className="text-center">
        <h6 className="font-bold text-primary">SIGN UP</h6>
        <span className="inline-block text-sm font-semibold my-2">
          Sign up for a better experience with serenity bot
        </span>
      </div>

      <div className="w-full inline-flex flex-nowrap gap-x-4 justify-center my-2">
        <Button
          size="sm"
          color="primary"
          variant="ghost"
          onClick={handleAnonymousAuth}
          className="border-1 font-semibold text-sx shadow-md"
          startContent={<FcGoogle size={16} className="" />}
        >
          Anonymous
        </Button>
        <Button
          size="sm"
          color="primary"
          variant="ghost"
          onClick={handleGoogleAuth}
          className="border-1 font-semibold text-sx shadow-md"
          startContent={<FcGoogle size={16} className="" />}
        >
          Google
        </Button>
      </div>

      <Divider textContent="or" />

      <form onSubmit={handleSubmit} className="mt-3">
        {errors && (
          <p className="text-center font-semibold text-sm text-danger pb-3">
            {errors}
          </p>
        )}
        <div className="">
          <label className="block text-xs font-bold mb-2">email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email address..."
            className="w-full border border-emerald-200 dark:border-emerald-700 rounded-md py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-primary dark:focus:border-emerald-400 truncate"
          />
        </div>

        <div className="my-3">
          <label className="block text-xs font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full border border-emerald-200 dark:border-emerald-700 rounded-md py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-primary dark:focus:border-emerald-400 truncate"
          />
        </div>

        <div className="my-3">
          <label className="block text-xs font-bold mb-2">
            Confirm password
          </label>
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Confirm password"
            required
            className="w-full border border-emerald-200 dark:border-emerald-700 rounded-md py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-primary dark:focus:border-emerald-400 truncate"
          />
        </div>

        <Button
          type="submit"
          size="sm"
          color="primary"
          variant="solid"
          // radius="full"
          className="w-full my-3"
        >
          Sign up
        </Button>
      </form>

      <div className="m-auto first-line:font-normal text-center">
        <span className="block">
          Have an account already?{" "}
          <NextLink
            href={internalUrls.login}
            className="text-blue-500 hover:underline underline-offset-2"
          >
            login
          </NextLink>
        </span>
      </div>
    </div>
  );
}
