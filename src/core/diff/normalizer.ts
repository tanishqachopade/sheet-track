export function normalizeValue(value: unknown) {

  if(value === null || value === undefined) {
    return "";
  }


  if(typeof value === "string") {


    const trimmed = value.trim();


    // number string
    if(trimmed !== "" && !isNaN(Number(trimmed))) {
      return Number(trimmed);
    }


    // date string
    const date = Date.parse(trimmed);

    if(!isNaN(date)) {
      return new Date(date).toISOString();
    }


    return trimmed;

  }


  if(value instanceof Date) {
    return value.toISOString();
  }


  return value;
}