import { useAppDispatch } from "src/app/hooks";
import { useAlert } from "src/hooks/useAlert";
import { IPayloadGetList, IResponseRoleList, IPayloadAddRole, IResponseAddRole } from "src/models/general"
import { reducerUpdateAddRole, reducerUpdateLoadingRoleList, reducerUpdateRoleList } from "src/redux/role";
import httpClient from "..";

export const useRole = ()=> {
    const { handleClickAlert } = useAlert();
    const dispatch = useAppDispatch();

    const addRole = async (payload: IPayloadAddRole) => {
        try{
            const response = await httpClient.post<IResponseAddRole>('/role/create', payload);
            if(response.status === 200){
                dispatch(reducerUpdateAddRole(response.data.data));
            }
            
        }catch(e){
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'cannot add role',
                severity: 'error'
              });
        }
         
    }

    const getRoleList = async (params: IPayloadGetList) => {
        dispatch(reducerUpdateLoadingRoleList(true));
        try{
            const response = await httpClient.get<IResponseRoleList>('/role/find_all', {params});
            if(response.status === 200){
                const roleList = response.data;
                dispatch(reducerUpdateRoleList({...roleList, loading: false}));
            }
            
        }catch(e){
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'cannot get role list',
                severity: 'error'
              });
        }
         
    }
    return { addRole, getRoleList };
}