import React, { memo, useMemo, useContext, useCallback } from 'react';
import { OffersListNavbar, ProductCard } from '../Components';
import { CarContext, ModuleContext } from '../Contexts';
import PropTypes from 'prop-types';
import EntityView from '../../../Components/EntityView';
import EntityList from '../../../Components/EntityList';
import { CartPlus } from 'styled-icons/fa-solid/CartPlus';
import { CartArrowDown } from 'styled-icons/fa-solid/CartArrowDown';

const CardChild = ({ data, t }) => {
    const car = useContext(CarContext);
      
    return (
        <div key="actions">
            {car.inCar(data) && <div className="text-blue-500 flex items-center pl-2 pr-1 cursor-pointer">
                    <CartArrowDown size={'24px'} />
                </div>}
            {!car.inCar(data) && <div className="flex items-center pl-2 pr-1 cursor-pointer">
                    <CartPlus size={'24px'} />
                </div>}
        </div>
    );
};

CardChild.propTypes = {
    t: PropTypes.func,
    data: PropTypes.any,
};

const Offers = () => {
    const { useOfferList } = useContext(ModuleContext);
    const { isLoading, data, isEmpty, isSearching, t, handlePageChange, totalElements, loadingPage } = useOfferList();
    const cardProps = useMemo(() => ({
        t,
        children: CardChild
    }), [t]);

    return (
        <>
            <OffersListNavbar/>
            <EntityView
                isSearching={isSearching}
                isEmpty={isEmpty}
                t={t}
                data={data}
                isLoading={isLoading}
                totalElements={totalElements}
                loadingPage={loadingPage}
                handlePageChange={handlePageChange}
                List={EntityList}
                view={'list'}
                cardProps={ cardProps }
                CardRender={ ProductCard }
            />
        </>
    );
};

export default memo(Offers);
