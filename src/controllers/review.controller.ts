import { RequestHandler } from "express";
import { buildResponse } from "../common/utils";
import ReviewService from "../services/review.service";
import { errorHandler } from "../common/errors";
import { GetReviewsDetails } from "../schemas/review";

class ReviewController {
  private _reviewsService = new ReviewService();

  getReviewsDetails: RequestHandler = async (req, res) => {
    try {
      const query = GetReviewsDetails.parse(req.query);
      const reviews = [
        {
          name: "Mamaearth-Onion-Growth-Control-Redensyl",
          date: "2019-08-18",
          rating: 5,
          review:
            "I have been trying different onion oil for my hair as my hair is not very healthy. This product has literally changed the texture of my scalp and I am really happy with the results. It comes in a nice colorful packaging too. Definitely recommend this one to everyone looking out for onion oil.  For more reviews you can follow me on Instagram @insi_lovemyself.",
          sentiment: "positive",
          aspect_sentiment: {
            quality: "positive",
            packaging: "positive",
          },
          review_summary:
            "The reviewer is very happy with the product, stating it has significantly improved their scalp texture. They appreciate the packaging as well and highly recommend it to others seeking onion oil.",
          keywords: ["onion oil", "hair health", "scalp texture", "packaging"],
          rating_validation: "valid",
        },
        {
          name: "Mamaearth-Onion-Growth-Control-Redensyl",
          date: "2019-09-16",
          rating: 1,
          review:
            "Product just smells similar to navarathna hair oil .. but not strong as that and oil is not sticky after applying three drops of oil !! More review after usage of 2 months1) worst product2) hair fall increased a lot3) brought this product after watching YouTube influencer Mumbaiker Nikhil4) totally misguided never take suggestions from influencers.5) using since 2 months no result and I'm losing my more hair6) mama earth just wasted my money as well damaged my hair7)better they provide solution or return my money",
          sentiment: "negative",
          aspect_sentiment: {
            quality: "negative",
            shipping: "neutral",
          },
          review_summary:
            "The product has a mild scent similar to navarathna hair oil and is not sticky. However, after two months of use, the customer experienced increased hair fall and no positive results. They feel misled by influencer marketing and believe the product wasted their money and damaged their hair.",
          keywords: [
            "hair oil",
            "hair fall",
            "influencer marketing",
            "no results",
            "money wasted",
            "hair damage",
          ],
          rating_validation: "valid",
        },
        {
          name: "Mamaearth-Onion-Growth-Control-Redensyl",
          date: "2019-09-28",
          rating: 1,
          review:
            "I purchased both oil and shampoo after watching fake YouTube  and customer review.After first day of use of oil and shampoo my hairfall increased.",
          sentiment: "negative",
          aspect_sentiment: {
            quality: "negative",
            shipping: "neutral",
          },
          review_summary:
            "The customer experienced increased hairfall after using the oil and shampoo, and feels deceived by fake reviews.",
          keywords: ["hairfall", "oil", "shampoo", "fake reviews"],
          rating_validation: "valid",
        },
        {
          name: "Mamaearth-Onion-Growth-Control-Redensyl",
          date: "2019-09-30",
          rating: 4,
          review:
            "I have been using this product for some time now. My Roommate had this and I had been planning to order for a while now. I just used to forget all the time, finally I have it now.Well from the last 2 months of use, here's my experience with the product:I use it every night and get a shower in the morning.Pros:1. The oil is non greasy, and pretty light.2. Has very good smell.no pungent or awkward fragrance3. My hair doesn't lump in together as with other hair oil products.4.Gives a pretty good shine and dark color5. It's very helpful for dandruff, hairfall/ hairloss. I don't have a very dense hair presence so my scalp was visible all the time, Now it looks pretty dense.Cons.1 .can't find anything at allI do recommend it for people having hairfall issues.",
          sentiment: "positive",
          aspect_sentiment: {
            quality: "positive",
            smell: "positive",
            texture: "positive",
            hairfall: "positive",
            dandruff: "positive",
          },
          review_summary:
            "The product is non-greasy, has a pleasant smell, and effectively addresses dandruff and hair fall. It leaves hair shiny and healthy-looking.",
          keywords: [
            "hair oil",
            "non-greasy",
            "pleasant smell",
            "dandruff control",
            "hair fall control",
            "shiny hair",
          ],
          rating_validation: "valid",
        },
        null,
        {
          name: "Mamaearth-Onion-Growth-Control-Redensyl",
          date: "2019-09-06",
          rating: 1,
          review:
            "I bought this hair oil after viewing so many good comments. But this product is not good enough.First of all it's Expensive...Second thing the amount of the product is low (half bottle) YES!The bottle is not completely filled with oil. If you cheating on your customers #Mamaearth trust me on this you can't fool people more than once. Now I know that your Brand is not good enough. I am not going to buy any product from your Brand again.Thumbs down for mamaearth onion oil !!",
          sentiment: "negative",
          aspect_sentiment: {
            quality: "negative",
            price: "negative",
            quantity: "negative",
          },
          review_summary:
            "The customer is highly dissatisfied with the product, citing high price, low quantity ('half bottle'), and a feeling of being cheated.",
          keywords: [
            "expensive",
            "low quantity",
            "half bottle",
            "cheating",
            "brand",
          ],
          rating_validation: "valid",
        },
        null,
        null,
        {
          name: "Mamaearth-Onion-Growth-Control-Redensyl",
          date: "2019-08-30",
          rating: 5,
          review:
            "I used it only one time so I can't say about hairfall control but I couldn't stop myself to mention about its amazing effect. It made my hair extremely soft and shiny which was visible properly. Smell was strong but not bothering. I think this is the best hair fall which I have used till date. My search ends over here I suppose. Just waiting to see its impact on arresting hairfall.",
          sentiment: "positive",
          aspect_sentiment: {
            quality: "positive",
            smell: "neutral",
            "hairfall control": "neutral",
          },
          review_summary:
            "The product makes hair extremely soft and shiny after just one use, although its impact on hair fall control is yet to be observed.",
          keywords: ["soft hair", "shiny hair", "hairfall control"],
          rating_validation: "valid",
        },
        {
          name: "Mamaearth-Onion-Growth-Control-Redensyl",
          date: "2019-11-15",
          rating: 3,
          review:
            "Why are you showing onion oil benefits in your ad , when you ate not giving onion oil in your product. I bought this for redensyl content ...but not sure about the percentage of it bein added. Secondly it only has onion extracts, which am sure not is effective.Switchin back to my conventional method of makin onion juice and applyin on scalp",
          sentiment: "negative",
          aspect_sentiment: {
            ingredients: "negative",
            effectiveness: "negative",
            advertising: "negative",
          },
          review_summary:
            "The customer is dissatisfied with the product as it doesn't contain onion oil as advertised, making the ad misleading. They are uncertain about the effectiveness of onion extracts used and express a preference for traditional onion juice application.",
          keywords: [
            "onion oil",
            "redensyl",
            "onion extracts",
            "effectiveness",
            "misleading ad",
          ],
          rating_validation: "valid",
        },
      ];
      // await this._reviewsService.getReviewsDetails(query);
      res.status(200).send(buildResponse(reviews, "", ""));
      return;
    } catch (error) {
      errorHandler(res, error);
    }
  };

  getProductDetails: RequestHandler = async (req, res) => {
    try {
      const asin = req.params.product_id;
      const reviews = {
        product_name: "Mamaearth-Onion-Growth-Control-Redensyl",
        sentiment_distribution: {
          positive: "50.0",
          negative: "38.89",
          neutral: "11.11",
        },
        average_rating: "3.33",
        average_rating_over_time: [
          {
            date: "2019-08",
            average_rating: "4.6",
          },
          {
            date: "2019-09",
            average_rating: "1.75",
          },
          {
            date: "2019-10",
            average_rating: "1.0",
          },
          {
            date: "2019-11",
            average_rating: "3.0",
          },
        ],
        aspect_sentiment_distribution: {
          quality: {
            positive: "6",
            negative: "6",
            neutral: "2",
          },
          shipping: {
            positive: "0",
            negative: "0",
            neutral: "0",
          },
        },
        most_mentioned_aspects: {
          hairfall: "11",
          oil: "10",
          product: "6",
          hair: "6",
          good: "4",
          smell: "3",
          results: "3",
          onion: "3",
          expensive: "2",
          brand: "2",
          amount: "2",
          bottle: "2",
          customers: "2",
        },
        keyword_frequency: {
          hairfall: "11",
          oil: "10",
          product: "6",
          hair: "6",
          good: "4",
          smell: "3",
          results: "3",
          onion: "3",
          expensive: "2",
          brand: "2",
          amount: "2",
          bottle: "2",
          customers: "2",
        },
        business_recommendations: {
          suggested_actions: [
            "Address concerns about hairfall increasing after using the product",
            "Investigate and address concerns regarding product quantity and packaging",
            "Improve product efficacy to meet customer expectations",
            "Monitor and respond to negative reviews and influencer marketing campaigns",
          ],
          customer_experience_areas_to_focus_on: [
            "Product Quality",
            "Packaging and Quantity",
            "Customer Service and Feedback",
          ],
        },
      };
      // await this._reviewsService.getProductDetails(asin);
      res.status(200).send(buildResponse(reviews, "", ""));
      return;
    } catch (error) {
      errorHandler(res, error);
    }
  };
  
  getBusinessDetailStats: RequestHandler = async (_req, res) => {
    try {
      const reviews = {
        overall_sentiment_distribution: {
          positive: "56.25",
          negative: "25.0",
          neutral: "18.75",
        },
        overall_aspect_sentiment_distribution: {
          quality: {
            positive: "12",
            negative: "10",
            neutral: "6",
          },
          shipping: {
            positive: "4",
            negative: "6",
            neutral: "3",
          },
          fragrance: {
            positive: "8",
            negative: "3",
            neutral: "2",
          },
          packaging: {
            positive: "5",
            negative: "4",
            neutral: "2",
          },
          price: {
            positive: "4",
            negative: "5",
            neutral: "3",
          },
        },
        overall_most_mentioned_aspects: {
          hairfall: "11",
          fragrance: "13",
          skin: "13",
          quality: "14",
          taste: "15",
        },
        overall_keyword_frequency: {
          amazon: "14",
          product: "33",
          good: "31",
          best: "23",
          love: "18",
        },
        frequent_positive_themes: [
          "good quality",
          "nice fragrance",
          "value for money",
          "long lasting",
          "good taste",
        ],
        frequent_negative_themes: [
          "product is fake",
          "product damaged",
          "product not original",
          "product not working",
          "product expired",
        ],
        business_recommendations: {
          suggested_priority_actions: [
            "Improve quality control",
            "Improve packaging",
            "Ensure product authenticity",
            "Improve customer service",
            "Address price concerns",
          ],
          customer_experience_areas_to_focus_on: [
            "Product quality",
            "Packaging",
            "Authenticity",
            "Customer service",
            "Price",
          ],
        },
      };
      // await this._reviewsService.getBusinessDetailStats();
      res.status(200).send(buildResponse(reviews, "", ""));
      return;
    } catch (error) {
      errorHandler(res, error);
    }
  };
}

export default ReviewController;
