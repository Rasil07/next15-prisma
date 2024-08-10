import { personSchema } from "@/lib/formResolvers/person";
import { Person } from "@/lib/serverActions/person";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const usePersonForm = (person?: Person | null) => {
  const form = useForm({
    resolver: zodResolver(personSchema),
  });

  useEffect(() => {
    if (person) {
      form.reset(person);
    }
  }, [person, form]);

  return form;
};
