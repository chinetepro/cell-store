import React, {memo} from 'react';
import PropTypes from 'prop-types';
import unexpectedResult from '../../assets/img/Business_404.svg';
import PageAlert from '../PageAlert/PageAlert';

const ErrorAlert = ({animation, image, ...props}) => {
    return (
        <PageAlert
            image={<img src={image} className={`${animation} duration-15 h-auto`} style={{maxWidth: '90%', width: '21rem'}}/>}
            text-center
            {...props}
        />
    );
};

ErrorAlert.propTypes = {
    image: PropTypes.any,
    animation: PropTypes.any,
};

ErrorAlert.defaultProps = {
    image: unexpectedResult,
};

export default memo(ErrorAlert);