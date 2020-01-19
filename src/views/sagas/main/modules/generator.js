/**
 * Returns the path from the root directory to the parent hierarchy
 * If the argument current is 0, that is, the root directory, return an empty string
 * @param {string} workdir
 * @param {string or number} current
 */
export function* rebuildWorkdir(workdir, current) {
  const dirs = workdir.split("/");
  const dirlist = dirs.filter((dir, index) => {
    if (index < Number(current)) {
      return dir;
    }
  });
  return dirlist.join("/");
}

/**
 * Returns the structure from the root directory to the parent hierarchy
 * @param {map} structure
 * @param {string or number} current
 */
export function* rebuildStructure(structure, current) {
  const newStructure = new Map();
  structure.forEach((value, index) => {
    if (index <= Number(current)) {
      newStructure.set(index, value);
    }
  });
  return newStructure;
}
