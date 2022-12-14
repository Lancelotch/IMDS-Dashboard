import { IResponseBody } from './general';

export interface IWidget {
 id: number;
 widgetId: string;
 widgetName: string;
 createdAt: Date;
 createdBy: string;
 updatedAt: null | string;
 updatedBy: null | string;
 topic: string;
 isActive: number;
}

export interface IResponseWidgetList extends IResponseBody<Array<IWidget>> {
 totalPages: number;
 totalRow: number;
}

export interface IResponseWidgetById extends IResponseBody<IWidget> {}
export interface IResponseAddWidget extends IResponseBody<IWidget> {}

export interface IPayloadAddWidget {
 widgetName: string;
}
