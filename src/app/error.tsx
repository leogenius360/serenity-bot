"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect } from "react";

import { internalUrls } from "@/config/site";

export default function GlobalError({
  error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col gap-4 mx-auto my-24 text-center font-bold text-sm p-3">
      <h3 className="font-mono text-current">Something went wrong!</h3>
      <div className="">
        <Button
          href={internalUrls.home}
          as={Link}
          color="primary"
          variant="shadow"
        >
          Refresh the page
        </Button>
      </div>
    </main>
  );
}
