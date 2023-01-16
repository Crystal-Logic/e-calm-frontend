import { nanoid } from 'nanoid';

let buildId = 0;

export const getBuildId = () => {
  if (!buildId) {
    buildId = nanoid();
  }
  return buildId;
};
