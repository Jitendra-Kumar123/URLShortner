import { redirect } from "@tanstack/react-router";

export const checkAuth = async ({context}) =>{
    try{
        const {queryClient, store} = context
        const user = await queryClient.ensureQueryData({
            queryKey: ['currentUser'],
            queryFn: get_current_user,
        });

        if(!user) return false;
        store.dispatch(loginSuccess({user, token: null}));
        const {isAuthenticated} = store.getState().auth;
        if(!isAuthenticated) return false;
        return true; 
    }catch(err){
      return redirect({to: "/auth"})
    }
}