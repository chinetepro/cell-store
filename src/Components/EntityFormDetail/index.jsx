/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import _isEmpty from 'lodash/isEmpty';
import { useParams } from 'react-router';

const init = { isSameData: false };

const EntityFormDetail = ({ translate, entity, title, useFindCache, backRoute, Form, Placeholder, withLang, withRemoveAction, useDeleteOne, reload, DetailsView, backRouteClient, HeaderActions, BeforeTitle, type, ...props }) => {
    const { t, i18n } = useTranslation((entity !== translate && entity && translate ? translate :  entity || translate));
    const {id} = useParams();
    const [lang, setLangValue] = useState(i18n.language);
    // eslint-disable-next-line no-unused-vars
    const [request, setRequest] = useState(init);
    // eslint-disable-next-line no-unused-vars
    const { cleanAndReload, data, isLoading } = useFindCache();

    const reloadCache = useCallback(() => {
        if (id) {
            cleanAndReload(id, { params: { lang } });
        }
    }, [id, lang, cleanAndReload]);

    useEffect(() => {
        if (id ) {
            setRequest(prevState => {
                if (!id)
                    return init;
                // switch between language silently without loading
                const isSameData = prevState.id === id;
                //fetch the item
                reloadCache();
                return { id, isSameData };
            });

        }    
    }, [id]);

    //switch between edit or create
    const [currentData, loading] = useMemo(() => id ? [data ,  isLoading] : [{}, false], [isLoading, data]);

    return (
        <>   
            <HeaderActions data={currentData}  title={t(title || (id ? 'Detail' : 'addTitle'))} loading={loading} t={t} />                  
            {!loading ? <Form lang={lang} t={t} data={currentData} loading={loading} type={type} reloadCache={reloadCache} backRoute={backRouteClient || backRoute} /> : <Placeholder/>}         
        </>
    );
};

export default memo(EntityFormDetail);

EntityFormDetail.propTypes = {
    Form: PropTypes.any,
    Placeholder: PropTypes.any,
    backRoute: PropTypes.string,
    entity: PropTypes.string,
    translate: PropTypes.string,
    useFindCache: PropTypes.any,
    withLang: PropTypes.bool,
    withRemoveAction: PropTypes.bool,
    useDeleteOne: PropTypes.any,
    reload: PropTypes.func,
    hardReload: PropTypes.func,
    DetailsView: PropTypes.any,
    backRouteClient: PropTypes.string,
    HeaderActions: PropTypes.any,
    typeForm: PropTypes.string,
};

EntityFormDetail.defaultProps = {
    translate: '',
    withLang: true,
    withRemoveAction: true,
    useDeleteOne: () => ({}),
    useAddToCar: () => ({}),
    reload: () => null,
    hardReload: () => null,
    // eslint-disable-next-line react/display-name
    DetailsView: () => null,
    Form: () => null,
    HeaderActions: () => null,
};
