import { PAGINATION } from "@/lib/constants";
import { parseAsInteger, parseAsString } from "nuqs/server";

export const csParams = {
    page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
    pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),
    search: parseAsString
    .withDefault("")
    .withOptions({ clearOnDefault: true }),
    locale: parseAsString.withDefault("en"),
};
