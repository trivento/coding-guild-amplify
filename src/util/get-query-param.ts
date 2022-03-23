export const getQueryParam = (paramName: string) => {
    const queryParams = new URLSearchParams(window.location.search);
    const param = queryParams.get(paramName);
    return param ? param : '';
}
