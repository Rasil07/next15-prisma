"use client";

import React from "react";
import { Button } from "../ui/button";

import { Person } from "@/lib/serverActions/person";
import { ReloadIcon } from "@radix-ui/react-icons";

import { useToast } from "../ui/use-toast";
// import { ToastAction } from "@radix-ui/react-toast";

type ConfirmationModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal = ({ onConfirm, onCancel }: ConfirmationModalProps) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
      <p className="mb-6">Are you sure you want to delete this person?</p>
      <div className="flex justify-end space-x-4">
        <Button className="bg-gray-300 text-black" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="bg-destructive text-white" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  </div>
);

type DeleteFormProps = {
  onSubmit: (e: FormData) => Promise<void>;
  person: Person;
};
const DeleteForm = ({ onSubmit, person }: DeleteFormProps) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    setIsDeleting(true);
    await onSubmit(formData);
    setIsDeleting(false);
    toast({ title: "Person removed.", variant: "destructive" });
  };

  const handleDeleteClick = () => {
    setShowModal(true); // Show the modal when the delete button is clicked
  };

  const handleConfirmDelete = () => {
    setShowModal(false); // Hide the modal
    const form = document.querySelector("form");
    if (form)
      form.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      ); // Submit the form
  };

  const handleCancel = () => {
    setShowModal(false); // Hide the modal without deleting
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
    <>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={person.id} />
      </form>
      <Button
        className="bg-destructive text-white text-sm rounded-sm py-[6px] w-fit px-[24px]"
        type="button"
        onClick={handleDeleteClick}
      >
        Delete
      </Button>
      {showModal && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default DeleteForm;
