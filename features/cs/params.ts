import { parseAsString } from "nuqs/server";

export const csParams = {
    locale: parseAsString.withDefault("en"),
};
