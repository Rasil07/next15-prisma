import Image from "next/image";
import styles from "./page.module.css";
// import { useHomeState } from "@/hooks/state";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAllPerson } from "@/lib/serverActions/person";
import { Suspense } from "react";

export default async function Home() {
  const serverPeople = fetchAllPerson();
  const people = await serverPeople;

  return (
    <div className="bg-darkbg flex flex-col items-center">
      <header className="h-16 bg-primary px-[24] w-full flex items-center">
        <p className="text-xl text-white p-0 m-0 ">People</p>
      </header>

      <main className="p-[24] h-screen min-w-[1200px] max-w-[1200px]">
        <div className="w-full h-[50px]" />
        <Suspense fallback>
          <button
            className="bg-primary text-sm
         text-white rounded-sm py-[6px] w-fit px-[24px]"
          >
            ADD NEW PERSON
          </button>

          <section className="bg-white w-full min-h-16 rounded-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {people.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        </Suspense>
      </main>
    </div>
  );
}
