import axios, { AxiosRequestConfig } from "axios";
import { themes } from "../styles/themes";
import { colors } from "./GraphCards";

export const calendarData = async (userId: string) => {
  try {
    let data: AxiosRequestConfig = await axios(
      `http://github-calendar.herokuapp.com/commits/last/${userId}`
    );
    return data.data.data.length
      ? data.data.data
      : `Can't fetch any contribution. Please check if your username is correct.`;
  } catch (err) {
    return `Please check your internet connection! 😬`;
  }
};

export const selectColors = (queryString: string): colors => {
  switch (queryString) {
    case "dracula":
      return themes["dracula"];
    case "gruvbox":
      return themes["gruvbox"];
    case "cotton_candy":
      return themes["cotton_candy"];
    default:
      return themes["default"];
  }
};
