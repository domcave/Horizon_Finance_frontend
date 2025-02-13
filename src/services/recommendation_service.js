import axios from "axios";
import { BACKEND_BASE_URL } from "../environment";

axios.defaults.baseURL = BACKEND_BASE_URL; 

/**
 *
 * @param {object} params
 * params will contain:
 *  - username
 *  - savings
 *  - arr (annual return rate)
 *  - wd_rate (withdrawl rate)
 */
export async function getRetirementRecommendation(params) {
  const username = params.username;
  const savings = params.savings;
  const arr = params.arr;
  const wd_rate = params.wd_rate;
  const target_amount = params.target_amount;

  const response = await axios.get("/recommendations/retirement", {
    params: {
      username,
      savings,
      arr,
      wd_rate,
      target_amount,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);

  return response;
}

/**
 *
 * @param {object} params
 * params will contain:
 *  - username
 *  - num_kids
 *  - arr (annual return rate)
 *  - spouse_income
 *  - save
 *  - years_to_college
 */
export async function getMarriageRecommendation(params) {
  const username = params.username;
  const num_kids = params.num_kids;
  const arr = params.arr;
  const spouse_income = params.spouse_income;
  const save = params.save;
  const years_to_college = params.years_to_college;

  const response = await axios.get("/recommendations/marriage", {
    params: {
      username,
      num_kids,
      arr,
      spouse_income,
      save,
      years_to_college,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);

  return response;
}

/**
 *
 * @param {object} params
 * params will contain:
 *  - username
 *  - owned_house_price
 */
export async function getHouseRecommendation(params) {
  const username = params.username;
  const owned_house_price = params.owned_house_price;

  const response = await axios.get("/recommendations/house", {
    params: {
      username: username,
      owned_house_price: owned_house_price,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response);

  return response;
}
