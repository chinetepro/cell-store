/* eslint-disable react-hooks/exhaustive-deps */
import {memo} from 'react';
import OfferDetailForm from '../Containers/OfferDetailForm';

const OffersDetailsSubPage = () => {
    return (
        <>
            <OfferDetailForm />
        </>
    );
};

export default memo(OffersDetailsSubPage);
