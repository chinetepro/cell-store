import React, {memo, useCallback, useContext} from 'react';
import { ModuleContext } from '../../Contexts';
import EntityListNavbar from '../../../../Components/EntityListNavbar';


const OffersListNavbar = () => {
    const { t, useOfferList } = useContext(ModuleContext);
    const {handleSearch} = useOfferList();

    const onClear = useCallback(() => {
        handleSearch(null, false, {}, true);
    }, [handleSearch]);
    
    const onSearch = useCallback((search) => {
        handleSearch(search, true, {}, true);
    }, [handleSearch]);

    return (
        <>
            <EntityListNavbar title={t('Offers')} t={t} onSearch={onSearch} onClear={onClear}>
            </EntityListNavbar>
        </>
    );
};

export default memo(OffersListNavbar);
