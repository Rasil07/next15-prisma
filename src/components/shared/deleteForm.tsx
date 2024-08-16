"use client";

import React from "react";
import { Button } from "../ui/button";

import { Person } from "@/lib/serverActions/person";
import { ReloadIcon } from "@radix-ui/react-icons";

import { useToast } from "../ui/use-toast";
// import { ToastAction } from "@radix-ui/react-toast";

type DeleteFormProps = {
  onSubmit: (e: FormData) => Promise<void>;
  person: Person;
};
const DeleteForm = ({ onSubmit, person }: DeleteFormProps) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    setIsDeleting(true);
    await onSubmit(formData);
    setIsDeleting(false);
    toast({ title: "Person removed.", variant: "destructive" });
  };

  if (isDeleting) {
    return (
      <Button
        disabled
        className="bg-destructive text-white text-sm rounded-sm py-[6px] w-fit px-[24px]"
      >
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      </Button>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <Button
        className="bg-destructive text-white text-sm rounded-sm py-[6px] w-fit px-[24px]"
        type="submit"
      >
        <input type="hidden" name="id" value={person.id} />
        Delete
      </Button>
    </form>
  );
};

export default DeleteForm;
