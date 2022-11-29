export interface IDataDevice {
    count: number;
    data: {
        createdAt: string;
        key: string;
        data: any;
    }[];
}