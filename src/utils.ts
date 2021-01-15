import { AxiosResponse, AxiosStatic } from 'axios';
import { queryOption, colors, resp } from '../interfaces/interface';
import { selectColors } from '../styles/themes';

export const calendarData = async (
  userId: string,
  axios: AxiosStatic
): Promise<number[] | string> => {
  try {
    let apiResponse: AxiosResponse<resp> = await axios(
      `http://github-calendar.herokuapp.com/commits/last/${userId}`
    );
    return apiResponse.data.data.length
      ? apiResponse.data.data
      : `Can't fetch any contribution. Please check your username 😬`;
  } catch (err) {
    return err;
  }
};

export const queryOptions = (queryString: any): queryOption => {
  let area: boolean = false;
  let colors: colors;
  if (String(queryString.area) === 'true') {
    area = true;
  }

  if (queryString.theme) {
    colors = selectColors(String(queryString.theme));
  } else {
    //Custom options for user
    colors = {
      bgColor: String(
        queryString.bg_color
          ? queryString.bg_color
          : selectColors('default').bgColor
      ),
      color: String(
        queryString.color ? queryString.color : selectColors('default').color
      ),
      lineColor: String(
        queryString.line ? queryString.line : selectColors('default').lineColor
      ),
      pointColor: String(
        queryString.point
          ? queryString.point
          : selectColors('default').pointColor
      ),
    };
  }

  const options: queryOption = {
    username: String(queryString.username),
    colors: colors,
    area: area,
  };

  return options;
};
