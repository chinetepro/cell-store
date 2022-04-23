import React, {memo} from "react";
import WrapperVisibityComponent from "../WrapperVisibityComponent";
import ImageLoading from "./ImageLoading";

const LazyImageHOC = ({
    propsContainer = {},
    propsImage = {},
    heigth = '100%',
    intervalDelay = 10,
    ImageRender,
    ContainerRender,
    containerName,
    loaded,
    forwardFef,
    onLoad,
    image,
    hiddenImg,
    onClick,
    ...props
}) => {
    return (
        <WrapperVisibityComponent
            useImages
            intervalDelay={intervalDelay}
            containerName={containerName}
        >
            <ContainerRender hidden={loaded} {...props}>
                <ImageLoading height={heigth} {...props} />
            </ContainerRender>
            <ImageRender
                src={image ? image : ''}
                className="w-full"
                loading="lazy"
                hidden={hiddenImg}
                invisible={!loaded}
                onClick={() => {
                    onClick && onClick();
                }}
                cursor-pointer
                ref={forwardFef}
                onLoad={onLoad}
                {...props}
            />
        </WrapperVisibityComponent>
    );
};
export default memo(LazyImageHOC);