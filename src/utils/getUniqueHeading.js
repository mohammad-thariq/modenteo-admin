export function getUniqueNames(routes) {
    const uniqueHeadings = {};
    const result = [];

    routes.forEach(route => {
        if (!uniqueHeadings[route.heading]) {
            uniqueHeadings[route.heading] = true;
            result.push({ heading: route.heading });
        }
    });

    return result;
}