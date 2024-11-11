import z from "zod";

const authValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export const productAddValidator = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters long" }),
  price: z.string().min(1, { message: "Price must be at least 1" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  collectionId: z.string({ message: "Collection is required" }),

  case: z
    .string({ message: "Case is required" })
    .min(3, { message: "Case must be at least 3 characters long" }),
  strap: z
    .string({ message: "Strap is required" })
    .min(3, { message: "Strap must be at least 3 characters long" }),
  warranty: z
    .string({ message: "Warranty is required" })
    .min(1, { message: "Warranty must be at least 1 characters long" }),
  dialColor: z
    .string({ message: "Dial Color is required" })
    .min(2, { message: "Dial Color must be at least 3 characters long" }),
  waterResistance: z
    .string({ message: "Water Resistance is required" })
    .min(2, { message: "Water Resistance must be at least 3 characters long" }),
  logWidth: z
    .string({ message: "Log Width is required" })
    .min(1, { message: "Log Width must be at least 3 characters long" }),
  crystal: z
    .string({ message: "Creystal is required" })
    .min(2, { message: "Creystal must be at least 3 characters long" }),
  diameter: z
    .string({ message: "Diameter is required" })
    .min(3, { message: "Diameter must be at least 3 characters long" }),
  length: z
    .string({ message: "Length is required" })
    .min(1, { message: "Length must be at least 3 characters long" }),
  thickness: z
    .string({ message: "Thickness is required" })
    .min(1, { message: "Thickness must be at least 3 characters long" }),
  movement: z
    .string({ message: "Movement is required" })
    .min(1, { message: "Movement must be at least 3 characters long" }),
});

export default authValidator;
