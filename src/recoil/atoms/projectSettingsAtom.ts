
import { atom } from 'recoil';

export type ProjectSettings = {
  projectName: string;
  description?: string;
};

export const projectSettingsState = atom<ProjectSettings | null>({
  key: 'projectSettingsState',
  default: null,
});
