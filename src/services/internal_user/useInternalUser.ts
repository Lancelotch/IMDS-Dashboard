import { useAppDispatch } from "src/app/hooks";
import { useAlert } from "src/hooks/useAlert";
import { IPayloadGetList, IResponseRoleList } from "src/models/general"
import { reducerUpdateLoadingRoleList, reducerUpdateRoleList } from "src/redux/role";
import httpClient from "..";

export const useInternalUser = ()=> {
    const { handleClickAlert } = useAlert();
    const dispatch = useAppDispatch();

    const getInternalUserList = async (params: IPayloadGetList) => {
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
    return { getInternalUserList };
}