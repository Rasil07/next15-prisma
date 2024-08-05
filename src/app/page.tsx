import Image from "next/image";
import styles from "./page.module.css";
import { useHomeState } from "@/hooks/state";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  const homeState = useHomeState();

  console.log({ homeState });
  return (
    <div>
      <header className="h-16 bg-primary px-[24] flex items-center">
        <p className="text-xl text-white p-0 m-0 ">People</p>
      </header>

      <main className="bg-darkbg p-[24] h-screen">
        <div className="w-full h-[50px]" />
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
                <TableHead>Phone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
      </main>
    </div>
  );
}
