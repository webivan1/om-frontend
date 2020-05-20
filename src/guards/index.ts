export function isHtmlInputElement(element: unknown): element is HTMLInputElement {
  return element instanceof HTMLInputElement;
}

export function isHtmlDivElement(element: unknown): element is HTMLDivElement {
  return element instanceof HTMLDivElement;
}

export function isString(str: unknown): str is string {
  return typeof str === 'string';
}