"use client";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useHomeState } from "@/hooks/state";

export default function Home() {
  const { peoples, Dialogue, handleOpen } = useHomeState();

  return (
    <div className="bg-darkbg w-full flex flex-col items-center">
      <header className="h-16 bg-primary px-[24] w-full flex items-center">
        <p className="text-xl text-white p-0 m-0 ">People</p>
      </header>

      <main className="p-[24] h-screen w-full lg:max-w-[1200px]">
        <div className="w-full h-[50px]" />

        <Button
          className="bg-primary text-sm
         text-white rounded-sm py-[6px] w-fit px-[24px]"
          onClick={() => handleOpen(null)}
        >
          ADD NEW PERSON
        </Button>

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
                  <TableCell>{person?.dateOfBirth?.toString() || ""}</TableCell>

                  <TableCell>
                    <Button className="bg-accent text-white text-sm rounded-sm py-[6px] w-fit px-[24px]">
                      Edit
                    </Button>
                    <Button className="bg-destructive text-white text-sm rounded-sm py-[6px] w-fit px-[24px]">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </main>

      <Dialogue />
    </div>
  );
}
