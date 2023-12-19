import { Month } from "../types";

export const isStringInTwoDimensionalArray = <T>(
  str: string,
  arr: T[][]
): boolean => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === str) {
        return true;
      }
    }
  }
  return false;
};

export const getDaysInMonth = (monthName: Month): number => {
  const daysInMonth = {
    Январь: 31,
    Февраль: 28,
    Март: 31,
    Апрель: 30,
    Май: 31,
    Июнь: 30,
    Июль: 31,
    Август: 31,
    Сентябрь: 30,
    Октябрь: 31,
    Ноябрь: 30,
    Декабрь: 31,
  };

  const currentYear = new Date().getFullYear();
  if (!(currentYear % 4) && (currentYear % 100 || !(currentYear % 400))) {
    daysInMonth["Февраль"] = 29;
  }

  return daysInMonth[monthName];
};

export const createMonthArray = (monthName: Month): string[][] => {
  const daysInMonth = getDaysInMonth(monthName);
  const monthArray: string[][] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const index = Math.floor((day - 1) / 5);

    if (!monthArray[index]) {
      monthArray[index] = [];
    }

    monthArray[index].push(String(day));
  }

  return monthArray;
};
