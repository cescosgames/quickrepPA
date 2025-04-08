import { atom } from "jotai";

// tracking if we are on our result or question screen
export const isResult = atom(true);

export const inLoadingState = atom(false);

export const isValidSearch = atom(false);