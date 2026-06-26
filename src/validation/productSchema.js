import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title cannot be empty"),

  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description cannot be empty"),

  price: z
    .number({ required_error: "Price is required", invalid_type_error: "Price must be a number" })
    .positive("Price must be greater than 0"),

  stock: z
    .number({ required_error: "Stock is required", invalid_type_error: "Stock must be a number" })
    .int("Stock must be a whole number")
    .nonnegative("Stock cannot be negative"),

  brand: z
    .string()
    .optional(),

  category: z
    .string({ required_error: "Category is required" })
    .min(1, "Category cannot be empty"),
});
