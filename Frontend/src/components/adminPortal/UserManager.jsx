import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal'; // Assuming this component exists and is styled separately

const RoleBadge = ({ role }) => {
    const colorClasses = {
        // Updated to use hex codes for primary color
        admin: 'bg-[#F97316]/20 text-[#F97316]',
        // Kept original grays as they are not part of the main theme object
        user: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };

    return (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${colorClasses[role] || ''}`}>
            {role}
        </span>
    );
};

const UserManager = () => {
    const navigate = useNavigate();
    const { data } = useOutletContext();
    const [users, setUsers] = useState(data.users);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const openDeleteModal = (userId) => {
        setUserToDelete(userId);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setUserToDelete(null);
        setIsModalOpen(false);
    };

    const handleDeleteUser = () => {
        if (!userToDelete) return;
        setUsers(users.filter(u => u.id !== userToDelete));
        closeDeleteModal();
    };

    return (
        <>
            <div className="bg-[#FFFFFF] dark:bg-[#1E293B] p-6 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-md">
                <div className="flex justify-between items-center mb-6">
                    {/* Text color is inherited, defaulting to light.text and dark.text */}
                    <h2 className="text-xl font-bold">User Directory</h2>
                    <button
                        onClick={() => navigate('create-user')}
                        className="flex items-center space-x-2 bg-[#F97316] hover:bg-[#FB923C] text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        <PlusCircle size={20} />
                        <span>Add New User</span>
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-[#0F172A] dark:text-[#F8FAFC]">
                        <thead className="text-xs uppercase bg-[#F1F5F9] dark:bg-[#0F172A] text-[#64748B] dark:text-[#94A3B8] tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">User</th>
                                <th className="px-6 py-4 font-semibold">Role</th>
                                <th className="px-6 py-4 font-semibold">Joined Date</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b border-[#E2E8F0] dark:border-[#334155] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A]/50 transition-colors duration-200">
                                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                                        <div className="flex items-center space-x-3">
                                            <img src={user.profileImageUrl || "https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg"} alt={user.username} className="w-8 h-8 rounded-full" />
                                            <span>{user.emailId}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <RoleBadge role={user.role} />
                                    </td>
                                    <td className="px-6 py-4">{user.createdAt.split("T")[0]}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => navigate(`edit/${user._id}`)}
                                            className="p-2 rounded-md text-[#64748B] hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(user._id)}
                                            className="p-2 rounded-md text-[#64748B] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteUser}
                title="Delete User"
                message="Are you sure you want to delete this user? This will permanently remove their account."
            />
        </>
    );
};

export default UserManager;