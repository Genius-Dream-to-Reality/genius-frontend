import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Callback = () =>{

    const navigate = useNavigate();
    const location = useLocation();
    const apiURL = process.env.REACT_APP_AUTH_API_URL + "/auth/vendor/oauth2/callback"
    const userType = "vendor"

    useEffect(()=> {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');

        if(code){
            axios.get(apiURL+`?code=${code}`)
            .then(response => {
                //console.log("Backend response for oauth2: ",response.data);

                const oauthData = response.data;

                 navigate("/register", {
                    state: {
                      userType,
                      from: "callback",
                      oauthData, 
                    },
                  });


            })
            .catch(error => {
                console.error("Error during the callback: ",error);
                navigate("/register", { state: { userType } });
            })
        }else{
            console.log("The code is empty!");
            navigate("/register", { state: { userType } });
        }
    }, [location, navigate])

    return(
        <Typography>
            Loading....
        </Typography>
    )

} 

export default Callback;