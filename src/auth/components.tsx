"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import clsx from "clsx";

import { handleAuthErrors } from "./firebase";

import { Divider } from "@/components/utils";

export const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      router.back();

      return;
    } catch (error) {
      handleAuthErrors(error, setErrors);

      return;
    }
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      {errors && (
        <p className="text-center font-semibold text-sm text-danger pb-3">
          {errors}
        </p>
      )}
      <div className="">
        <label htmlFor="email" className="block text-xs font-bold mb-2">
          Email
        </label>
        <input
          required
          id="email"
          type="email"
          value={email}
          placeholder="Enter your email address..."
          className="w-full border border-emerald-200 dark:border-emerald-700 rounded-md py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-primary dark:focus:border-emerald-400 truncate"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="my-3">
        <label htmlFor="password" className="block text-xs font-bold mb-2">
          Password
        </label>
        <input
          required
          id="password"
          type="password"
          value={password}
          placeholder="Password"
          className="w-full border border-emerald-200 dark:border-emerald-700 rounded-md py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-primary dark:focus:border-emerald-400 truncate"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        color="primary"
        variant="solid"
        radius="sm"
        className="w-full mt-3 font-semibold"
      >
        Proceed with login
      </Button>
    </form>
  );
};

export const SignUpForm = () => {
  const router = useRouter();

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
      router.back();
    } catch (error) {
      handleAuthErrors(error, setErrors);
    }
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      {errors && (
        <p className="text-center font-semibold text-sm text-danger pb-3">
          {errors}
        </p>
      )}
      <div className="">
        <label htmlFor="email" className="block text-xs font-bold mb-2">
          Email
        </label>
        <input
          required
          id="email"
          type="email"
          value={email}
          placeholder="Enter your email address..."
          className="w-full border border-emerald-200 dark:border-emerald-700 rounded-md py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-primary dark:focus:border-emerald-400 truncate"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="my-3">
        <label htmlFor="password2" className="block text-xs font-bold mb-2">
          Password
        </label>
        <input
          required
          id="password2"
          type="password"
          value={password}
          placeholder="Password"
          className="w-full border border-emerald-200 dark:border-emerald-700 rounded-md py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-primary dark:focus:border-emerald-400 truncate"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="my-3">
        <label htmlFor="password2" className="block text-xs font-bold mb-2">
          Confirm password
        </label>
        <input
          required
          id="password2"
          type="password"
          value={password2}
          placeholder="Confirm password"
          className="w-full border border-emerald-200 dark:border-emerald-700 rounded-md py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-primary dark:focus:border-emerald-400 truncate"
          onChange={(e) => setPassword2(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        color="primary"
        variant="solid"
        radius="sm"
        className="w-full mt-3 font-semibold"
      >
        Proceed to signup
      </Button>
    </form>
  );
};

export const AuthComponentsMounter = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [authState, setAuthSate] = useState<"login" | "signup">("login");
  const [errors, setErrors] = useState<string>("");

  const handleGoogleAuth = async () => {
    try {
      router.forward();
    } catch (error) {
      handleAuthErrors(error, setErrors);
    }
  };

  const handleAnonymousAuth = async () => {
    try {
      router.back();
    } catch (error) {
      handleAuthErrors(error, setErrors);
    }
  };

  return (
    <>
      <Button
        size="sm"
        radius="sm"
        color="primary"
        variant="light"
        // endContent={<FiChevronsRight />}
        className="font-semibold text-sm text-primary"
        onPress={onOpen}
      >
        Login
      </Button>

      <Modal
        // hideCloseButton
        size="xl"
        scrollBehavior="inside"
        isOpen={isOpen}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="border-1 border-emerald-600 h-screen">
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 justify-center text-center">
                AUTHENTICATION
                <span className="text-center inline-block text-sm font-semibold mt-2">
                  Get Authenticated for a better experience with serenity bot
                </span>
              </ModalHeader>

              <ModalBody className="custom-scrollbar">
                <div className="w-full inline-flex flex-nowrap gap-x-4 justify-center">
                  <Button
                    size="sm"
                    color="primary"
                    variant="ghost"
                    className="border-1 font-semibold text-sx shadow-md"
                    startContent={<FcGoogle size={16} className="" />}
                    onClick={handleAnonymousAuth}
                  >
                    Anonymous
                  </Button>
                  <Button
                    size="sm"
                    color="primary"
                    variant="ghost"
                    className="border-1 font-semibold text-sx shadow-md"
                    startContent={<FcGoogle size={16} className="" />}
                    onClick={handleGoogleAuth}
                  >
                    Google
                  </Button>
                </div>
                {errors && (
                  <p className="text-center font-semibold text-sm text-danger mt-2">
                    {errors}
                  </p>
                )}

                <Divider textContent="or" className="my-0" />

                {authState === "login" ? (
                  <LoginForm />
                ) : authState === "signup" ? (
                  <SignUpForm />
                ) : null}
              </ModalBody>

              <ModalFooter className="justify-between">
                <Button
                  size="sm"
                  color="primary"
                  variant={authState === "login" ? "flat" : "light"}
                  className={clsx(" rounded font-bold min-w-28", {
                    ["border-b-medium border-primary"]: authState === "login",
                  })}
                  onClick={() => setAuthSate("login")}
                >
                  Go to login
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  variant={authState === "signup" ? "flat" : "light"}
                  className={clsx(" rounded font-bold min-w-28", {
                    ["border-b-medium border-primary"]: authState === "signup",
                  })}
                  onClick={() => setAuthSate("signup")}
                >
                  Go to sign up
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
