"use client";

import { personSchema } from "@/lib/formResolvers/person";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createPerson, Person, updatePerson } from "@/lib/serverActions/person";
import { useToast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

function formatDateOfBirth(dateOfBirth: string) {
  const date = new Date(dateOfBirth);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

type PersonFormProp = {
  person?: Person;
};
const PersonForm = ({ person }: PersonFormProp) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const [isLoading, setLoading] = useState(false);

  const { toast } = useToast();
  const form = useForm<z.infer<typeof personSchema>>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      firstname: person?.firstname,
      lastname: person?.lastname,
      phone: person?.phone,
      dateOfBirth: formatDateOfBirth(person?.dateOfBirth?.toString() || ""),
    },
  });

  const onFormSubmit = async (data: z.infer<typeof personSchema>) => {
    setLoading(true);
    let payload: Person = {
      ...data,
      dateOfBirth: new Date(data.dateOfBirth),
    };

    if (person) {
      payload = {
        id: person.id,
        ...payload,
      };

      await updatePerson(payload);
      toast({ title: "Person updated successfully." });
    } else {
      await createPerson(payload);
      toast({ title: "Person added successfully." });
    }

    setLoading(false);
    setModalOpen(false);
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        {person ? (
          <Button variant="outline" onClick={() => setModalOpen(true)}>
            Edit
          </Button>
        ) : (
          <Button onClick={() => setModalOpen(true)}>Add</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{person ? "Edit" : "Add"} Person</DialogTitle>
          <DialogDescription>
            {person
              ? "Update the details of the person"
              : "Enter the details of the person"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="0422018632" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DOB</FormLabel>
                  <FormControl>
                    <Input placeholder="1998-06-06" {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setModalOpen(false)}
              >
                Close
              </Button>

              {isLoading ? (
                <Button
                  disabled
                  className="text-white text-sm rounded-sm py-[6px] w-fit px-[24px]"
                >
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                </Button>
              ) : (
                <Button type="submit">{person ? "Save" : "Add"}</Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PersonForm;
