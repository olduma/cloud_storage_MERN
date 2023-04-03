export const isFolderNameValid = (name) => {
    const forbiddenChars = ['\\', '/', ':', '*', '?', '"', '<', '>', '|']; // List of forbidden characters
    return name.length <= 256 && !forbiddenChars.some(char => name.includes(char));
};
