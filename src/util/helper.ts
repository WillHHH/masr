import { IFile } from "types/cms";

export function getIFileUrl(imageData: IFile): string {
  const sizes = imageData?.formats;
  if (!!sizes) {
    return (
      sizes.large?.url ||
      sizes.medium?.url ||
      sizes.small?.url ||
      sizes.thumbnail?.url ||
      imageData.url
    );
  } else {
    return imageData?.url || "";
  }
}

export function copyArray(amount: number, data: any) {
  const result = [];
  for (let index = 0; index < amount; index++) {
    result.push(data);
  }
  return result;
}

export const firstUpperCase = (str) => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
};

// Is a URL internal or to an outside site?
export const isAbsoluteUrl = (href: string) => {
  try {
    return !!new URL(href);
  } catch (e) {
    return false;
  }
};
export default isAbsoluteUrl;

export function getElemXY(elem) {
  let x = 0;
  let y = 0;
  if (elem.offsetParent) {
    do {
      x += elem.offsetLeft;
      y += elem.offsetTop;
      elem = elem.offsetParent;
    } while (elem);
  }
  return { x, y };
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle(array) {
  let i = array.length;
  let j = 0;
  let temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));

    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
