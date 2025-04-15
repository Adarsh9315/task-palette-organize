
import { atom } from 'recoil';

export type DbConfig = {
  dbType: "postgresql" | "mongodb" | "mysql";
  host: string;
  port: string;
  dbName: string;
  username: string;
  password: string;
};

export const dbConfigState = atom<DbConfig | null>({
  key: 'dbConfigState',
  default: null,
});
