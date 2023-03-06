import React from 'react'

import ContentLoader from 'react-content-loader'

export default function TrackPositionPlotLoaderComponent() {    
    return (
        <ContentLoader style={{height: 650, width: '100%'}}>
            <rect x="0" y="60" rx="3" ry="3" width="100%" height="30" />            
            <rect x="0" y="120" rx="3" ry="3" width="calc(100% - 20%)" height="20" />            
            <rect x="0" y="155" rx="3" ry="3" width="100%" height="100%" />                        
        </ContentLoader>
    )
}
