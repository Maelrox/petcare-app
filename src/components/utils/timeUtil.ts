
/**
 * Rounds a date to the nearest interval in minutes
 * @param date The date to round
 * @param intervalMinutes The interval to round to (default: 5)
 * @returns A new Date object rounded to the nearest interval
 */
export function roundToNearestMinuteInterval(stringDate: Date, intervalMinutes: number = 5): Date {
  const roundedDate = new Date(stringDate + "Z");
  const minutes = roundedDate.getMinutes();
  const roundedMinutes = Math.round(minutes / intervalMinutes) * intervalMinutes;
  roundedDate.setMinutes(roundedMinutes);
  roundedDate.setSeconds(0);
  roundedDate.setMilliseconds(0);
  return roundedDate;
}

/**
 * Ceils a date to the next interval in minutes
 * @param date The date to ceil
 * @param intervalMinutes The interval to ceil to (default: 5)
 * @returns A new Date object ceiled to the next interval
 */
export function ceilToNextMinuteInterval(date: Date, intervalMinutes: number = 5): Date {
  const ceiledDate = new Date(date);
  const minutes = date.getMinutes();
  const ceiledMinutes = Math.ceil(minutes / intervalMinutes) * intervalMinutes;
  ceiledDate.setMinutes(ceiledMinutes);
  ceiledDate.setSeconds(0);
  ceiledDate.setMilliseconds(0);
  return ceiledDate;
}

/**
 * Floors a date to the previous interval in minutes
 * @param date The date to floor
 * @param intervalMinutes The interval to floor to (default: 5)
 * @returns A new Date object floored to the previous interval
 */
export function floorToPreviousMinuteInterval(date: Date, intervalMinutes: number = 5): Date {
  const flooredDate = new Date(date);
  const minutes = date.getMinutes();
  const flooredMinutes = Math.floor(minutes / intervalMinutes) * intervalMinutes;
  flooredDate.setMinutes(flooredMinutes);
  flooredDate.setSeconds(0);
  flooredDate.setMilliseconds(0);
  return flooredDate;
}

/**
 * Formats a date to datetime-local input format
 * @param date The date to format
 * @returns A string in the format "YYYY-MM-DDThh:mm"
 */
export function formatForDateTimeLocal(date: Date): string {
  return date.toISOString().slice(0, 16);
}

/**
 * Checks if a date's minutes are aligned to a specific interval
 * @param date The date to check
 * @param intervalMinutes The interval to check against (default: 5)
 * @returns boolean indicating if the minutes are aligned to the interval
 */
export function isAlignedToMinuteInterval(date: Date, intervalMinutes: number = 5): boolean {
  return date.getMinutes() % intervalMinutes === 0;
}

export function formatForStringTimeLocal(value: String): string {
  const [datePart, timePart] = value.split("T");
  const formattedDate = datePart.replace(/-/g, "/");
  const formattedTime = timePart.slice(0, 5);
  return `${formattedDate} ${formattedTime}`;
}

