import {encrypt, decrypt} from "n-krypta";

export interface IUser {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    token: string;
    isLogin: boolean;
    image?: string;
}

export const sleep = async (duration: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("ok");
        }, duration);
    });
}

export const parseDateTime = (date: string) => {
    let newDate = new Date(date);
    let years: any = newDate.getFullYear();
    let months: any = newDate.getMonth();
    let dates: any = newDate.getDate();
    let hours: any = newDate.getHours();
    let minutes: any = newDate.getMinutes();
    if(months < 10) months = `0${months}`;
    if(dates < 10) months = `0${dates}`;
    if(hours < 10) hours = `0${hours}`;
    if(minutes < 10) minutes = `0${minutes}`;
    return `${dates}/${months}/${years} ${hours}:${minutes}`
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

export const setCacheStorage = async (name: string, path: string, data: any) => {
    let url = `${process.env.REACT_APP_HOST_URL}/${path}`;
    data =  new Response(JSON.stringify(data));
    if("caches" in window){
        caches.open(name).then((caches) => caches.put(url, data));
    }
}

export const getCacheStorage = (name: string, path: string) => {
    return new Promise(async (resolve, reject) => {
        const url = `${process.env.REACT_APP_HOST_URL}/${path}`;
        const items = await caches.open(name);
        const response = await items.match(url);
        if(response) return resolve(response.json());
        await deleteCacheStorage([`${name}`]);
        resolve(null);
    });
}

export const deleteCacheStorage = async (name: string[]) => {
    for (let i = 0; i < name.length; i++) {
        await caches.delete(name[i]);
    }
    return "Ok";
}