import React from 'react'

import ContentLoader from 'react-content-loader'

export default function TrackLoaderComponent() {
    return (
        <ContentLoader style={{height: 86, width: 340}}>
            <rect x="30" y="28" rx="1" ry="1" width="20" height="20" />
            <rect x="70" y="10" rx="3" ry="3" width="56" height="56" />
            <rect x="145" y="28" rx="1" ry="1" width="20" height="20" />
            <rect x="185" y="20" rx="3" ry="3" width="100%" height="15" />
            <rect x="185" y="40" rx="3" ry="3" width="100%" height="15" />
        </ContentLoader>
    )
}
