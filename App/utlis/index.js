export function makeDotDotDotWhenMessageIsTooLong(message) {
  const MAX_LENGTH_MESSAGE = 100;

  return message?.length > MAX_LENGTH_MESSAGE
    ? `${message.substring(0, 80)}...`
    : message;
}

function regexZeroFormatTime(string) {
  return /^0?[0-9]$/.test(string) ? `0${string}` : string;
}

export function compareTimeNowAndCreatedAt(dateString) {
  const currentTime = new Date();
  const inputTime = new Date(dateString);

  const dateMonth = regexZeroFormatTime(inputTime.getMonth() + 1);
  const dateDay = regexZeroFormatTime(inputTime.getDate());
  const dateHour = regexZeroFormatTime(inputTime.getHours());
  const dateMinute = regexZeroFormatTime(inputTime.getMinutes());

  const inputDate = new Date(
    inputTime.getFullYear(),
    inputTime.getMonth(),
    inputTime.getDate()
  );

  const today = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate()
  );

  if (currentTime.getFullYear() - inputTime.getFullYear() > 0) {
    return `${dateDay}/${dateMonth}/${inputTime.getFullYear()}`;
  } else if (inputDate.getTime() === today.getTime()) {
    return `${dateHour}:${dateMinute}`;
  } else {
    return `${dateDay}/${dateMonth}`;
  }
}

export function convertDateStringToDateAndTime(dateString) {
  const date = new Date(dateString);
  return `${regexZeroFormatTime(date.getDate())}/${regexZeroFormatTime(
    date.getMonth() + 1
  )}  ${regexZeroFormatTime(date.getHours())}:${regexZeroFormatTime(
    date.getMinutes()
  )}`;
}
