import { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
    const [services, setServices] = useState([]);
    const [ass, setAss] = useState(false);
    const [search, setSearch] = useState('');
    const searchRef = useRef(null);

    useEffect(() => {
        fetch(`https://car-doctor-client-nine.vercel.app/services?search=${search}&sort=${ass}`)
            .then(res => res.json())
            .then(data => setServices(data));
    }, [ass, search]);

    const handleSearch = () => {
        const searchText = searchRef.current.value;
        setSearch(searchText);
        console.log(searchText)
    }

    return (
        <div className="my-8">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-orange-600">Services</h3>
                <h2 className="text-5xl mb-5">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
            </div>

            <div className="flex justify-center gap-10 mt-6">
                <div className="form-control">
                    <div className="input-group">
                        <input type="text" ref={searchRef} placeholder="Search…" className="input input-bordered" />
                        <button onClick={handleSearch} className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
                <div>
                    <h2 className="font-semibold text-xl">Sort by price</h2>
                    <select onChange={()=> setAss(!ass)} name="Sort by price" id="" className="border px-3">
                        <option value="heigh to low">heigh to low</option>
                        <option value="low to heigh">low to heigh</option>
                    </select>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;