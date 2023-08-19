import type { Session } from '@auth0/nextjs-auth0';
import { atom } from 'jotai';

export const sessionAtom = atom<Session | null>(null);
