'use client';

import { useState, useEffect } from 'react';
import GuestbookForm from '../components/GuestbookForm';
import GuestbookList from '../components/GuestbookList';
import { GuestbookMessage, GuestbookFormData } from '../types/guestbook';
import LoginForm from '../components/LoginForm';
import Image from 'next/image';
import ScrollProgress from '../components/ScrollProgress';
import dynamic from 'next/dynamic';

// 동적 임포트로 컴포넌트 최적화
const DynamicGuestbookForm = dynamic(() => import('../components/GuestbookForm'), {
  loading: () => <div className="animate-pulse h-64 bg-gray-200 dark:bg-gray-700 rounded-lg" />
});

const DynamicGuestbookList = dynamic(() => import('../components/GuestbookList'), {
  loading: () => <div className="animate-pulse h-64 bg-gray-200 dark:bg-gray-700 rounded-lg" />
});

export default function Home() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [showScrollIcon, setShowScrollIcon] = useState<boolean>(true);
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);

  const handleSubmitMessage = async (data: GuestbookFormData) => {
    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit message');
      }

      const newMessage = await response.json();
      setMessages((prev) => [newMessage, ...(Array.isArray(prev) ? prev : [])]);
    } catch (error) {
      console.error('Failed to submit message:', error);
      throw error;
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      const adminKey = localStorage.getItem('adminKey');
      if (!adminKey) {
        alert('관리자 권한이 필요합니다.');
        return;
      }

      const response = await fetch(`/api/guestbook?id=${id}&adminKey=${adminKey}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete message');
      }

      setMessages((prev) => prev.filter((msg) => msg._id !== id && msg.id !== id));
    } catch (error) {
      console.error('Failed to delete message:', error);
      alert(error instanceof Error ? error.message : '메시지 삭제에 실패했습니다.');
    }
  };

  const handleLogin = (adminKey: string) => {
    setIsAdmin(true);
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminKey');
    setIsAdmin(false);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIcon(false);
      } else {
        setShowScrollIcon(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // 관리자 키 확인
    const adminKey = localStorage.getItem('adminKey');
    setIsAdmin(adminKey === process.env.NEXT_PUBLIC_ADMIN_KEY);
  }, []);

  // 메시지 로드
  useEffect(() => {
    const loadMessages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/guestbook');
        if (!response.ok) {
          throw new Error('Failed to load messages');
        }
        const data = await response.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load messages:', error);
        setMessages([
          {
            id: '1',
            name: '관리자',
            message: '환영합니다! 💕\n방문해주셔서 감사합니다.',
            createdAt: new Date().toISOString(),
            isAdmin: true,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 scroll-smooth ${isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      : 'bg-gradient-to-br from-pink-50 via-white to-rose-50'
      }`}>
      <ScrollProgress />
      {/* Left Menu */}
      <nav className={`fixed left-0 top-0 h-full w-64 backdrop-blur-sm shadow-lg border-r transition-colors duration-300 ${isDarkMode
        ? 'bg-gray-800/80 border-gray-700'
        : 'bg-white/80 border-pink-100'
        }`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text">
              Menu
            </h2>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? (
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
          <ul className="space-y-4">
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center transition-colors ${isDarkMode
                  ? 'text-gray-300 hover:text-pink-500'
                  : 'text-gray-600 hover:text-pink-500'
                  }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </a>
            </li>
            <li>
              <a
                href="#skills"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center transition-colors ${isDarkMode
                  ? 'text-gray-300 hover:text-pink-500'
                  : 'text-gray-600 hover:text-pink-500'
                  }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Skills
              </a>
            </li>
            <li>
              <a
                href="#notion"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('notion')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center transition-colors ${isDarkMode
                  ? 'text-gray-300 hover:text-pink-500'
                  : 'text-gray-600 hover:text-pink-500'
                  }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="#guestbook"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('guestbook')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center transition-colors ${isDarkMode
                  ? 'text-gray-300 hover:text-pink-500'
                  : 'text-gray-600 hover:text-pink-500'
                  }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Guestbook
              </a>
            </li>
            <li>
              <button
                onClick={isAdmin ? handleLogout : () => setShowLoginForm(!showLoginForm)}
                className={`flex items-center w-full transition-colors cursor-pointer ${isDarkMode
                  ? 'text-gray-300 hover:text-pink-500'
                  : 'text-gray-600 hover:text-pink-500'
                  }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {isAdmin ? '로그아웃' : '관리자 로그인'}
              </button>
            </li>
          </ul>
          {showLoginForm && (
            <div className={`mt-4 p-4 rounded-lg shadow-lg transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
              <LoginForm onLogin={handleLogin} />
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-64">
        {/* Hero Section */}
        <section id="home" className="flex flex-col items-center justify-center min-h-screen px-4 relative">
          {/* Profile Image */}
          <div className="fixed top-8 right-8 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-pink-200 dark:border-gray-700 shadow-lg">
            <Image
              src="/me.png"
              alt="Hyunjung Yang"
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="text-center max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text">
              Hyunjung Yang
            </h1>
            <p className={`text-xl md:text-2xl mb-12 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              Frontend Engineer
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://dev-jjeong9.tistory.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105"
              >
                Blog
              </a>
              <a
                href="https://github.com/yanghyunjung"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Scroll Icon */}
          <div
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out ${showScrollIcon
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
          >
            <div className="animate-bounce flex justify-center">
              <svg
                className="w-8 h-8 text-pink-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
            <p className={`text-center text-sm mt-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>아래로 스크롤하세요</p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text">
              Skills (스킬셋)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {['React', 'TypeScript', 'React Query', 'Redux', 'Styled-Components', 'Tailwind CSS', 'GitHub', 'Confluence', 'Slack'].map((skill) => (
                <div
                  key={skill}
                  className={`backdrop-blur-sm p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all hover:scale-105 border ${isDarkMode
                    ? 'bg-gray-800/80 border-gray-700 text-gray-300'
                    : 'bg-white/80 border-pink-100 text-gray-800'
                    }`}
                >
                  <h3 className="font-bold text-xl">{skill}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notion Portfolio Section */}
        <section id="notion" className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text">
              Portfolio (포트폴리오)
            </h2>
            <div className={`backdrop-blur-sm p-8 rounded-2xl shadow-lg border ${isDarkMode
              ? 'bg-gray-800/80 border-gray-700'
              : 'bg-white/80 border-pink-100'
              }`}>
              <div className="text-center">
                <p className={`mb-8 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  더 많은 프로젝트들은 노션에서 확인하실 수 있습니다.
                </p>
                <a
                  href="https://devjjung.notion.site/Frontend-Engineer_-a392d62685ef495d839f566901c28533"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105"
                >
                  Notion 보기
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Guestbook Section */}
        <section id="guestbook" className={`py-20 px-4 transition-colors ${isDarkMode
          ? 'bg-gradient-to-b from-gray-900 to-gray-800'
          : 'bg-gradient-to-b from-white to-pink-50'
          }`}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text">
              Guestbook (방명록)
            </h2>
            <div className={`backdrop-blur-sm p-8 rounded-2xl shadow-lg border ${isDarkMode
              ? 'bg-gray-800/80 border-gray-700'
              : 'bg-white/80 border-pink-100'
              }`}>
              <div className="space-y-8">
                <DynamicGuestbookForm onSubmit={handleSubmitMessage} isDarkMode={isDarkMode} />
                <div className="border-t border-pink-100 dark:border-gray-700 pt-8">
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink-500 border-t-transparent" />
                      <p className={`mt-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                        메시지를 불러오는 중...
                      </p>
                    </div>
                  ) : (
                    <DynamicGuestbookList
                      messages={messages}
                      isAdmin={isAdmin}
                      onDelete={handleDeleteMessage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
