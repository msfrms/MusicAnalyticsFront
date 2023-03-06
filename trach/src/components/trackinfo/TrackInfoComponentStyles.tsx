import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import React from 'react'

export const useStyles = makeStyles((_: Theme) =>
  createStyles({
      name: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'left',
        color: '#000000',        
      },
      artist: {
        '&:hover': {
          textDecorationLine: 'underline',                    
        },
        cursor: 'pointer',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        textAlign: 'left',
        color: '#000000',
        paddingRight: 6,                
      },
      button: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        textAlign: 'left',
        color: '#000000',
        marginLeft: 10, 
      },
      label: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        textAlign: 'left',
        color: '#969696',        
      },
      album: {
        '&:hover': {
          textDecorationLine: 'underline',                    
        },
        cursor: 'pointer',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        textAlign: 'left',
        color: '#969696',        
      },
      image: {
          borderRadius: 3,
          width: 180,
          height: 180,
          marginRight: 40,          
      },
      bookmark: {
        width: 39,
        height: 39,        
      },
      notification: {
        width: 18,
        height: 20,        
      },                  
})) 
 
export const BookmarkIcon = () =>
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <rect width="15" height="15" fill="url(#pattern2)"/>
      <defs>
        <pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image2" transform="scale(0.05)"/>
      </pattern>
      <image 
        id="image2" 
        width="20" 
        height="20" 
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDQwOEY3NDA3QzUwMTFFQTkxMjVGRDMwRjZGMUY1NUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDQwOEY3NDE3QzUwMTFFQTkxMjVGRDMwRjZGMUY1NUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NDA4RjczRTdDNTAxMUVBOTEyNUZEMzBGNkYxRjU1QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NDA4RjczRjdDNTAxMUVBOTEyNUZEMzBGNkYxRjU1QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgR3pzYAAADHSURBVHjaYmRgZPjPQEXAAqVPAPFBCs2yAGJ7BrALGRnagZiBQlwBMouJgcpg1MBRA4eKgaDsmQTEEUhZlWwDHYD4AhDPBeLlQHwRKkaygZJAvBSI9wExJxD7QTEHEO+HGi6FXStq4cACxEVA/AmIvwFxAxBzIhUAnFAxkNxnIC4FYjbkwgHZQAcgvgLlbwZiZTwlizJUDUjtVSB2QjfwORD/A+K7QOxLQpHlC9UDMuMpsoHYvEcsRg4GsIGEvEcsBgcDQIABADRxLsmwxCUEAAAAAElFTkSuQmCC"/>
      </defs>
  </svg>
   

export  const PlayIcon = () =>
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <rect width="15" height="15" fill="url(#pattern1)"/>
    <defs>
      <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image1" transform="scale(0.05)"/>
      </pattern>
      <image 
        id="image1" 
        width="20" 
        height="20" 
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Njk2NkQ1MEY3QzRFMTFFQUJFRTVDQjU2NzQ3MTVFQ0UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Njk2NkQ1MTA3QzRFMTFFQUJFRTVDQjU2NzQ3MTVFQ0UiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2OTY2RDUwRDdDNEUxMUVBQkVFNUNCNTY3NDcxNUVDRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2OTY2RDUwRTdDNEUxMUVBQkVFNUNCNTY3NDcxNUVDRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtXrIUgAAACLSURBVHjazNWxDYAgEIXh08qpxIV0Dcey1zV0DfEVmBAicNxdoclvosUXiAhEHW3IITIJNx+ygQN2oMsEDsiKBrSo4Qh8X+rgD1AHF0AZzADb4AaQBwvAEjz2pLtu5KPnXjrlGZ3RyCbpR8lDjcumDjEXNh+q/HrtUGZzkEMJuCeQ+9UGa3oEPAIMADCoVAfiss77AAAAAElFTkSuQmCC"/>
    </defs>
  </svg>
