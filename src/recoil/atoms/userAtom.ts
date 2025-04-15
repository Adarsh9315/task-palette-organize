
import { atom } from 'recoil';
import { User } from '@supabase/supabase-js';

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const isAuthLoadingState = atom<boolean>({
  key: 'isAuthLoadingState',
  default: true,
});
