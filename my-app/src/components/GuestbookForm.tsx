'use client';

import React from 'react';

interface GuestbookFormProps {
    isDarkMode: boolean;
}

const GuestbookForm: React.FC<GuestbookFormProps> = ({ isDarkMode }) => {
    return (
        <div className="text-center">
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                방명록 기능은 현재 준비 중입니다.
            </p>
        </div>
    );
};

export default GuestbookForm; 