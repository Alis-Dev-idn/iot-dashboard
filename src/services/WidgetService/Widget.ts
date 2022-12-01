export interface IWidgetResponse {
    count: number;
    data: IWidget[];
}

export interface IWidget {
    application: string;
    data: string;
    device: string;
    widget_type: string;
}