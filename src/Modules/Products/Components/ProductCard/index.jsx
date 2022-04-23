import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PlaceHolderText } from '../../../../Components/Placeholders';
import { LoadingSection } from '../../../../Components/LoadingSection';
import OfferTag from '../OfferTag/OfferTag';
import ImageRenderComponent from '../ImageRenderComponent';


const ProductCard = ({ data, onSelectItem, children, ...props }) => {
    const handleSelectItem = useCallback(() => {
        if (!onSelectItem) {
            return;
        }
        onSelectItem(data);
    }, [onSelectItem, data]);

    return (
        <LoadingSection placeholder={<PlaceHolderText h-64 mb-8 />} loading={data.__loading__}>
            <div className="w-full md:w-1/3 xl:w-1/4 p-5 flex flex-col cursor-pointer" onClick={handleSelectItem} >
                <Link to={`/detail/${data?.id}`} className="relative shadow-md rounded-lg">
                    <ImageRenderComponent urlImage={data?.imgUrl} />
                    <div className="pt-3 px-2 flex items-center justify-between">
                        <span className="text-gray-500 font-bold">{data?.brand}</span>
                        <OfferTag offer={`£ ${data?.price || 0}`} topPosition/>                        
                    </div>
                    <div className="px-2 pb-1 flex items-center justify-between">
                        <span className="text-gray-400 font-bold ">{data?.model}</span>
                        {children && children({ data, ...props })}
                    </div>
                </Link>

            </div>
        </LoadingSection>
    );
};


export default memo(ProductCard);

ProductCard.propTypes = {
    data: PropTypes.any,
    onSelectItem: PropTypes.func,
    children: PropTypes.func
};
