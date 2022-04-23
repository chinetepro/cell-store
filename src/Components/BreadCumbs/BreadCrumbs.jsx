import React from 'react';
import { NavLink } from 'react-router-dom';
import { withBreadcrumbs } from './withBreadcrumbs';

const UserBreadcrumb = ({ match }) =>
    <span className="font-bold text-2xl text-ellipsis text-gray-600">Detail Offer</span>; // use match param userId to fetch/display user name

const routes = [
    { path: '/', breadcrumb: 'Store' },
    { path: '/detail/:id', breadcrumb: UserBreadcrumb },
];

const Breadcrumbs = ({ breadcrumbs }) => (
    <ol className="flex text-gray-800 items-center text-gray-800">
        <li className={`flex items-center`} key={'/'}>
            <NavLink to={'/'} className="font-bold text-2xl items-center flex flex-row">
                <svg className="mr-2 w-4 h-4 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                Store
            </NavLink>
            {breadcrumbs?.length > 0 && <span className="ml-2 mt-1"><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 5l7 7-7 7" />
            </svg></span>}
        </li>
        {breadcrumbs.map(({ breadcrumb, path, match }, index) => (
            <li className={`flex items-center ${index > 0 ? 'ml-2' : ''}`} key={path}>
                <NavLink to={match.url} className="font-bold text-2xl truncate">
                    {breadcrumb}
                </NavLink>
                {breadcrumbs?.length > 1 && <span className="ml-2 mt-1"><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M9 5l7 7-7 7" />
                </svg></span>}
            </li>
        ))}
    </ol>
);

export default withBreadcrumbs(routes)(Breadcrumbs);