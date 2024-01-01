import type { H3Event } from "h3";

export function getPagination(event: H3Event) {
  const query = getQuery(event);

  if (!query.page) {
    return {};
  }

  if (typeof query.page !== "string") {
    return {};
  }

  const page = parseInt(query.page);
  if (isNaN(page)) {
    return {};
  }

  return { page };
}
