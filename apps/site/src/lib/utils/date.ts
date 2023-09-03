import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const timeAgo = (date: string | Date | null) => {
  if (!date) return "";
  return dayjs(date).fromNow();
};

export const formatEditedAt = (date: string | Date | null) => {
  if (!date) return "";
  return dayjs(date).format("DD MMM [']YY");
};
