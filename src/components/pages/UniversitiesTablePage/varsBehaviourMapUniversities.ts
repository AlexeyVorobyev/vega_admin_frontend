export const varsBehaviourMapUniversities = (initialVars: any) => {
    return {
        page: initialVars.page ? Number(initialVars.page) : undefined,
        size: initialVars.perPage ? Number(initialVars.perPage) : undefined
    }
}