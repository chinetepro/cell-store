import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import EntityCard from '../EntityCard';
import { PlaceHolderText } from '../Placeholders';
import { LoadingSection } from '../LoadingSection';

const mock = [1, 2, 3, 4, 5, 6, 7, 8];

const PlaceHolderList = () => (
    <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        {mock?.map((item) => (
            <PlaceHolderText h-64 mb-8 mb-3 key={item}/>
        ))}
    </div>
);

const EntityList = ({t, data, onSelectItem, isLoading, CardRender, cardProps, ...props}) => {
    
    const list = useMemo(()=> Array.isArray(data) ? data : [], [data]);
    
    return (
        <LoadingSection placeholder={<PlaceHolderList/>} loading={isLoading}>
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                {list?.map((item) => (
                    <CardRender t={t} data={item} key={item?.id} onSelectItem={onSelectItem} {...cardProps} listProps={props}/>
                ))}
            </div>

        </LoadingSection>);
};

export default EntityList;

EntityList.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    loadingPage: PropTypes.bool,
    CardRender: PropTypes.any,
    cardProps: PropTypes.any,
    onSelectItem: PropTypes.func
};

EntityList.defaultProps = {
    CardRender: EntityCard
};
