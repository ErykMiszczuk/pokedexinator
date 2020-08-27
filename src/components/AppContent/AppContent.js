import React from 'react';
import './AppContent.css';
import AppContentTopBar from '../AppContentTopBar/AppContentTopBar';
import AppContentArea from '../AppContentArea/AppContentArea';

function AppContent(props) {
    return (
        <div className="app_content">
            <AppContentTopBar />
            <AppContentArea />
        </div>
    )
}

export default AppContent;