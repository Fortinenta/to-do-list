import { format, isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns';

export const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = parseISO(dateString);
  return format(date, 'PPP'); // e.g., Oct 25, 2023
};

export const isDateToday = (dateString) => {
  if (!dateString) return false;
  return isToday(parseISO(dateString));
};

export const isDateThisWeek = (dateString) => {
  if (!dateString) return false;
  return isThisWeek(parseISO(dateString));
};

export const isDateThisMonth = (dateString) => {
  if (!dateString) return false;
  return isThisMonth(parseISO(dateString));
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};
