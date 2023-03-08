
export const renameObjectKeys = (obj: any): any => {
    if (obj === null) return null;
    if (typeof obj !== "object") return obj;

    if (Array.isArray(obj)) {
        return obj.map((elemento: any) => renameObjectKeys(elemento));
      }

    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        const camelCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
        result[camelCaseKey] = value !== null ? renameObjectKeys(value) : null;
    }
    return result;
}

