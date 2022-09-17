import { useAppDispatch } from "src/app/hooks";
import { useAlert } from "src/hooks/useAlert";
import { IPayloadAddInternalUser, IPayloadEditInternalUser, IPayloadGetList, IResponseAddInternalUser, IResponseInternalUserList } from "src/models/general";
import { reducerEditInternalUser, reducerUpdateAddInternalUser, reducerUpdateInternalUserList, reducerUpdateLoadingInternalUser } from "src/redux/internalUser";
import httpClient from "..";

export const useInternalUser = ()=> {
    const { handleClickAlert } = useAlert();
    const dispatch = useAppDispatch();

    const addInternalUser =async (payload:IPayloadAddInternalUser) => {
        dispatch(reducerUpdateLoadingInternalUser(true));
        try {
            const response = await httpClient.post<IResponseAddInternalUser>(
              '/internal_user/create',
              payload
            );
            if (response.status === 201) {
              dispatch(reducerUpdateAddInternalUser(response.data.data));
              
            }
            dispatch(reducerUpdateLoadingInternalUser(false));
          } catch (e) {
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Failed add Internal User',
                severity: 'error'
              });
              dispatch(reducerUpdateLoadingInternalUser(false));
          }
    }
    
    const deleteInternalUser =async (id:string) => {
        dispatch(reducerUpdateLoadingInternalUser(true));
        try {
            const response = await httpClient.put<IResponseAddInternalUser>(
              `/internal_user/delete/${id}`,
              {
                isActive: false
              }
            );
            if (response.status === 201) {
              dispatch(reducerEditInternalUser(response.data.data));
              
            }
            dispatch(reducerUpdateLoadingInternalUser(false));
          } catch (e) {
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Failed delete Internal User',
                severity: 'error'
              });
              dispatch(reducerUpdateLoadingInternalUser(false));
          }
    }
    
    const editInternalUser =async (id:string, payload: IPayloadEditInternalUser) => {
        dispatch(reducerUpdateLoadingInternalUser(true));
        try {
            const response = await httpClient.put<IResponseAddInternalUser>(
              `/internal_user/update/${id}`,payload
            );
            if (response.status === 201) {
              dispatch(reducerEditInternalUser(response.data.data));
              
            }
            dispatch(reducerUpdateLoadingInternalUser(false));
          } catch (e) {
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Failed edit Internal User',
                severity: 'error'
              });
              dispatch(reducerUpdateLoadingInternalUser(false));
          }
    }

    const getInternalUserList = async (params: IPayloadGetList) => {
        dispatch(reducerUpdateLoadingInternalUser(true));
        try{
            const response = await httpClient.get<IResponseInternalUserList>('/internal_user/find_all', {params});
            if(response.status === 200){
                const list = response.data;
                dispatch(reducerUpdateInternalUserList(list));
            }
            dispatch(reducerUpdateLoadingInternalUser(false));
            
        }catch(e){
            console.log(e);
            dispatch(reducerUpdateLoadingInternalUser(false));
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Failed get internal user list',
                severity: 'error'
              });
        }
         
    }
    return { addInternalUser, editInternalUser, deleteInternalUser, getInternalUserList };
}