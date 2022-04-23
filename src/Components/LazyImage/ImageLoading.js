import React,{memo} from "react";
import ContentLoader from "react-content-loader";

export default memo(({height = '100%', ...props}) => {
    return (
        <div className="w-full bg-white rounded flex flex-col" {...props}>
            <ContentLoader speed={3} height={height} width="100%" foregroundColor="#c6c4ca">
                <rect rx={1} ry={1} width="100%" height="100%" x={0} y={0} />
            </ContentLoader>
        </div>
    )
})