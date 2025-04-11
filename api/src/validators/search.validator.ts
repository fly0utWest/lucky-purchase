import z from "zod";

export const SearchSchema = z
  .object({
    query: z.string().optional().default(""),
    sortBy: z
      .enum(["newest", "oldest", "expensive", "cheap"])
      .optional()
      .default("newest"),
    sortDirection: z.enum(["asc", "desc"]).optional().default("desc"),
    minPrice: z.number().positive().optional(),
    maxPrice: z.number().positive().optional(),
    category: z.string().optional(),
    skip: z.number().int().nonnegative().optional().default(0),
    take: z.number().int().positive().optional().default(20),
  })
  .refine(
    (data) => {
      if (data.minPrice !== undefined && data.maxPrice !== undefined) {
        return data.minPrice <= data.maxPrice;
      }
      return true;
    },
    {
      message: "Minimum price must be less than or equal to maximum price",
      path: ["minPrice", "maxPrice"],
    }
  );

export type SearchDTO = z.infer<typeof SearchSchema>;
