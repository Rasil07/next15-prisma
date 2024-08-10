// "use client";

// import { useState, useEffect, useMemo } from "react";

// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import {
//   deletePerson,
//   fetchAllPerson,
//   Person,
// } from "@/lib/serverActions/person";
// import { Button } from "@/components/ui/button";
// import { usePersonForm } from "../form/usePersonForm";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// function Dailogue({ dialogueOpen, person }) {
//   return (
//     <Dialog
//       open={dialogueOpen}
//       onOpenChange={(val) => {
//         if (!val) {
//           handleClose();
//         }
//       }}
//     >
//       <DialogContent className="w-[377px] lg:w-full">
//         <DialogHeader>
//           <DialogTitle>Add person</DialogTitle>
//         </DialogHeader>

//         <Form {...form}>
//           <FormField
//             control={form.control}
//             name="firstname"
//             render={({ field }) => (
//               <FormItem>
//                 {/* <FormLabel>First name</FormLabel> */}
//                 <FormControl>
//                   <Input placeholder="First Name" {...field} />
//                 </FormControl>
//                 <FormDescription>First name of the person.</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="lastname"
//             render={({ field }) => (
//               <FormItem>
//                 {/* <FormLabel>First name</FormLabel> */}
//                 <FormControl>
//                   <Input placeholder="Last Name" {...field} />
//                 </FormControl>
//                 <FormDescription>Last name of the person.</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="phone"
//             render={({ field }) => (
//               <FormItem>
//                 {/* <FormLabel>First name</FormLabel> */}
//                 <FormControl>
//                   <Input placeholder="Phone" {...field} type="number" />
//                 </FormControl>
//                 <FormDescription>Phone of the person.</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </Form>

//         <DialogFooter></DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export const useHomeState = () => {
//   const [peoples, setPeoples] = useState<Person[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   const [dialogueOpen, setDialogueOpen] = useState<boolean>();

//   const [editMode, setEditMode] = useState<boolean>();

//   const [currentPerson, setCurrentPerson] = useState<Person | null>(null);

//   const form = usePersonForm(currentPerson);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedPeoples = await fetchAllPerson();
//         setPeoples(fetchedPeoples);
//       } catch (err) {
//         setError(err as Error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // const onEditClick = (id: number) => {
//   //   setEditMode(true);
//   //   setDialogueOpen(true);
//   //   setCurrentPerson(peoples.find((person) => person.id === id) || null);
//   // };

//   const handleOpen = (person: Person | null) => {
//     setCurrentPerson(person);
//     setEditMode(!!person);
//     setDialogueOpen(true);
//   };

//   const handleClose = () => {
//     setDialogueOpen(false);
//     setCurrentPerson(null);
//     setEditMode(false);
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       const response = await deletePerson(id);

//       if (response) {
//         setPeoples((prevPeople) =>
//           prevPeople.filter((person) => person.id !== id)
//         );
//         // setSnackbarMessage("Record deleted successfully!");
//         // setSnackbarSeverity("success");
//       } else {
//         // setSnackbarMessage("Error deleting the record.");
//         // setSnackbarSeverity("error");
//       }
//     } catch (error) {
//       console.error("Error deleting the person:", error);
//       // setSnackbarMessage("Error deleting the record.");
//       // setSnackbarSeverity("error");
//     }
//     // setSnackbarOpen(true);
//   };

//   const Dialogue = useMemo(
//     () => (
//       <Dialog
//         open={dialogueOpen}
//         onOpenChange={(val) => {
//           if (!val) {
//             handleClose();
//           }
//         }}
//       >
//         <DialogContent className="w-[377px] lg:w-full">
//           <DialogHeader>
//             <DialogTitle>Add person</DialogTitle>
//           </DialogHeader>

//           <Form {...form}>
//             <FormField
//               control={form.control}
//               name="firstname"
//               render={({ field }) => (
//                 <FormItem>
//                   {/* <FormLabel>First name</FormLabel> */}
//                   <FormControl>
//                     <Input placeholder="First Name" {...field} />
//                   </FormControl>
//                   <FormDescription>First name of the person.</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="lastname"
//               render={({ field }) => (
//                 <FormItem>
//                   {/* <FormLabel>First name</FormLabel> */}
//                   <FormControl>
//                     <Input placeholder="Last Name" {...field} />
//                   </FormControl>
//                   <FormDescription>Last name of the person.</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   {/* <FormLabel>First name</FormLabel> */}
//                   <FormControl>
//                     <Input placeholder="Phone" {...field} type="number" />
//                   </FormControl>
//                   <FormDescription>Phone of the person.</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </Form>

//           <DialogFooter></DialogFooter>
//         </DialogContent>
//       </Dialog>
//     ),
//     [dialogueOpen]
//   );
//   return { peoples, loading, error, handleOpen, handleDelete, Dialogue };
// };

// // firstname
// // lastname
// // phone
// // dateOfBirth
