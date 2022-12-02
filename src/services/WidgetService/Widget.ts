export interface IWidgetResponse {
    count: number;
    data: IWidget[];
}

export interface IWidget {
    application: string;
    data: string;
    device: string;
    widget_type: string;
    graph?: {
        xAxis: number,
        yAxis: number
    }[]
}

export interface IWidgetGraph {
    count: number;
    data: {
        xAxis: number,
        yAxis: number
    }[];
}