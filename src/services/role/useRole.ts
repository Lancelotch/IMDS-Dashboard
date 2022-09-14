import { useAppDispatch } from "src/app/hooks";
import { useAlert } from "src/hooks/useAlert";
import { IPayloadGetList, IResponseBody, IRole } from "src/models/general"
import { reducerUpdateRoleList } from "src/redux/role";
import httpClient from "..";

export const useRole = ()=> {
    const { handleClickAlert } = useAlert();
    const dispatch = useAppDispatch();
    const getRoleList = async (params: IPayloadGetList) => {
        try{
            const response = await httpClient.get<IResponseBody<Array<IRole>>>('/role/find_all', {params});
            if(response.status === 200){
                const roleList = response.data.data;
                dispatch(reducerUpdateRoleList(roleList));
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
    return {getRoleList};
}