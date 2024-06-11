import { format, formatDistanceToNow } from "date-fns";

import vi from "date-fns/locale/vi";

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), "dd MMMM yyyy");
}

export function fDateTime(date) {
  return format(new Date(date), "dd MMM yyyy HH:mm");
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), "dd/MM/yyyy  p");
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: vi,
  });
}

export function formatDateVN(date, formatDate = "E P") {
  return format(new Date(date), formatDate, {
    locale: vi,
  });
}
