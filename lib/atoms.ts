import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type AlcoholFilter = "all" | "alcoholic" | "non-alcoholic";

export const favouritesAtom = atomWithStorage<number[]>("favourites", []);
export const searchAtom = atom("");
export const alcoholFilterAtom = atom<AlcoholFilter>("all");
export const pageAtom = atom(1);
