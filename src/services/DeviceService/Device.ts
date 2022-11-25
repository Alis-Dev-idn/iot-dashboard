export interface IDataDevice {
    count: number;
    data: {
        createdAt: string;
        name: string;
        data: any;
    }[];
}