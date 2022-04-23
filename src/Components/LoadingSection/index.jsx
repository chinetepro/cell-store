// eslint-disable-next-line
import React, {memo} from 'react'
import styled, {keyframes, css} from 'styled-components'
import PropTypes from "prop-types";

const loading = keyframes`
 0% {
    background: #EFEFEF ;
 }
 
 50% {
    background: #f8f9fa ;
 }
 
 100% {
    background: #EFEFEF ;
 }
`;

export const PlaceholderLoadingStyled = memo(styled('div')`
    background: #dedede ;
    animation: ${loading} 1s ease-in-out infinite;
`);


export const LoadingSection = memo(({children, loading, placeholder}) => {
    if (loading) return placeholder;
    return children;
});

LoadingSection.propTypes = {
    loading: PropTypes.bool,
    Placeholder: PropTypes.any
};
