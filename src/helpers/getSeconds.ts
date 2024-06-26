export const getSeconds = (data: DataProps) => {
  return data.minutes + data.hours * 60 + data.days * 1400;
};

export const timeConvert = (minutes: number) => {
  return {
    minutes: Math.floor(minutes % 60).toString(),
    hours: Math.floor((minutes / 60) % 24).toString(),
    days: Math.floor(minutes / 24 / 60).toString(),
  };
};
type DataProps = {
  minutes: number;
  hours: number;
  days: number;
};
