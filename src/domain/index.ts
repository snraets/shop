
const domainFinder = /(?<=https:\/\/).*(?=\.com)/

export const getDomain = (url: string) => {

    const results = url.match(domainFinder);

    if (results && results.length > 0) {
        return results[0];
    } else {
        return '';
    }
};