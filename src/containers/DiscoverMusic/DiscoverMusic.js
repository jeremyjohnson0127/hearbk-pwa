import React, { useEffect } from 'react';
import DiscoverMusicContainer from '../../components/DisoverMusic/DiscoverMusicContainer';

const DiscoverMusic = () => {

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.fbq != null) {
                window.fbq('track', 'ViewContent');
            }
        }
    }, []);

    return (
        <DiscoverMusicContainer />
    )
}

export default DiscoverMusic;