import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";
import type { Terminal } from "$lib/server/models.js";

const API_URL = env.API_URL;

export const ssr = false;