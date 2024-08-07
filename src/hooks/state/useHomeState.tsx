"use client";

import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import {
  deletePerson,
  fetchAllPerson,
  Person,
} from "@/lib/serverActions/person";
import { Button } from "@/components/ui/button";

export const useHomeState = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [dialogueOpen, setDialogueOpen] = useState<boolean>();

  const [editMode, setEditMode] = useState<boolean>();

  const [currentPerson, setCurrentPerson] = useState<Person | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPeoples = await fetchAllPerson();
        setPeoples(fetchedPeoples);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onEditClick = (id: number) => {
    setEditMode(true);
    setDialogueOpen(true);
    setCurrentPerson(peoples.find((person) => person.id === id) || null);
  };
  const handleOpen = (person: Person | null) => {
    setCurrentPerson(person);
    setEditMode(!!person);
    setDialogueOpen(true);
  };

  const handleClose = () => {
    setDialogueOpen(false);
    setCurrentPerson(null);
    setEditMode(false);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await deletePerson(String(id));

      if (response) {
        setPeoples((prevPeople) =>
          prevPeople.filter((person) => person.id !== id)
        );
        // setSnackbarMessage("Record deleted successfully!");
        // setSnackbarSeverity("success");
      } else {
        // setSnackbarMessage("Error deleting the record.");
        // setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error("Error deleting the person:", error);
      // setSnackbarMessage("Error deleting the record.");
      // setSnackbarSeverity("error");
    }
    // setSnackbarOpen(true);
  };

  const Dialogue = () => (
    <Dialog
      open={dialogueOpen}
      onOpenChange={(val) => {
        if (!val) {
          handleClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
  return { peoples, loading, error, handleOpen, handleDelete, Dialogue };
};
