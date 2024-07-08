import Button from "@/components/elements/button";
import { useRouter } from "next/router";
import React from "react";

export default function CancelButton() {
  const { back } = useRouter();
  return (
    <Button variant="secondary" onClick={back}>
      Batal
    </Button>
  );
}
