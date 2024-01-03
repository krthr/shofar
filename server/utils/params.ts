import type { H3Event } from "h3";

export function getNumericParam(event: H3Event, paramName: string) {
  const param = getRouterParam(event, paramName);

  if (typeof param !== "string") return;

  const parsedParam = parseInt(param);
  if (isNaN(parsedParam)) {
    return;
  }

  return parsedParam;
}

export function getNumericQuery(event: H3Event, name: string) {
  const query = getQuery(event);
  const param = query[name];

  if (typeof param !== "string") return;

  const parsedParam = parseInt(param);
  if (isNaN(parsedParam)) {
    return;
  }

  return parsedParam;
}
