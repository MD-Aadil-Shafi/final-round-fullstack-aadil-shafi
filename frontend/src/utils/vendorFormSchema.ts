import { z } from "zod"

const paymentTypes = ["cash", "credit_card"] as const
export const departmentTypes = ["Engineering","Sales", "Production", "HR", "Finance", "Marketing", "Operations"] as const

export const vendorSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Max 20 characters"),

  about: z
    .string()
    .min(1, "About is required")
    .max(20, "Max 20 characters"),

  logo: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),

  owner_first_name: z
    .string()
    .max(10, "Max 10 characters")
    .optional(),

  owner_last_name: z
    .string()
    .max(10, "Max 10 characters")
    .optional(),

  description: z.string().optional(),

  location: z
    .string()
    .max(20, "Max 20 characters")
    .optional(),

  payment_type: z.string().max(20, "Max 20 characters"),
  department: z.string().optional(),
  contact: z
    .string()
    .email("Invalid email address"),
})

export type VendorFormValues = z.infer<typeof vendorSchema>
