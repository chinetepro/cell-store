import React, {memo} from 'react';
import PropTypes from 'prop-types';

const PageAlert = ({t, title, message, image, ...props}) => {
    
    return (
        <div className={`flex justify-center flex-col lg-flex-row items-center ${{...props}}`}>
            <div className="p-4 flex justify-center items-center">
                {image}
            </div>
            <div className="p-4">
                <h2 className="m-0">{t(title)}</h2>
                <p className="opacity-50 my-2">{t(message)}</p>
            </div>
        </div>
    );
};

PageAlert.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    image: PropTypes.any,
    t: PropTypes.func,
};

PageAlert.defaultProps = {
    t: (text) => text
};

export default memo(PageAlert);