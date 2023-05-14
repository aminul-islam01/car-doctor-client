import { Link, useRouteError } from 'react-router-dom';
import errImg from '../../assets/err.png'
const Error = () => {
    const error = useRouteError();
    return (
        <div className='flex items-center justify-center h-[490px] mt-5'>
            <div className='w-1/2 text-center'>
                <img className='inline-block' src={errImg} />
                <p className='text-red-500 text-2xl mb-5'>{error.error.message}</p>
                <Link to='/'>
                    <button className="btn btn-primary">back to home</button>
                </Link>
            </div>
        </div>
    );
};

export default Error;