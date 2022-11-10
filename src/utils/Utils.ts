import {encrypt, decrypt} from "n-krypta";

export interface IUser {
    username: string,
    email: string,
    role: string,
    token: string
    isLogin: boolean;
}

export const sleep = async (duration: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("ok");
        }, duration);
    });
}

export const generateEncrypt = (data: any): string => {
    const encryptData = window.btoa(JSON.stringify(data));
    return encrypt(encryptData, `${process.env.REACT_APP_SECRET_KEY}`);
}

export const decryptData = (data: any): any => {
    const decrypt_data  = decrypt(data, `${process.env.REACT_APP_SECRET_KEY}`);
    const result = window.atob(decrypt_data);
    return JSON.parse(result);
}