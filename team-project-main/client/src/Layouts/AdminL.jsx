import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function AdminL() {
    const user = useSelector((state) => state.Auth.user);
    const loading = useSelector((state) => state.Auth.loading); 
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        if (!user || user.role !== "admin") {
            navigate('/login');
        }
    }, [user, loading, navigate]); 

    return (
        <>
            <Outlet />
        </>
    );
}
