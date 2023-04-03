/**
 * Converts a size value in bytes to a human-readable format.
 *
 * @param {number} size - The size value in bytes.
 * @returns {string} The size value converted to kilobytes, megabytes, gigabytes, or left in bytes if smaller.
 */
const convertSize = (size) => {
    const gigabyte = 1024 * 1024 * 1024;
    const megabyte = 1024 * 1024;
    const kilobyte = 1024;

    if (size >= gigabyte) {
        return `${(size / gigabyte).toFixed(2)} Gb`;
    }

    if (size >= megabyte) {
        return `${(size / megabyte).toFixed(2)} Mb`;
    }

    if (size >= kilobyte) {
        return `${(size / kilobyte).toFixed(2)} Kb`;
    }

    return `${size} b`;
};

export default convertSize;
