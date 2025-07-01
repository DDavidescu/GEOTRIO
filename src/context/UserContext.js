import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
export const UserContext = createContext({
    user: null,
    loading: true,
});
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
            setLoading(false);
        };
        getUser();
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);
    return (_jsx(UserContext.Provider, { value: { user, loading }, children: children }));
};
export const useUser = () => useContext(UserContext);
