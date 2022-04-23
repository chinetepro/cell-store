import React, {memo} from 'react';
import emptyResult from '../../assets/img/Business_404.svg';
import ErrorAlert from './ErrorAlert';

const EmptySearchResult = ({...props}) => {
    
    return <ErrorAlert
        title="emptySearchResult"
        message="emptySearchResultMessage"
        {...props}
    />;
};

EmptySearchResult.defaultProps = {
    animation: 'wobble',
    image: emptyResult,
};

export default memo(EmptySearchResult);
