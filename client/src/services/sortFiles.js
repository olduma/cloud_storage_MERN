/**
 * Sorts an array of files by the specified property and direction.
 *
 * @param {Array} data - The array of files to sort.
 * @param {string} type - The property to sort by (name, date, size, or type).
 * @param {boolean} direction - The direction of the sort (true or false).
 * @returns {Array} The sorted array of files.
 */
function sortFiles(data, type, direction) {
    const sortedFiles = [...data];

    sortedFiles.sort((a, b) => {
        let sortOrder = direction ? -1 : 1;

        switch (type) {
            case "name":
                return sortOrder * a.name.localeCompare(b.name);
            case "date":
                return sortOrder * (new Date(b.date) - new Date(a.date));
            case "size":
                return sortOrder * (a.size - b.size);
            case "type":
                return sortOrder * a.type.localeCompare(b.type);
            default:
                throw new Error(`Invalid type: ${type}`);
        }
    });

    return sortedFiles;
}

export default sortFiles;

