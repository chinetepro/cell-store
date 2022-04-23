import React, {useState, useEffect, useMemo} from 'react';
import  VisibilitySensor from '../VisibilitySensor';

const WrapperRenderChildren = ({children, firstShow, setFirstShow, isVisible, containerName, minHeight = '10rem', useLoader, Loader, useFirstShow = true }) =>{
    useEffect(() => {
        if(!firstShow && isVisible){
            setFirstShow && setFirstShow(isVisible);
        }
    },[isVisible, firstShow ]);      
    return <>
        <div style={{minHeight: !isVisible ? minHeight : 'auto'}}>
        {(isVisible || (useFirstShow && firstShow)) ? <div style={{opacity: firstShow? '1':'0'}}>
            {/* <h3 style={{position: 'fixed', bottom: 0}}>I am <span style={{color:isVisible? 'green':'red',}}>{isVisible ? 'visible' : 'invisible'} {containerName}</span></h3> */}
            {children}
        </div>: useLoader ? <Loader/> : <></>}
       </ div>
    </>;
}

const WrapperRenderChildrenImages = ({children, firstShow, setFirstShow, isVisible, containerName, minHeight = '10rem', useLoader, Loader, useFirstShow = true }) =>{
    useEffect(() => {
        if(!firstShow && isVisible){
            setFirstShow && setFirstShow(isVisible);
        }
    },[isVisible, firstShow ]);      
    return <>
        <div style={{minHeight: !isVisible ? minHeight : 'auto', width: '100%'}}>
        {(isVisible || (useFirstShow && firstShow)) ? children
        : useLoader ? <Loader/> : <></>}
       </ div>
    </>;
}

const WrapperVisibityComponent = ({scrollCheck = true,  intervalDelay=8000,  containerName,  partialVisibility = true, children, onChange, minHeight = '10rem', useLoader, Loader, useFirstShow=true, useImages}) =>{
    const container = document.getElementById(containerName);
    const RenderComponent = useMemo(() => useImages ? WrapperRenderChildrenImages: WrapperRenderChildren,[useImages]);
    const [firstShow, setFirstShow] = useState(false);
    const props = {
        scrollCheck,
        intervalDelay,
        partialVisibility,
        ...(onChange && {onChange}),
        ...(container && {containment: container}), 
    }
    return <VisibilitySensor
    {...props}>
        {({isVisible}) => <RenderComponent minHeight={minHeight} isVisible={isVisible} firstShow={firstShow} setFirstShow={setFirstShow} containerName={containerName} useLoader={useLoader} Loader={Loader} useFirstShow={useFirstShow}>{children}</RenderComponent>
    }</VisibilitySensor>
}

export default WrapperVisibityComponent;