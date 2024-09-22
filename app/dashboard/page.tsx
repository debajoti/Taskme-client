"use client"
import KanbanBoard from '@/components/KanbanBoard';
import ListView from '@/components/ListView';
import { AuthContext } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';

const Page = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useContext(AuthContext);
    const [view, setView] = useState<'kanban' | 'list'>('kanban');
    
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!isAuthenticated) {
        router.push('/sign-in');
    }

    const toggleView = () => {
        setView(prevView => (prevView === 'kanban' ? 'list' : 'kanban'));
    };

    return (
        <div>
            <div className="text-center mb-10">
                <button
                    onClick={toggleView}
                    className="px-4 py-2 mt-8 bg-blue-500 text-white rounded"
                >
                    Switch to {view === 'kanban' ? 'List View' : 'Kanban View'}
                </button>
            </div>
            {view === 'kanban' ? (<div className='w-full text-center mx-auto'><KanbanBoard /></div>) : <ListView />}
        </div>
    );
}

export default Page;
