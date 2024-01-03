import type { H3Event } from "h3";

export const PER_PAGE = 10;

export function getPagination(event: H3Event, limit = PER_PAGE) {
  const query = getQuery(event);

  let page = 1;

  if (typeof query.page === "string") {
    page = parseInt(query.page);

    if (isNaN(page) || page <= 0) {
      page = 1;
    }
  }

  const offset = (page - 1) * limit;

  const nextPage = page + 1;
  const meta = { page, nextPage, perPage: limit };

  return { limit, offset, meta };
}
