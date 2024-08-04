
/**
 * Loads the avatar image file based on the provided file name and size.
 * @param {string} fileName - The file name of the avatar image.
 * @param {string} size - The size of the avatar image ("L" for large or "S" for small).
 * @returns {string} - The path to the avatar image file.
 * @throws {Error} - Throws an error if the size parameter is invalid.
 * */
const loadAvatar = (fileName: string, size: string): string => {
  let folderName: string;
  if (size === "L") {
    folderName = "150px";
  } else if (size === "S") {
    folderName = "40px";
  } else {
    throw new Error("Invalid image size");
  }

  return `/${folderName}/${fileName}.png`;
};


/**
 * An array of available avatar names.
 * @type {string[]}
 * */
const avatarList: string[] = ["bed-bug", "book", "centipede", "chickadee", "cockroach",
  "goose",
  "hoopoe",
  "hourglass",
  "ibis",
  "lyre",
  "pelican",
  "powderpost-beetle",
  "rhinoceros-beetle",
  "scroll",
  "search",
  "ship-wheel",
  "skull",
  "spoonbill",
  "stag-beetle",
  "telephone",
  "tick"]

export { loadAvatar, avatarList }


