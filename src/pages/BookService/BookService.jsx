import { useContext } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom';
import useScrollTop from '../../hooks/useScrollTop';
import image from '../../assets/images/checkout/checkout.png'
import useTitle from '../../hooks/useTitle';

const BookService = () => {
    useTitle('Book-service');
    const { pathname } = useLocation();
    useScrollTop(pathname);

    const service = useLoaderData();
    const { title, _id, price, img } = service;
    const { user } = useContext(AuthContext);

    const handleBookService = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking = {
            customerName: name,
            email,
            img,
            date,
            service: title,
            service_id: _id,
            price: price
        }

        // console.log(booking);

        fetch('https://car-doctor-client-nine.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Confirm your booking this service',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })

    }

    return (
        <div className=''>
            <div className='relative'>
                <img src={image} className="w-full rounded-xl" />
                <div className="absolute rounded-xl flex items-center h-full w-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <h2 className='text-3xl text-white font-bold ps-14'>Check Out</h2>
                </div>
            </div>
            <form className='p-20 bg-base-200 my-14' onSubmit={handleBookService}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" defaultValue={user?.displayName} name="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name="email" defaultValue={user?.email} readOnly className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due amount</span>
                        </label>
                        <input type="text" defaultValue={'$' + price} readOnly className="input input-bordered" />
                    </div>
                </div>
                <div className="form-control mt-10">
                    <textarea className='p-5 rounded resize-none h-64' name="message" id="" placeholder='Your Message'></textarea>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary btn-block" type="submit" value="Order Confirm" />
                </div>
            </form>
        </div>
    );
};

export default BookService;