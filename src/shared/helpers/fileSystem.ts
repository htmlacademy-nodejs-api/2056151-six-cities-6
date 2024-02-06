import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export function getCurrentModuleDIrectoryPath() {
  const filepath = fileURLToPath(import.meta.url);

  return dirname(filepath);
}
