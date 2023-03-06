import React from 'react'

import ContentLoader from 'react-content-loader'

export default function PlaylistLoaderComponent() {    
    return (
        <ContentLoader style={{height: 300, width: '100%'}}>            
            <rect x="0" y="20" rx="3" ry="3" width="335" height="120" />                        
            <rect x="375" y="20" rx="3" ry="3" width="335" height="120" />                        
            <rect x="0" y="160" rx="3" ry="3" width="335" height="120" />                        
        </ContentLoader>
    )
}
