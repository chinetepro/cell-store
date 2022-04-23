import React, {memo, useContext} from 'react';
import { ModuleContext } from '../../Contexts';
import EntityListNavbar from '../../../../Components/EntityListNavbar';


const OffersDetailListNavbar = () => {
    const { t } = useContext(ModuleContext);

    return (
        <>
            <EntityListNavbar title={t('Detail Offer')} t={t}>
            </EntityListNavbar>
        </>
    );
};

export default memo(OffersDetailListNavbar);
