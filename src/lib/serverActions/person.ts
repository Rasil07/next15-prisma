"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
export interface Person {
  id?: number;
  firstname: string;
  lastname: string;
  phone: string;
  dateOfBirth?: Date;
}

const PERSON_PATH = "/";

export const createPerson = async (formData: Person): Promise<Person> => {
  const person = await prisma.person.create({
    data: {
      firstname: formData.firstname,
      lastname: formData.lastname,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
    },
  });

  revalidatePath(PERSON_PATH);

  return person as Person;
};

export async function updatePerson(formData: Person): Promise<Person> {
  const updatedPerson = await prisma.person.update({
    where: { id: formData.id },
    data: {
      ...formData,
    },
  });

  revalidatePath(PERSON_PATH);
  return updatedPerson as Person;
}

export const deletePerson = async (formData: FormData) => {
  const id = parseInt(formData.get("id") as string, 10);
  await prisma.person.delete({ where: { id: id } });
  revalidatePath(PERSON_PATH);
};

export async function fetchAllPerson(): Promise<Person[]> {
  const peoples = await prisma.person.findMany();
  return peoples as Person[];
}
