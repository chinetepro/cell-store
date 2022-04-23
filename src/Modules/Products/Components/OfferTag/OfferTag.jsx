import React, {memo, Fragment} from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

const BaseCss = css`
    background: #1112c0 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    opacity: 1;
    color: white;
`;

const OfferRounded = styled('div')`
    width: 65px;
    height: 65px;
    border-radius: 100%;
    border: 3px solid #FFFFFF;
    ${({topPosition})=>topPosition && css`
        position: absolute;
        top: -58px;
        right: 0;
    `}
    .offer-type{
        font-size: 10px;
    }
    ${BaseCss}
`;

const Offer = styled('div')`
    width: auto;
    height: 2.25rem;
    padding: .25rem 1rem;
    ${({topPosition}) => topPosition && css`
        position: absolute;
        top: 130px;
        right: -16px;
    `}
    .offer-type{
        font-size: 12px;
        padding-bottom: 2px;
    }
    &::after {
        content: '';
        top: 36px;
        right: 0;
        border-style: solid;
        border-width: 17px 17px 0 0;
        border-color: transparent;
        border-top-color: inherit;
        position: absolute;
        color: #DEDEDE;
    }
    ${BaseCss}
`;

const OfferTag = ({offer, type, rounded, ...props}) => {

    return (<Fragment>
        {
            rounded ? <OfferRounded {...props} className="flex flex-col items-center justify-center">
                <span className="text-xl font-bold">{offer}</span>
                <span className="offer-type">{type}</span>
            </OfferRounded> : <Offer {...props} flex items-end pr-1>
                <span className="text-xl font-bold">{offer}</span>
                <span className="offer-type" pl-1 pb-1>{type}</span>
            </Offer>
        }
    </Fragment>);
};

export default memo(OfferTag);

OfferTag.propTypes = {
    offer: PropTypes.string,
    type: PropTypes.string,
    topPosition: PropTypes.bool,
    rounded: PropTypes.bool
};

OfferTag.propTypes = {
    services: PropTypes.array,
    rounded: false
};