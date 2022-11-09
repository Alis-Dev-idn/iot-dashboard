import {encrypt, decrypt} from "n-krypta";

export interface IUser {
    name: string;
    email: string;
    role: string;
    isLogin: boolean;
    token: string;
}

export const generateEncrypt = (data: any): string => {
    const encryptData = window.btoa(JSON.stringify(data));
    return encrypt(encryptData, `${process.env.REACT_APP_SECRET_KEY}`);
}

export const decryptData = (data: any): string => {
    const decrypt_data = window.btoa(JSON.stringify(data));
    return decrypt(decrypt_data, `${process.env.REACT_APP_SECRET_KEY}`)
}