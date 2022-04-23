import React, { memo, useMemo, useContext, useState, useCallback, useEffect } from 'react';
import styled, {css} from 'styled-components';
import Cart from '../../../assets/img/kart_2.svg';
import {CarContext} from '../Contexts';

const WrapperCart = styled('img')`
    height: 28px;
`;

const WrapperDivCart = styled('div')`
${({isActive}) => isActive && css`
    transition: all 1s ease-in-out;
    animation: bounce;
    animation-duration: 1.3s;
`}

@-webkit-keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    -webkit-transition-timing-function: cubic-bezier(
      0.755,
      0.05,
      0.855,
      0.06
    );
    transition-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -30px, 0);
    transform: translate3d(0, -30px, 0);
  }

  70% {
    -webkit-transition-timing-function: cubic-bezier(
      0.755,
      0.05,
      0.855,
      0.06
    );
    transition-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -15px, 0);
    transform: translate3d(0, -15px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, -4px, 0);
    transform: translate3d(0, -4px, 0);
  }
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    -webkit-transition-timing-function: cubic-bezier(
      0.755,
      0.05,
      0.855,
      0.06
    );
    transition-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -30px, 0);
    transform: translate3d(0, -30px, 0);
  }

  70% {
    -webkit-transition-timing-function: cubic-bezier(
      0.755,
      0.05,
      0.855,
      0.06
    );
    transition-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -15px, 0);
    transform: translate3d(0, -15px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, -4px, 0);
    transform: translate3d(0, -4px, 0);
  }
}

.bounce {
  -webkit-animation-name: bounce;
  animation-name: bounce;
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom;
}
`;

const OffersCar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const { items } = useContext(CarContext);
    const toggleIsOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);

    const label = useMemo(() => {
        return items?.length > 99 ? <div className="mt-1">*</div> : items?.length;
    }, [items]);

    const hasOffers = items?.length > 0;

    useEffect(() => {
        if(items?.length > 0){
            setIsActive(true);
            setTimeout(()=>setIsActive(), 1500);
        }
    }, [items?.length])

    return (
        <>
            <div className="relative cursor-pointer" onClick={toggleIsOpen}>
                {hasOffers && <WrapperDivCart isActive={isActive} className="absolute p-1 h-5 w-5 flex items-center justify-center text-white text-sm top-0 right-0 rounded-full bg-blue-800 font-bold">
                    {label}
                </WrapperDivCart>}
                <WrapperCart src={Cart} className={`${hasOffers ? 'mt-1 mr-2' : ''} `} />
            </div>
        </>
    );
};


export default memo(OffersCar);
