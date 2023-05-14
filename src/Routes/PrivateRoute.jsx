import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../pages/Shared/LoadingSpnnier/LoadingSpinner';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if(user?.email){
        return children;
    }

    return <Navigate to="/login" state={{form: location}} replace></Navigate>;
};

export default PrivateRoute;