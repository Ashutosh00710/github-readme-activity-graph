import axios, { AxiosRequestConfig } from "axios";

export const calendarData = async (userId: string) => {
  try {
    let data: AxiosRequestConfig = await axios(
      `http://github-calendar.herokuapp.com/commits/${userId}`
    );
    return data.data.data;
  } catch (err) {
    console.log("ERROR");
  }
};
