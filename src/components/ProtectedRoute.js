import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProtectedRoute = ({ element: Component, allowedTypes, ...rest }) => {
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState(null);
    const [userType, setUserType] = React.useState(null);

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userRef = doc(db, 'users', currentUser.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setUserType(userDoc.data().type);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user && allowedTypes.includes(userType)) {
        return <Component {...rest} />;
    }

    return <Navigate to="/" />;
};

export default ProtectedRoute;
