import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";
import LoadingPage from "./LoadingPage";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [response, setResponse] = useState(null);
  const token = searchParams.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("hello");
    if (token) {
      axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/authentication/verify-email?token=${token}`)
        .then(res => {
          setResponse(res.data)
          
        })
        .catch(err => setResponse("Email Verification failed"));
    } else {
      navigate("/")
    }
  }, [token]);

  if(response)
    return (
    <div className="flex justify-center items-center min-h-[80vh]">
        <p className="text-white">
          {response}
        </p>
    </div>
  )
    
  return <LoadingPage />;

  
};

export default VerifyEmailPage;
