// eslint-disable-next-line
import React, {memo} from 'react'
import {PlaceholderLoadingStyled} from '../LoadingSection'


export const PlaceHolderAvatar = memo((props) => (
    <PlaceholderLoadingStyled className={`rounded-full w-12 h-12 ${{...props}}`}/>
));


export const PlaceHolderTitle = memo((props) => (
    <PlaceholderLoadingStyled className={`rounded-md min-w-64 h-6 ${{...props}}`}/>
));

export const PlaceHolderSubTitle = memo((props) => (
    <PlaceholderLoadingStyled className={`rounded-md min-w-64 h-4 ${{...props}}`}/>
));

export const PlaceHolderText = memo((props) => (
    <PlaceholderLoadingStyled className={`rounded-xs h-16  ${{...props}}`}/>
));

