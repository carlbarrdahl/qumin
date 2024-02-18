"use client";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "~/app/_components/ui/button";

export function SignOutButton() {
  const router = useRouter();
  const { signOut } = useClerk();
  return (
    <Button variant="danger" onClick={() => signOut(() => router.push("/"))}>
      Logga ut
    </Button>
  );
}
