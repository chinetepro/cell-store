import React from 'react';
import { matchPath, withRouter } from 'react-router';

const renderer = ({ breadcrumb, match }) => {
    if (typeof breadcrumb === 'function') { return breadcrumb({ match }); }
    return breadcrumb;
};

export const getBreadcrumbs = ({ routes, pathname }) => {
    const matches = [];

    pathname
        .replace(/\/$/, '')
        .split('/')
        .reduce((previous, current) => {
            const pathSection = `${previous}/${current}`;
            let breadcrumbMatch;

            routes.some(({ breadcrumb, path }) => {
                const match = matchPath(pathSection, { exact: true, path });

                if (match) {
                    breadcrumbMatch = {
                        breadcrumb: renderer({ breadcrumb, match }),
                        path,
                        match,
                    };
                    return true;
                }

                return false;
            });

            if (breadcrumbMatch) {
                matches.push(breadcrumbMatch);
            }

            return pathSection;
        });
    return matches;
};

export const withBreadcrumbs = routes => Component => withRouter(props => (
    <Component
        {...props}
        breadcrumbs={
            getBreadcrumbs({
                pathname: props.location.pathname,
                routes,
            })
        }
    />
));