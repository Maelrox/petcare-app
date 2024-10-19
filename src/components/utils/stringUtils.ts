export function camelCaseToCapitalizedWithSpace(str: string): string {
    // Add space before capital letters and capitalize the first letter
    const result = str.replace(/([A-Z])/g, ' $1').trim();
    return result.charAt(0).toUpperCase() + result.slice(1);
}