import { useEffect } from "react";
import { logoutUser } from "../slices/authSlice";
import { useDispatch } from "react-redux";

// logout user component
const LogoutPage = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(logoutUser());
    }, [])

    return(
        <></>
    )
}

export default LogoutPage;