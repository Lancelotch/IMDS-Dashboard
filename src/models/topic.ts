import { IResponseBody } from "./general";

export type TDataSource = 'data_source_mongo_1' | 'data_source_mongo_2' | 'data_source_mongo_3' | 'data_source_mongo_4';

export interface ITopic {
    id: string;
    topicId: string;
    topicName: string;
    dataSource:String;
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

  export interface IResponseTopicById extends IResponseBody<ITopic>{};
  export interface IResponseAddTopic extends IResponseBody<ITopic>{};
  
  export interface IPayloadAddTopic {
    topicName: string;
    dataSource:string;
  }
  