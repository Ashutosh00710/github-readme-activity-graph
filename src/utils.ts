import axios, { AxiosRequestConfig } from 'axios';

export const calendarData = async (
  userId: string
): Promise<number[] | string> => {
  try {
    let data: AxiosRequestConfig = await axios(
      `http://github-calendar.herokuapp.com/commits/last/${userId}`
    );
    return data.data.data.length
      ? data.data.data
      : `Can't fetch any contribution. Please check your username 😬`;
  } catch (err) {
    return `Please check your internet connection! 😬`;
  }
};
