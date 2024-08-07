// "use client";

// import { fetchAllPerson } from "@/lib/serverActions/person";
// import React from "react";

// import { Person } from "@/lib/serverActions/person";

// export const useHomeState = () => {
//   const [peoples, setPeoples] = React.useState<Person[]>([]);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState<null | unknown>(null);

//   React.useEffect(() => {
//     const fetchData = async () => {
//       "use server";
//       try {
//         const fetchedPeoples = await fetchAllPerson();
//         setPeoples(fetchedPeoples);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { peoples, loading, error };
// };
