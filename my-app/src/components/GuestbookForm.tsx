'use client';

import { useState } from 'react';

interface GuestbookFormProps {
    isDarkMode?: boolean;
}

export default function GuestbookForm({ isDarkMode = false }: GuestbookFormProps) {
    return (
        <div className={`text-center p-8 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}>
            <div className="animate-float mb-6">
                <svg
                    className={`w-16 h-16 mx-auto ${isDarkMode ? 'text-pink-400' : 'text-pink-500'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                </svg>
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Coming Soon
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                방명록 기능을 준비 중입니다.
            </p>
        </div>
    );
} 