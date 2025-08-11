import { DateTime } from "luxon";

const timeFormat = (start, end) => {
  const luxonStart = DateTime.fromISO(start, { zone: "utc" });
  const luxonEnd = DateTime.fromISO(end, { zone: "utc" });

  if (luxonStart.hasSame(luxonEnd, "day")) {
    return (
      luxonStart.toLocal().toLocaleString(DateTime.DATE_MED) +
      ", " +
      luxonStart.toLocal().toLocaleString(DateTime.TIME_SIMPLE) +
      " - " +
      luxonEnd.toLocal().toLocaleString(DateTime.TIME_SIMPLE)
    );
  } else {
    return (
      luxonStart.toLocal().toLocaleString(DateTime.DATETIME_MED) +
      " - " +
      luxonEnd.toLocal().toLocaleString(DateTime.DATETIME_MED)
    );
  }
};

export default timeFormat;
