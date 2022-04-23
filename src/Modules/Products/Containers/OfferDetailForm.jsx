/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useContext} from 'react';
import OffersDetailListNavbar from '../Components/OffersDetailListNavbar';
import EntityFormDetail from '../../../Components/EntityFormDetail';
import { ModuleContext } from '../Contexts';
import OfferForm from './OfferForm';
import PageLoader from '../../../Components/PageLoader'

const OfferDetailForm = () => {
    const { useOfferList, useFindOfferCache } = useContext(ModuleContext);
    const {reload} = useOfferList();
    
    return <EntityFormDetail
        entity={'common'}
        useFindCache={useFindOfferCache}
        Form={OfferForm}
        HeaderActions={OffersDetailListNavbar}
        reload={reload}
        Placeholder={PageLoader}
    />;
};

export default memo(OfferDetailForm);
