export const APP_URL = import.meta.env.DEV
    ? "http://localhost:5173"
    : "https://snipit.mfazail.com";


export const getToken = (accessToken: string) => {
    const bStr = accessToken.replace(/^Bearer\s+/g, "");
    const [header, payload, signature] = bStr.split(".");

    const hStrip = header.replace(/(%..)/g, "");
    const sStrip = signature.replace(/%[^%]*/g, "");

    return `${hStrip}.${payload}.${sStrip}`;
};
