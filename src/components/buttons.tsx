"use client";

import NextLink from "next/link";
import { Button } from "@nextui-org/react";
import { FiPhone } from "react-icons/fi";

export const SupportButton = () => {
  return (
    <Button
      as={NextLink}
      size="sm"
      href="/"
      radius="full"
      color="primary"
      variant="ghost"
      endContent={<FiPhone />}
      className="w-full h-6 lg:h-7 ring-offset-1 ring-1 ring-emerald-600 dark:ring-offset-gray-800 font-semibold min-w-28 text-sm dark:text-white"
    >
      Support
    </Button>
  );
};
