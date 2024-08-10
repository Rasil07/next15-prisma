import { z } from "zod";

export const personSchema = z.object({
  id: z.number().optional(),
  firstname: z.string({
    required_error: "First name is required.",
  }),
  lastname: z.string({
    required_error: "Last name is required.",
  }),
  phone: z.string({
    required_error: "Phone number is required",
  }),
  dateOfBirth: z
    .string({ required_error: "Date of birth is required." })
    .date("Date of birt is invalid."),
});
