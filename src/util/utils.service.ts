const isObject = (obj: any[] | any): boolean => {
  return (
    obj === Object(obj) &&
    obj instanceof Date === false &&
    !Array.isArray(obj) &&
    typeof obj !== "function"
  );
};
const toCamel = (str: string): string => {
  return str.replace(/_([a-z1-3])/g, (word: string) => word[1].toUpperCase());
};

export const convertKeysToCamelCase = (obj: any[] | any): any[] | any => {
  if (isObject(obj)) {
    const newObj: any = {};

    Object.keys(obj).forEach((key) => {
      newObj[toCamel(key)] = convertKeysToCamelCase(obj[key]);
    });

    return newObj;
  } else if (Array.isArray(obj)) {
    return obj.map((i) => convertKeysToCamelCase(i));
  }

  return obj;
};
