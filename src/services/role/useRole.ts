import { useAppDispatch } from "src/app/hooks";
import { useAlert } from "src/hooks/useAlert";
import { IPayloadGetList} from "src/models/general"
import { IPayloadAddRole, IResponseAddRole, IResponseRoleList } from "src/models/role";
import { reducerEditRole, reducerUpdateAddRole, reducerUpdateLoadingRole, reducerUpdateRoleList } from "src/redux/role";
import httpClient from "..";

export const useRole = ()=> {
    const { handleClickAlert } = useAlert();
    const dispatch = useAppDispatch();

    const addRole =async (payload:IPayloadAddRole) => {
        dispatch(reducerUpdateLoadingRole(true));
        try {
            const response = await httpClient.post<IResponseAddRole>(
              '/role/create',
              payload
            );
            if (response.status === 201) {
              dispatch(reducerUpdateAddRole(response.data.data));
              handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Add role has successfully',
                severity: 'success'
              });
            }
            dispatch(reducerUpdateLoadingRole(false));
          } catch (e) {
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Failed add Internal User',
                severity: 'error'
              });
              dispatch(reducerUpdateLoadingRole(false));
          }
    }
    
    const deleteRole =async (id:string) => {
        dispatch(reducerUpdateLoadingRole(true));
        try {
            const response = await httpClient.put<IResponseAddRole>(
              `/role/delete/${id}`,
              {
                isActive: false
              }
            );
            if (response.status === 201) {
              dispatch(reducerEditRole(response.data.data));
              handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Delete role has successfully',
                severity: 'success'
              });
            }
            dispatch(reducerUpdateLoadingRole(false));
          } catch (e) {
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Failed delete Internal User',
                severity: 'error'
              });
              dispatch(reducerUpdateLoadingRole(false));
          }
    }
    
    const editRole =async (id:string, payload: IPayloadAddRole) => {
        dispatch(reducerUpdateLoadingRole(true));
        try {
            const response = await httpClient.put<IResponseAddRole>(
              `/role/update/${id}`,payload
            );
            if (response.status === 201) {
              dispatch(reducerEditRole(response.data.data));
              handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Edit role has successfully',
                severity: 'success'
              });
            }
            dispatch(reducerUpdateLoadingRole(false));
          } catch (e) {
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Failed edit Internal User',
                severity: 'error'
              });
              dispatch(reducerUpdateLoadingRole(false));
          }
    }

    const getRoleList = async (params: IPayloadGetList) => {
        dispatch(reducerUpdateLoadingRole(true));
        try{
            const response = await httpClient.get<IResponseRoleList>('/role/find_all', {params});
            if(response.status === 200){
                const roleList = response.data;
                dispatch(reducerUpdateRoleList({...roleList, loading: false}));
            }
            dispatch(reducerUpdateLoadingRole(false));
            
        }catch(e){
            dispatch(reducerUpdateLoadingRole(false));
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'cannot get role list',
                severity: 'error'
              });
        }
         
    }
    return { getRoleList, addRole, editRole, deleteRole };
}