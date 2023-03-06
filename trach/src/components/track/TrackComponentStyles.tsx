import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import React from 'react'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        '&:hover': {
            background: 'linear-gradient(to left, #F4F4F4 73.44%, rgba(248, 248, 248, 0) 100%)',
            borderRadius: 8,
            width: 'calc(100% - 100% / 10)'                        
        },                
    },
    ads: {
        width: '20%',        
    },
    moreIcon: {
        marginRight: 30
    },           
    moreIconMobile: {        
        marginLeft: 10,    
    },           
    position: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 16,
        color: '#000000',                
        textAlign: 'center',
        width: 50,        
    },
    positionMobile: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 16,
        color: '#000000',                
        textAlign: 'right',
        marginRight: 10,                
    },
    changePosition: {
        width: 50,
        textAlign: 'center',        
        marginRight: 20,
    },
    cover: {
        position: 'relative',
        borderRadius: 3,
        width: 56,
        height: 56,        
    },
    infoIcon: {
        position: 'absolute',
        width: 35,
        height: 35,            
        marginTop: 10,
        marginLeft: 10,
        background: 'transparent',
        borderRadius: 3,        
    },
    name: {
        '&:hover': {
            textDecorationLine: 'underline',                    
        },
        cursor: 'pointer',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 16,
        color: '#000000',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    artist: {
        '&:hover': {
            textDecorationLine: 'underline'        
        },
        cursor: 'pointer',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        color: '#9F9F9F',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        paddingRight: 6                                
    },
    artistHover: {
        '&:hover': {
            textDecorationLine: 'underline',                    
        },
        cursor: 'pointer',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        color: '#979797',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        paddingRight: 6,        
    },
    grayText: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        color: '#979797',
        textAlign: 'end'        
    },
    label: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12,
        color: '#9F9F9F',                
        textAlign: 'center',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 6,
        paddingRight: 6,
        border: '1px solid #9C9C9C',
        boxSizing: 'border-box',
        borderRadius: 4
    },
    positionIncrement: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 16,
        color: '#048C12',
        textAlign: 'right',        
    },    
    positionDecrement: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 16,
        color: '#8C0404',
        textAlign: 'right',        
        
    },    
    positionNew: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 16,
        color: '#048C12',
        textAlign: 'right',        
    },
    positionUnchanged: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 16,
        color: '#9F9F9F',
        textAlign: 'right',        
    },    
  }),
);

export const MoreIcon = () =>
    <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="2" cy="2" r="2" transform="rotate(90 2 2)" fill="#979797"/>
        <circle cx="2" cy="8" r="2" transform="rotate(90 2 8)" fill="#979797"/>
        <circle cx="2" cy="14" r="2" transform="rotate(90 2 14)" fill="#979797"/>
    </svg>

export const UpIcon = () =>
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 0L9.33013 7.5H0.669873L5 0Z" fill="#048C12"/>
    </svg>

export const DownIcon = () =>
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 8L0.669873 0.499999L9.33013 0.5L5 8Z" fill="#8C0404"/>
    </svg>

export const InfoIcon = () =>
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <rect width="35" height="35" fill="url(#pattern11)"/>
        <defs>
            <pattern id="pattern11" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image11" transform="translate(-0.00337838) scale(0.00675676)"/>
            </pattern>
            <image id="image11" width="149" height="148" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAACUCAYAAACa/mvqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzUyNjY0NTQ3RjEwMTFFQUFGMkY5NTc3MzEyOEIwOTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzUyNjY0NTU3RjEwMTFFQUFGMkY5NTc3MzEyOEIwOTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDNTI2NjQ1MjdGMTAxMUVBQUYyRjk1NzczMTI4QjA5NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDNTI2NjQ1MzdGMTAxMUVBQUYyRjk1NzczMTI4QjA5NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmu/SggAAAtUSURBVHja7J17jFXV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"/>
        </defs>
    </svg>    
