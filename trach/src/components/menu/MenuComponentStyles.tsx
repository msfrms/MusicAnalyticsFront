import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import React from 'react'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({        
    root: {        
        height: 30,
        width: '100%',        
        marginBottom: 60,            
    },    
    rootMobile: {        
        height: 30,
        width: '100%',        
        marginBottom: 20,    
        marginLeft: 15,
        marginRight: 15,
    },
    item: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 16,        
        color: '#000000',
    }, 
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 2,
        marginLeft: 30,
    },    
  }),
)

export const LogoIcon = () =>
    <svg width="80" height="25" viewBox="0 0 80 25" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <rect width="80" height="25" fill="url(#pattern0)"/>
        <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image0" transform="translate(-0.000529661) scale(0.00105932 0.00338983)"/>
            </pattern>
            <image id="image0" width="945" height="295" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA7EAAAEnCAYAAAB/g8QuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDkwNEJBQ0I3QzUyMTFFQUFBRUNFMTQ0QzA3MjQzNzkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDkwNEJBQ0M3QzUyMTFFQUFBRUNFMTQ0QzA3MjQzNzkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0OTA0QkFDOTdDNTIxMUVBQUFFQ0UxNDRDMDcyNDM3OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0OTA0QkFDQTdDNTIxMUVBQUFFQ0UxNDRDMDcyNDM3OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pis3eFgAAAncSURBVHja7NrPi9R1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HC5+E7KmCXfinxp/Of6N9td4OmQfEyzVuBcwz46jP169J16oj2MBU71a74pfA+a5HvKuuF/jbzeg0UER256H99GAeV5xZ1pjX8iZ+bBeamds19gfJr36+D1gqss1eiHLmnAnvq878YYb0HgvvquP1wOmmvLjcuPuzgfMc+T0N3qzxpcB8zxb44OAee4OeVecrnfFguPf+K6IeGb4d2IAAABiiFgAAABELAAAAIhYAAAARCwAAACIWAAAABCxAAAAiFgAAAAQsQAAACBiAQAAELEAAAAgYgEAAEDEAgAAIGIBAABAxAIAAICIBQAAQMQCAACAiAUAAAARCwAAgIgFAAAAEQsAAAAiFgAAABELAAAAIhYAAABELAAAACIWAAAARCwAAACIWAAAAEQsAAAAiFgAAABErCUAAABAxAIAAICIBQAAQMQCAACAiAUAAAARCwAAgIgFAAAAEQsAAAAiFgAAABELAAAArdKdge/YqXEjYJ73HcfWeBByZsi/97es51Tdc/Q3XZ8bIectwbWQeb44GPQPOP5j7a2xHDDPlZD1fBTyjHno6E8U8Rt4FiJ2VONQwDyfcWdaY1fImSH/3j+wnlP1rKO/6focCjlvrTccLp5ImGcF7O362O/4j3W+9rFnGaZmZ8gzpmurJor4DezfiQEAAIghYgEAABCxAAAAIGIBAAAQsQAAACBiAQAAQMQCAAAgYgEAAEDEAgAAgIgFAABAxAIAAICIBQAAABELAACAiAUAAAARCwAAACIWAAAAEQsAAAAiFgAAAEQsAAAAIhYAAABELAAAAIhYAAAARCwAAACIWAAAABCxAAAAiFgAAAAQsQAAACBiAQAAELEAAAAgYgEAABCxlgAAAAARCwAAACIWAAAAEQsAAAAiFgAAAEQsAAAAIhYAAABELAAAAIhYAAAARCwAAACIWAAAAHgS/wowADPw70uuZqimAAAAAElFTkSuQmCC"/>
        </defs>
    </svg>

export const MenuIcon = () =>
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="2" rx="1" fill="#3D3D3C"/>
        <rect y="6" width="20" height="2" rx="1" fill="#3D3D3C"/>
        <rect y="12" width="20" height="2" rx="1" fill="#3D3D3C"/>
    </svg>
