'use client';

import { useState } from 'react';
import { GuestbookFormData } from '../types/guestbook';

interface GuestbookFormProps {
    onSubmit: (data: GuestbookFormData) => Promise<void>;
    isDarkMode: boolean;
}

export default function GuestbookForm({ onSubmit, isDarkMode }: GuestbookFormProps) {
    const [formData, setFormData] = useState<GuestbookFormData>({
        name: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.name.trim() || !formData.message.trim()) {
            setError('이름과 메시지를 모두 입력해주세요.');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            setFormData({ name: '', message: '' });
        } catch (error) {
            console.error('Failed to submit message:', error);
            setError('메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                    {error}
                </div>
            )}
            <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    이름
                </label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${isDarkMode
                        ? 'bg-gray-800 border-gray-700 text-gray-300 placeholder-gray-500'
                        : 'bg-white border-pink-200 text-gray-800 placeholder-gray-400'
                        }`}
                    placeholder="이름을 입력해주세요"
                    required
                />
            </div>
            <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    메시지
                </label>
                <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent min-h-[100px] transition-colors ${isDarkMode
                        ? 'bg-gray-800 border-gray-700 text-gray-300 placeholder-gray-500'
                        : 'bg-white border-pink-200 text-gray-800 placeholder-gray-400'
                        }`}
                    placeholder="메시지를 입력해주세요"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold shadow-lg transition-all cursor-pointer hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? '전송 중...' : '메시지 남기기'}
            </button>
        </form>
    );
} 