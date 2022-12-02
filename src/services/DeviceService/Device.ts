export interface IDataDevice {
    count: number;
    data: {
        createdAt: string;
        key: string;
        data: any;
    }[];
}

export interface IDeviceOptions {
    data: {
        label: string,
        value: string
    }[]
}