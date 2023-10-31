export const varsBehaviourMapUniversities = (initialVars: any) => {
    return {
        ...{page:initialVars.page ? Number(initialVars.page) : undefined},
        ...{perPage:initialVars.perPage ? Number(initialVars.perPage) : undefined}
    }
}