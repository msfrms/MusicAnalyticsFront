import React from 'react'

import ContentLoader from 'react-content-loader'

export default function TrackInfoLoaderComponent() {
    return (
        <ContentLoader style={{height: 180, width: '100%'}}>
            <rect x="0" y="0" rx="3" ry="3" width="180" height="180" />            
            <rect x="220" y="0" rx="3" ry="3" width="250" height="25" />            
            <rect x="220" y="30" rx="3" ry="3" width="150" height="15" />            
            <rect x="220" y="90" rx="3" ry="3" width="300" height="15" />            
            <rect x="220" y="110" rx="3" ry="3" width="350" height="15" />            
            <rect x="220" y="160" rx="3" ry="3" width="130" height="20" />            
            <rect x="380" y="160" rx="3" ry="3" width="130" height="20" />            
        </ContentLoader>
    )
}
