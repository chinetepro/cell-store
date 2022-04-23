import React, {memo} from 'react';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../../../Components/BreadCumbs/BreadCrumbs';
import OffersCar from '../../../Modules/Products/Components/OffersCar';

const MainNavbarPortal = () => {    
    return (
        <header>
                <nav id="header" className="w-full z-30 top-0 py-1 shadow-md border-b border-gray-100">
                    <div className="w-full container mx-auto flex flex-wrap items-start md:items-center justify-between mt-0 px-6 py-3">
                        <div className="order-1 md:order-2 flex flex-col md:flex-row  flex-wrap">
                            <Link to={'/'} className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">
                                <svg className="fill-current text-gray-800 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z" />
                                </svg>
                                <h1 className="ml-3 mb-2 font-bold text-center text-4xl text-gray-500">
                                    Cell<span className="text-blue-500">Store</span>
                                </h1>
                            </Link>
                            <div className="md:ml-6 flex items-center">
                                <BreadCrumbs /> 
                            </div>
                        </div>
                        <div className="order-2 md:order-3 flex items-start mt-3 md:mt-0 md:items-center" id="nav-content">
                            <a className="inline-block no-underline hover:text-black" href="#">
                                <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <circle fill="none" cx="12" cy="7" r="3" />
                                    <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
                                </svg>
                            </a>
                            <OffersCar />
                        </div>
                    </div>
                </nav>
            </header>
    );
};

export default memo(MainNavbarPortal);
