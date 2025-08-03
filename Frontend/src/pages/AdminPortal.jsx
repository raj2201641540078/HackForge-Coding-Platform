import Sidebar from '../components/adminPortal/Sidebar';
import Header from '../components/adminPortal/Header';
import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';
import axiosClient from '../config/axios';
import LoadingPage from './LoadingPage';


const AdminPortal = ({darkTheme, handleThemeChange}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlatformData = async () => {
      try {
        const { data } = await axiosClient.get("/admin/platform-data");
        setData(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPlatformData();
  }, []);

  if(loading || !data ) return <LoadingPage />
  return (
    <div className="flex h-screen bg-[#F1F5F9] dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC]">
    <Sidebar />
    <main className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-transparent to-[#E2E8F0]/20 dark:to-[#334155]/20">
        <Header darkTheme={darkTheme} handleThemeChange={handleThemeChange} />
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <Outlet context={{ data, setData }}/>
        </div>
    </main>
    </div>
  );
};

export default AdminPortal;
