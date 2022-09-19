import { IResponseBody } from "./general";

export interface ITopic {
    id: string;
    topicId: string;
    topicName: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date | null;
    updatedBy: string | null;
    isActive: number;
  }

  export interface IResponseTopicList extends IResponseBody<Array<ITopic>>{
    totalPages: number;
    totalRow: number;
  }

  export interface IResponseAddTopic extends IResponseBody<ITopic>{};
  
  export interface IPayloadAddTopic {
    topicName: string;
  }
  