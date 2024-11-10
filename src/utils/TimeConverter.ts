import moment from "moment";

export const getFormattedDate = (date: string) => {
  const formattedDate = moment(date).format("YYYY-MM-DD");
  return formattedDate;
};
