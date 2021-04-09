const includeNumberZero = (number) =>
  String(number).length === 1 ? `0${number}` : number;

const getNewDate = () => new Date();

export const getHours = () => {
  const date = getNewDate();
  const hours = includeNumberZero(date.getHours());
  const minutes = includeNumberZero(date.getMinutes());

  return { hours, minutes };
};

const arrMonth = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const arrWeekDay = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export const getMonthDayAndWeekDay = () => {
  const date = getNewDate();
  const month = arrMonth[date.getMonth()];
  const day = date.getDate();
  const weekDay = arrWeekDay[date.getDay()];

  return { month, day, weekDay };
};
