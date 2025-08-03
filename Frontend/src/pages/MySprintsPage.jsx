import React, { useEffect, useState } from 'react';
import { SprintCard } from '../components';
import axiosClient from '../config/axios';
import LoadingPage from './LoadingPage';
import { Outlet, useParams } from 'react-router';
import { mapSprints } from '../utils/heplerFunctions';

const MySprintsPage = () => {
  const [sprints, setSprints] = useState(null);
  const [loading, setLoading] = useState(true);
  const { sprintName } = useParams();

  useEffect(() => {
    const fetchSprints = async () => {
      try {

        const { data } = await axiosClient.get("/profile/my-sprints");
        console.log(data)
        const mappedSprints = mapSprints(data.bookmarks, data.checkedProblems);
        setSprints(mappedSprints);
        setLoading(false);

      } catch(error) {
        console.log(error);
      }
    }
    fetchSprints();
  }, []);


  if(loading || !sprints) return <LoadingPage />;

  if(!sprintName)
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-15 font-sans'>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#3b4655] dark:text-white">My Sprints</h1>
            <p className="text-lg text-[#475569] dark:text-[#94a3b8] mt-2">
              Organize your bookmarked problems into public or private collections.
            </p>
          </div>
          {/* <button className="bg-[#f97316] text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
            Create Sprint
          </button> */}
        </div>

        <div className="mt-10">
          {sprints.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {sprints.map((sprint) => (
                <SprintCard
                  key={sprint.createdAt}
                  sprint={sprint}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[#475569] dark:text-[#94a3b8]">
                You haven't created any sprints yet.
              </p>
            </div>
          )}
        </div>
      </div>
  );

  return <Outlet context={{ sprints }}/>;
};

export default MySprintsPage;
