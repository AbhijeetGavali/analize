import { z } from "zod";
import { DefaultSearchParams } from "./comman";

// TODO validate product id if exists
export const GetReviewsDetails = DefaultSearchParams.extend({
  product_id: z.string().optional(),
});

export type GetReviewsDetailsSchema = z.infer<typeof GetReviewsDetails>;
