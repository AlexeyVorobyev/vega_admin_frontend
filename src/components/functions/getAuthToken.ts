interface IGetTokensReturnValue {
    authorization:string | null,
}
export const getTokens = ():IGetTokensReturnValue => {
    return {
        authorization: localStorage.getItem('authorization')
    }
}