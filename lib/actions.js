"use server";
import { redirect } from "next/dist/server/api-utils";
import { saveMeal } from "./meals";

//we are using 'use server' to indicate that this function will be
//executed on the server side

function isInvalidText(text) {
  return !text || text.trim() === "";
}
export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.image) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "invalid Input.",
    };
  }

  await saveMeal(meal);
  redirect("/meals");
}
