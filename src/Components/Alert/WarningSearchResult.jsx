import React, {memo} from 'react';
import ErrorAlert from './ErrorAlert';

const WarningSearchResult = ({...props}) => {
    
    return <ErrorAlert
        title="dataErrorFoundTitle"
        message="dataErrorFoundSubTitle"
        {...props}
    />;
};

WarningSearchResult.defaultProps = {
};

export default memo(WarningSearchResult);
