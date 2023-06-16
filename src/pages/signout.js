import React , {useEffect} from "react";

const Logout = () => {

    useEffect(() => {
        localStorage.removeItem('user');
    },[])


    return (
        <>
            
        </>
    )
}

export default Logout;