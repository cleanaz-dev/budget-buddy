"use client";
import { AtomIcon, Loader2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="">
          <Loader2Icon className="w-4 h-4 animate-spin" />
        </Button>
      ) : (
        <Button
          type="submit"
          className="bg-green-50 text-green-700 hover:bg-slate-50"
        >
          Upload Receipt Image
        </Button>
      )}
    </>
  );
}


export function ReceiptDataButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="">
          <Loader2Icon className="w-4 h-4 animate-spin" />
        </Button>
      ) : (
        <Button
         type="submit"
        >Analyze Receipts <AtomIcon className='ml-2'/></Button>
      )}
    </>
  );
}
