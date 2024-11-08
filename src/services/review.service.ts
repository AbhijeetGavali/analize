import { RowDataPacket } from "mysql2";
import { pool } from "../config/mysql";
import { Review } from "../interfaces/review";
import { product_prompt_chat_model } from "../model/model_gemini";
import { GetReviewsDetailsSchema } from "../schemas/review";

class UserService {
  getReviewsDetails = async (queryParams: GetReviewsDetailsSchema) => {
    const { pageSize = 10, pageNumber = 1, order, product_id } = queryParams;

    const offset = (pageNumber - 1) * pageSize;

    // Build the SQL query dynamically based on provided queryParams
    let sqlQuery = "SELECT * FROM review";
    const queryParamsArray: (string | number)[] = [];

    if (product_id) {
      sqlQuery += " WHERE asin = ?";
      queryParamsArray.push(product_id);
    }

    if (order) sqlQuery += `ORDER BY id ${order}`;

    sqlQuery += ` LIMIT ? OFFSET ?`;
    queryParamsArray.push(pageSize, offset);

    return new Promise(async (resolve, reject) => {
      try {
        const [rows]: [RowDataPacket[], any] = await pool.query(
          sqlQuery,
          queryParamsArray,
        );
        const responce = await this.getReviewsDetailsFromAi(
          rows.map((row) => ({
            asin: row.asin,
            name: row.name,
            date: row.date,
            rating: row.rating,
            review: row.review,
          })),
        );
        resolve(responce);
      } catch (err) {
        reject(err);
      }
    });
  };

  getReviewsDetailsFromAi = async (reviews: Review[]) => {
    const results: any[] = []; // Array to hold the results

    for (const review of reviews) {
      try {
        const result = await product_prompt_chat_model.getReviewDetails(review);
        results.push(result); // Collect the result
      } catch (error) {
        console.error(`Error processing review ${review.asin}:`, error);
        results.push(null); // Handle error by pushing null or any fallback value
      }
    }

    return results;
  };

  getProductDetails = async (product_id: string) => {
    let sqlQuery = "SELECT * FROM review where asin = ?";
    const queryParamsArray: (string | number)[] = [];
    queryParamsArray.push(product_id);

    return new Promise(async (resolve, reject) => {
      try {
        const [rows]: [RowDataPacket[], any] = await pool.query(
          sqlQuery,
          queryParamsArray,
        );
        const responce = await this.getProductDetailsFromAi(
          rows.map((row) => ({
            asin: row.asin,
            name: row.name,
            date: row.date,
            rating: row.rating,
            review: row.review,
          })),
        );
        resolve(responce);
      } catch (err) {
        reject(err);
      }
    });
  };

  getProductDetailsFromAi = async (reviews: Review[]) => {
    const result = await product_prompt_chat_model.getProductDetails(reviews);
    return result;
  };

  getBusinessDetailStats = async () => {
    let sqlQuery = "SELECT * FROM review";
    const queryParamsArray: (string | number)[] = [];

    return new Promise(async (resolve, reject) => {
      try {
        const [rows]: [RowDataPacket[], any] = await pool.query(
          sqlQuery,
          queryParamsArray,
        );
        const responce = await this.getBusinessDetailStatsFromAi(
          rows.map((row) => ({
            asin: row.asin,
            name: row.name,
            date: row.date,
            rating: row.rating,
            review: row.review,
          })),
        );
        resolve(responce);
      } catch (err) {
        reject(err);
      }
    });
  };

  getBusinessDetailStatsFromAi = async (reviews: Review[]) => {
    const result = await product_prompt_chat_model.getBusinessInsights(reviews);
    return result;
  };
}

export default UserService;
