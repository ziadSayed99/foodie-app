"use server";
import { redirect } from "next/dist/server/api-utils";
import { saveMeal } from "./meals";

//we are using 'use server' to indicate that this function will be
//executed on the server side
export async function shareMeal(formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  await saveMeal(meal);
  redirect("/meals");
}
