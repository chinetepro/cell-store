import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import FyInputSearchWithEffect from '../Search/FyInputSearchWithEffect';


const EntityListNavbar = ({ header, title, t, onSearch, onClear, valueSearch, children }) => {
    const { pathname } = useLocation();
    const isDetailView = useMemo(() => (pathname.includes('/detail/')), [pathname]);
    return (
        <nav id="store" className="w-full z-30 top-0 px-6 py-1 border-b border-gray-100">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                <span className="mb-1 md:mb-0 uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">
                    {title}
                </span>
                {!isDetailView && <div className="flex items-center" id="store-nav-content">
                    <FyInputSearchWithEffect
                        placeholder={t("common:search")}
                        height={"36px"}
                        width={"36px"}
                        onSearch={onSearch}
                        onClear={onClear}
                        value={valueSearch}
                        contentTitle={""}
                    />
                </div>}
            </div>
        </nav>
    );

};

export default memo(EntityListNavbar);

EntityListNavbar.defaultProps = {
    t: (text) => text
};
EntityListNavbar.propTypes = {
    children: PropTypes.any,
    onSearch: PropTypes.func,
    t: PropTypes.any,
    title: PropTypes.string,
    header: PropTypes.func,
};
