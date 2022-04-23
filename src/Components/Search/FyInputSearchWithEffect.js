import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'styled-icons/material/Search';
import { Close } from 'styled-icons/material/Close';
import ClearedInput from './ClearedInput';
import styled from 'styled-components';
import stopEventPropagation from '../../lib/Utils/stopEventPropagation';
import { useTranslation } from 'react-i18next';

const Input = styled(ClearedInput)`
  padding-top: .1rem;
  padding-bottom: .1rem;
  
   overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
  
  ::placeholder{
    font-size: 0.75rem;
    font-family: roboto_regular;
  }
  
  @media (min-width: 1440px){
    font-size: 1rem;
  }
  
  //remove initial states
  :-internal-autofill-selected {
    background-color: white !important;
    background-image: none !important;
    color: #2C3E4B !important;
 }
`;

const ContentSearch = styled('div')`
    transition: width 2s
    #button-close{
        visibility: hidden;
        opacity: 0;
        transition: visibility 0.5s, opacity 0.5s linear;


    }
    #button-close.show{
        visibility: visible;
        opacity: 1;

    }
    
    #content-input{
        visibility: hidden;
        opacity: 0;
        transition: visibility 1s, opacity 1s ease-out;
    }
    #content-input.show{
        visibility: visible;
        opacity: 1;
    }
 }
`;
const ContentTitle = styled('div')`
    display:flex;
    transition: display 3s ease visibility 3s ease;
    visibility: visible
    
    &.hidden{
        display:none;
        visibility: hidden;

    }
 }
`;

export default ({ onSearch, value, height, width, contentTitle, propsContent, ...props }) => {
    const { t } = useTranslation(['common']);
    const [currentValue, setValue] = useState(value || '');
    const [canSend, setCanSend] = useState(false);
    const [widthContent, setWidthContent] = useState(width || '2rem');
    const heightContent = height || '2rem';
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();
    let _timer;

    useEffect(() => {
        setValue(value);
    }, [value]);

    useEffect(() => {
        _timer = setTimeout(() => {
            if (canSend) {
                onSearch(currentValue);
            }
        }, 1000);
        // eslint-disable-next-line
    }, [_timer, currentValue]);

    const handleValue = (e) => {
        !canSend && setCanSend(true);
        setValue(e.target.value);
        _timer && clearTimeout(_timer);
    };

    useEffect(() => {
        return () => {
            clearTimeout(_timer);
        };
        // eslint-disable-next-line
    }, []);

    const handleOpen = () => {
        setWidthContent('100%');
        document.getElementById('content-input').classList.add('show');
        document.getElementById('button-close').classList.add('show');
        document.getElementById('content-title').classList.add('hidden');
        ref?.current && ref.current.focus();
    };

    const handleClose = (e) => {
        stopEventPropagation(e);
        setWidthContent(height);
        document.getElementById('button-close').classList.remove('show');
        document.getElementById('content-input').classList.remove('show');
        document.getElementById('content-title').classList.remove('hidden');
        setIsOpen(false);
        setValue('');
        props.onClear && props.onClear();
    };

    const handleSearch = (e) => {
        if (isOpen) {
            onSearch(currentValue);
        } else {
            stopEventPropagation(e);
            clearTimeout(_timer);
            handleOpen();
            setIsOpen(true);
        }
    };

    return (
        <>
            <ContentTitle
                className="text-base text-info m-auto ml-0 text-dark xxl-text-1x1 lg-text-base sm-text-base text-sm"
                id={'content-title'}
            >
                {contentTitle}
            </ContentTitle>
            <ContentSearch
                id="input-global-search"
                className="flex flex-row items-center bg-gray-100 font-roboto-light text-base py-1 rounded-full"
                style={{ height: heightContent, width: widthContent }}
                {...props}
            >
                <div className="flex items-center pl-2 pr-1 cursor-pointer" onClick={handleSearch}>
                    <Search size={'24px'} />
                </div>
                <div className="w-full pr-3 items-center pb-1 md:pt-0" id={'content-input'}>
                    <Input
                        ref={ref}
                        value={currentValue}
                        onChange={handleValue}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                        className={`border-0 w-full bg-transparent text-base ${
                            currentValue ? 'text-blue-500' : ''
                        }`}
                        placeholder={props.placeholder || t('search')}
                    />
                </div>
                <div id={'button-close'} className="pl-2 pb-1 pr-2 cursor-pointer" onClick={handleClose}>
                    <Close width="16" height="16" />
                </div>
            </ContentSearch>
        </>
    );
};
