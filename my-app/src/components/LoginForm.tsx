'use client';

import { useState } from 'react';

interface LoginFormProps {
    onLogin: (adminKey: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
    const [adminKey, setAdminKey] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (adminKey === process.env.NEXT_PUBLIC_ADMIN_KEY) {
            localStorage.setItem('adminKey', adminKey);
            onLogin(adminKey);
            setError('');
        } else {
            setError('잘못된 관리자 키입니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="adminKey" className="block text-sm font-medium text-gray-700">
                    관리자 키
                </label>
                <input
                    type="password"
                    id="adminKey"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    placeholder="관리자 키를 입력하세요"
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-md hover:from-pink-600 hover:to-rose-600 transition-colors"
            >
                로그인
            </button>
        </form>
    );
} 