import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'

export const favouritesAtom = atomWithStorage<number[]>("favourites",[]);
export const searchAtom = atom("");
export const pageAtom = atom(1);