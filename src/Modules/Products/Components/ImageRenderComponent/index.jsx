
import React, {memo} from 'react';
import { useImageLoaded } from '../../../../Components/LazyImage/useLoadedImg';
import LazyImageHOC from '../../../../Components/LazyImage/LazyImageHOC';
import styled from 'styled-components';

const ImageRender = styled('img')`
  object-fit: contain;
  height: ${({ invisible }) => invisible ? '0' : '100%'};
  width: 100%;
  backdrop-filter: blur(20px);
  max-height:  ${({ maxHeight }) => maxHeight || '10rem'};
`;

const ContainerRender = styled('div')`
  object-fit: cover;
  height: ${({ invisible }) => invisible ? '0' : '100%'};
  width: 100%;
  backdrop-filter: blur(20px); 
`;


const ImageRenderComponent = ({urlImage, maxHeight})=>{
    const [ref, loaded, onLoad] = useImageLoaded();
    const key = `image-product-${urlImage}`;
    return <div
    key={key}
    h-auto={!urlImage}
    className="w-full shadow-md"
    {...(urlImage &&
        loaded && {
        style: {
            display: 'flex',
            backgroundImage: 'url(' + urlImage + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
    })}
    hidden={!urlImage}
>
    <LazyImageHOC
        containerName={key}
        ImageRender={ImageRender}
        ContainerRender={ContainerRender}
        loaded={loaded}
        forwardFef={ref}
        onLoad={onLoad}
        image={urlImage}
        hiddenImg={!urlImage}
        maxHeight={maxHeight}
        className="hover:grow hover:shadow-lg"
    />
</div>
}
export default memo(ImageRenderComponent);