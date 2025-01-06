export function priceParserToString(price: number): string {
  if (!price || price === 0) {
    return "0.00";
  } else {
    return price.toFixed(2);
  }
}

export function priceParserToInt(price: string): number {
  if (!price || price === "0.00") {
    return 0;
  } else {
    return parseFloat(price);
  }
}

export function priceParser(price: string): string {
  if (!price || price === "0.00") {
    return "0.00";
  } else {
    return parseFloat(price).toFixed(2);
  }
}

export function nameParser(name: string, uppercase?: boolean) {
  if (!!name) {
    if (uppercase) {
      return name.toUpperCase();
    } else {
      const nameArray = name.split(" ");
      const parsedName = nameArray.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });
      return parsedName.join(" ");
    }
  }
  return "";
}
