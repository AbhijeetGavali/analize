import { z } from "zod";

export const DefaultSearchParams = z.object({
  pageSize: z.string().transform((val) => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed)) {
      throw new Error("Invalid number");
    }
    return parsed;
  }),
  pageNumber: z.string().transform((val) => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed)) {
      throw new Error("Invalid number");
    }
    return parsed;
  }),
  order: z.enum(["ASC", "DESC"]).optional(),
});
