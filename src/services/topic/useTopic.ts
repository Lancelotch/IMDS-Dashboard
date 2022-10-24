import { useNavigate } from 'react-router';
import { useAppDispatch } from 'src/app/hooks';
import { useAlert } from 'src/hooks/useAlert';
import { IPayloadGetList } from 'src/models/general';
import {
 IPayloadAddTopic,
 IResponseAddTopic,
 IResponseTopicById,
 IResponseTopicList
} from 'src/models/topic';
import {
 reducerEditTopic,
 reducerUpdateAddTopic,
 reducerUpdateLoadingTopic,
 reducerUpdateTopicById,
 reducerUpdateTopicList
} from 'src/redux/topic';
import httpClient from '..';

export const useTopic = () => {
 const { handleClickAlert } = useAlert();
 const dispatch = useAppDispatch();
 const navigate = useNavigate();
 const addTopic = async (payload: IPayloadAddTopic) => {
  dispatch(reducerUpdateLoadingTopic(true));
  try {
   const response = await httpClient.post<IResponseAddTopic>(
    '/topic/create',
    payload
   );
   if (response.status === 200) {
    dispatch(reducerUpdateAddTopic(response.data.data));
    handleClickAlert({
     horizontal: 'center',
     vertical: 'top',
     message: 'Add topic has successfully',
     severity: 'success'
    });
   }
   dispatch(reducerUpdateLoadingTopic(false));
   navigate(window.location.pathname);
  } catch (e) {
   console.log(e);
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'Failed add Internal User',
    severity: 'error'
   });
   dispatch(reducerUpdateLoadingTopic(false));
  }
 };

 const deleteTopic = async (id: string) => {
  dispatch(reducerUpdateLoadingTopic(true));
  try {
   const response = await httpClient.put<IResponseAddTopic>(
    `/topic/delete/${id}`,
    {
     isActive: false
    }
   );
   if (response.status === 200) {
    dispatch(reducerEditTopic(response.data.data));
    handleClickAlert({
     horizontal: 'center',
     vertical: 'top',
     message: 'Delete topic has successfully',
     severity: 'success'
    });
   }
   dispatch(reducerUpdateLoadingTopic(false));
  } catch (e) {
   console.log(e);
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'Failed delete Internal User',
    severity: 'error'
   });
   dispatch(reducerUpdateLoadingTopic(false));
  }
 };

 const editTopic = async (id: string, payload: IPayloadAddTopic) => {
  dispatch(reducerUpdateLoadingTopic(true));
  try {
   const response = await httpClient.put<IResponseAddTopic>(
    `/topic/update/${id}`,
    payload
   );
   if (response.status === 200) {
    dispatch(reducerEditTopic(response.data.data));
    handleClickAlert({
     horizontal: 'center',
     vertical: 'top',
     message: 'Edit topic has successfully',
     severity: 'success'
    });
   }
   dispatch(reducerUpdateLoadingTopic(false));
   navigate(window.location.pathname);
  } catch (e) {
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'Failed edit Internal User',
    severity: 'error'
   });
   dispatch(reducerUpdateLoadingTopic(false));
  }
 };

 const getTopicList = async (params: IPayloadGetList) => {
  dispatch(reducerUpdateLoadingTopic(true));
  try {
   const response = await httpClient.get<IResponseTopicList>(
    '/topic/find_all',
    { params }
   );
   if (response.status === 200) {
    const topicList = response.data;
    dispatch(reducerUpdateTopicList({ ...topicList, loading: false }));
   }
   dispatch(reducerUpdateLoadingTopic(false));
  } catch (e) {
   dispatch(reducerUpdateLoadingTopic(false));
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'cannot get topic list',
    severity: 'error'
   });
  }
 };

 const getTopicById = async (id: string) => {
  dispatch(reducerUpdateLoadingTopic(true));
  try {
   const response = await httpClient.get<IResponseTopicById>(
    `/topic/find_by_topic_id/${id}`
   );
   if (response.status === 200) {
    const topic = response.data;
    dispatch(reducerUpdateTopicById(topic.data));
   }
   dispatch(reducerUpdateLoadingTopic(false));
  } catch (e) {
   dispatch(reducerUpdateLoadingTopic(false));
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'cannot get Topic by id',
    severity: 'error'
   });
   navigate(window.location.pathname);
  }
 };
 return { getTopicList, addTopic, editTopic, deleteTopic, getTopicById };
};
