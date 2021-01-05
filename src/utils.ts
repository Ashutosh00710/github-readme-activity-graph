import axios, { AxiosRequestConfig } from "axios";
import { themes } from "../styles/themes";
import { colors } from "../interfaces/interface";

export const calendarData = async (
  userId: string
): Promise<number[] | string> => {
  try {
    let data: AxiosRequestConfig = await axios(
      `http://github-calendar.herokuapp.com/commits/last/${userId}`
    );
    return data.data.data.length
      ? data.data.data
      : `Can't fetch any contribution. Please check username 😬`;
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
    case "github":
      return themes["github"];
    case "rogue":
      return themes["rogue"];
    case "xcode":
      return themes["xcode"];
    default:
      return themes["default"];
  }
};
