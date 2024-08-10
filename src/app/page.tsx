"use server";

import PersonForm from "@/components/shared/personForm";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAllPerson, deletePerson } from "@/lib/serverActions/person";

function formatDateOfBirth(dateOfBirth?: string) {
  const date = new Date(dateOfBirth || "");
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default async function Home() {
  // const { peoples, Dialogue, handleOpen, handleDelete } = useHomeState();

  const peoples = await fetchAllPerson();

  return (
    <div className="bg-darkbg w-full flex flex-col items-center">
      <header className="h-16 bg-primary px-[24] w-full flex items-center">
        <p className="text-xl text-white p-0 m-0 ">People</p>
      </header>

      <main className="p-[24] h-screen w-full lg:max-w-[1200px]">
        <div className="w-full h-[50px]" />

        <PersonForm person={undefined} />

        <section className="bg-white w-full min-h-16 rounded-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>DOB</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {peoples.map((person) => (
                <TableRow key={person.id}>
                  <TableCell>{person.firstname}</TableCell>
                  <TableCell>{person.lastname}</TableCell>
                  <TableCell>{person.phone}</TableCell>
                  <TableCell>
                    {formatDateOfBirth(person?.dateOfBirth?.toString()) || ""}
                  </TableCell>

                  <TableCell className="flex gap-4">
                    <PersonForm person={person} />
                    <form action={deletePerson}>
                      <Button
                        className="bg-destructive text-white text-sm rounded-sm py-[6px] w-fit px-[24px]"
                        type="submit"
                      >
                        <input type="hidden" name="id" value={person.id} />
                        Delete
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </main>

      {/* <Dialogue /> */}
    </div>
  );
}
