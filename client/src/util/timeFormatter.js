import { DateTime } from "luxon";

const timeFormat = (start, end) => {
  const luxonStart = DateTime.fromISO(start, { zone: "utc" });
  const luxonEnd = DateTime.fromISO(end, { zone: "utc" });

  if (luxonStart.hasSame(luxonEnd, "day")) {
    return (
      luxonStart.toLocaleString(DateTime.DATE_MED) +
      ", " +
      luxonStart.toLocaleString(DateTime.TIME_SIMPLE) +
      " - " +
      luxonEnd.toLocaleString(DateTime.TIME_SIMPLE)
    );
  } else {
    return (
      luxonStart.toLocaleString(DateTime.DATETIME_MED) +
      " - " +
      luxonEnd.toLocaleString(DateTime.DATETIME_MED)
    );
  }
};

export default timeFormat;
