import { GenerationConfig, GoogleGenerativeAI } from "@google/generative-ai";

import * as env from "dotenv";
import { Review } from "../interfaces/review";
env.config();

const apiKey = process.env.GEMINI_API_KEY ?? "";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 100000,
  responseMimeType: "application/json",
};

export const product_prompt_chat_model = {
  getReviewDetails: async (review: Review) => {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: '*Transform the following review data into a structured output format. The input contains details such as product ID, name, review date, rating, and the text of the review. Based on this information, return a detailed output that includes the review\'s sentiment, specific aspect-based sentiments, a summary of the review, key keywords, and validate the given rating. Use the following input and output structures:*\n\n**Input Structure:**\n```json\n{\n    "asin": "string",\n    "name": "string",\n    "date": "string",\n    "rating": "number",\n    "review": "string"\n}\n```\n\n**Output Structure:**\n```json\n{\n    "name": "string",\n    "date": "YYYY-MM-DD",\n    "rating": "number",\n    "review": "string",\n    "sentiment": "positive | negative | neutral",\n    "aspect_sentiment": {\n        "quality": "positive | negative | neutral",\n        "shipping": "positive | negative | neutral",\n        "...": ""\n    },\n    "review_summary": "string",\n    "keywords": [\n        "string",\n        "string",\n        "..."\n    ],\n    "rating_validation": "valid | invalid"\n}\n```\n\n**Example Input:**\n```json\n{\n    "asin": "B07PGL2N7J",\n    "name": "Wireless Earbuds",\n    "date": "2024-10-10",\n    "rating": 4,\n    "review": "Great sound quality, but shipping was delayed."\n}\n```\n\n**Expected Output:**\n```json\n{\n    "name": "Wireless Earbuds",\n    "date": "2024-10-10",\n    "rating": 4,\n    "review": "Great sound quality, but shipping was delayed.",\n    "sentiment": "positive",\n    "aspect_sentiment": {\n        "quality": "positive",\n        "shipping": "negative"\n    },\n    "review_summary": "The product has great sound quality, but there were issues with delayed shipping.",\n    "keywords": ["sound quality", "shipping delay"],\n    "rating_validation": "valid"\n}\n```\n\nrespond with "OK" if understood',
            },
          ],
        },
        {
          role: "model",
          parts: [{ text: "OK \n" }],
        },
      ],
    });

    const result = await chatSession.sendMessage(JSON.stringify(review));
    return JSON.parse(result.response.text());
  },

  getProductDetails: async (reviews: Review[]) => {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: 'Analyze customer reviews for products based on the input structure provided below. Generate a detailed output that summarizes the product sentiment, reviews, and provides business insights.\n\n### **Input Structure:**\nYou will receive an array of customer reviews in the following format:\n\n```\nArray<{\n        "asin": "string",    // Product unique identifier\n        "name": "string",    // Product name\n        "date": "string",    // Date of the review in YYYY-MM-DD format\n        "rating": "number",  // Review rating (1 to 5 stars)\n        "review": "string"   // Review text\n}>\n```\n\n### **Expected Output Structure:**\nThe output should provide a comprehensive analysis of the product reviews, including sentiment distribution, rating trends, and actionable business insights. Format the output as follows:\n\n```json\n{\n  "product_name": "string",   // Name of the product being reviewed\n  "sentiment_distribution": { // Sentiment analysis of the reviews\n    "positive": "percentage", // Percentage of positive reviews\n    "negative": "percentage", // Percentage of negative reviews\n    "neutral": "percentage"   // Percentage of neutral reviews\n  },\n  "average_rating": "number", // Average rating across all reviews\n  "average_rating_over_time": [ // Monthly trend of average ratings\n    {\n      "date": "YYYY-MM",         // Year and month of review aggregation\n      "average_rating": "number" // Average rating for that month\n    }\n  ],\n  "aspect_sentiment_distribution": { // Sentiment analysis on specific aspects of the product\n    "quality": {\n      "positive": "number",      // Number of positive reviews on product quality\n      "negative": "number",      // Number of negative reviews on product quality\n      "neutral": "number"        // Number of neutral reviews on product quality\n    },\n    "shipping": {\n      "positive": "number",\n      "negative": "number",\n      "neutral": "number"\n    },\n    "...": ""\n  },\n  "most_mentioned_aspects": {   // Aspects of the product that were most mentioned in reviews\n    "aspect": "count"           // Count of mentions for each aspect\n  },\n  "keyword_frequency": {        // Keyword frequency analysis from reviews\n    "keyword": "count"          // Number of times a keyword was mentioned\n  },\n  "business_recommendations": { // Actionable insights for the business\n    "suggested_actions": [      // Actions to improve based on review analysis\n      "Improve shipping time",\n      "Enhance product quality control",\n      "..."\n    ],\n    "customer_experience_areas_to_focus_on": [ // Areas to focus on for better customer satisfaction\n      "Shipping",\n      "Product durability",\n      "..."\n    ]\n  }\n}\n```\n\n**Instructions:** Based on the customer reviews data provided in next input, analyze the reviews to calculate the sentiment distribution (positive, negative, neutral), the average rating, rating trends over time, and sentiments on specific product aspects like quality and shipping. Also, generate business recommendations based on the data.\n\nrespond with "OK" if understood',
            },
          ],
        },
        {
          role: "model",
          parts: [{ text: "OK \n" }],
        },
      ],
    });

    const result = await chatSession.sendMessage(JSON.stringify(reviews));
    return JSON.parse(result.response.text());
  },

  getBusinessInsights: async (reviews: Review[]) => {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: '\nI have a dataset of product reviews, each containing details like product ID (ASIN), product name, review date, rating (on a scale of 1-5), and the review text. I want to extract business insights from this data.\n\n### **Input Structure:**\nThe reviews are structured as follows:\n```json\nArray<{\n        "asin": "string",\n        "name": "string",\n        "date": "string",\n        "rating": "number",\n        "review": "string"\n    }>\n```\n\n### **Output Structure:**\nI want the insights from these reviews in the following format:\n```json\n{\n    "overall_sentiment_distribution": {\n        "positive": "percentage",\n        "negative": "percentage",\n        "neutral": "percentage"\n    },\n    "overall_aspect_sentiment_distribution": {\n        "quality": {\n            "positive": "number",\n            "negative": "number",\n            "neutral": "number"\n        },\n        "shipping": {\n            "positive": "number",\n            "negative": "number",\n            "neutral": "number"\n        },\n        "...": ""\n    },\n    "overall_most_mentioned_aspects": {\n        "aspect": "count"\n    },\n    "overall_keyword_frequency": {\n        "keyword": "count"\n    },\n    "frequent_positive_themes": [\n        "string",\n        "string",\n        "..."\n    ],\n    "frequent_negative_themes": [\n        "string",\n        "string",\n        "..."\n    ],\n    "business_recommendations": {\n        "suggested_priority_actions": [\n            "Improve shipping time",\n            "Enhance product quality control",\n            "..."\n        ],\n        "customer_experience_areas_to_focus_on": [\n            "Shipping",\n            "Product durability",\n            "..."\n        ]\n    }\n}\n```\n\n### **Analysis Requirements:**\n- **Sentiment Analysis**: Determine the overall sentiment (positive, negative, neutral) of the reviews and provide the sentiment distribution in percentages.\n- **Aspect-based Sentiment Analysis**: Break down sentiment (positive, negative, neutral) for key aspects such as product quality, shipping, etc.\n- **Mention Frequency**: Provide counts for the most frequently mentioned aspects and keywords across all reviews.\n- **Frequent Themes**: Extract frequent themes from the reviews, categorizing them as either positive or negative.\n- **Business Recommendations**: Based on the insights, suggest priority actions for improving the business (e.g., shipping time, product quality) and key areas of the customer experience that need attention.\n\n### **NOTE**: maximum number of strings in any array and fields in object should be 5\nPlease analyze the reviews and return the insights in the requested format.\n\nrespond with "OK" if understood',
            },
          ],
        },
        {
          role: "model",
          parts: [{ text: "OK \n" }],
        },
      ],
    });

    const inputArray: Array<string> = [];
    reviews.map((review) =>
      inputArray.push(JSON.stringify(Object.values(review))),
    );

    const result = await chatSession.sendMessageStream(inputArray);
    return JSON.parse((await result.response).text());
  },
};
