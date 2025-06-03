'use client';

import { useState } from 'react';
import { GuestbookMessage } from '../types/guestbook';
import { motion } from 'framer-motion';

interface GuestbookListProps {
    messages: GuestbookMessage[];
    isAdmin?: boolean;
    onDelete?: (id: string) => Promise<void>;
}

export default function GuestbookList({ messages, isAdmin = false, onDelete }: GuestbookListProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!onDelete) return;
        if (!confirm('메시지를 삭제하시겠습니까?')) return;

        setDeletingId(id);
        try {
            await onDelete(id);
        } catch (error) {
            console.error('Failed to delete message:', error);
            alert('메시지 삭제에 실패했습니다.');
        } finally {
            setDeletingId(null);
        }
    };

    if (!Array.isArray(messages)) {
        return (
            <p className="text-center text-gray-500 py-8">
                메시지를 불러오는 중입니다
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {messages.length === 0 ? (
                <p className="text-center text-gray-500">아직 메시지가 없습니다.</p>
            ) : (
                messages.map((message, index) => (
                    <motion.div
                        key={message._id || message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`p-4 rounded-lg shadow-md ${message.isAdmin
                            ? 'bg-gradient-to-r from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-700'
                            : 'bg-white dark:bg-gray-800'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                    {message.name}
                                </span>
                                {message.isAdmin && (
                                    <span className="ml-2 px-2 py-1 text-xs bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 rounded-full">
                                        관리자
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(message.createdAt).toLocaleDateString()}
                                </span>
                                {isAdmin && (
                                    <button
                                        onClick={() => handleDelete(message._id || message.id)}
                                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{message.message}</p>
                    </motion.div>
                ))
            )}
            {messages.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                    아직 남겨진 메시지가 없습니다. 첫 번째 메시지를 남겨보세요! 💕
                </p>
            )}
        </div>
    );
} 