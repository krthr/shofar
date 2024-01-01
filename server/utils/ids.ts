import type { H3Event } from "h3";

export function getIdParam(event: H3Event) {
  const id = getRouterParam(event, "id");

  if (typeof id === "undefined") return;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return;
  }

  return parsedId;
}
