'use client';

import { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import Image from 'next/image';
import ScrollProgress from '../components/ScrollProgress';
import GuestbookForm from '../components/GuestbookForm';
import CursorParticles from '../components/CursorParticles';
import BackgroundParticles from '../components/BackgroundParticles';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [showScrollIcon, setShowScrollIcon] = useState<boolean>(true);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);

  const handleLogin = () => {
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

    // 다크모드 토글 시 트랜지션 효과 추가
    document.body.classList.add('theme-transition');

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 다크모드 토글 시 일정 시간 후 트랜지션 효과 제거
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 1000);
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

  return (
    <div className={`min-h-screen transition-colors duration-300 scroll-smooth ${isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      : 'bg-gradient-to-br from-pink-50 via-white to-rose-50'
      }`}>
      <CursorParticles />
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

          {/* Current Time */}
          <div className={`mb-6 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-pink-50/50'}`}>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {new Date().toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </p>
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

            {/* Social Links */}
            <li className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <a
                href="https://dev-jjeong9.tistory.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center transition-colors ${isDarkMode
                  ? 'text-gray-300 hover:text-pink-500'
                  : 'text-gray-600 hover:text-pink-500'
                  }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Blog
              </a>
            </li>
            <li>
              <a
                href="https://github.com/yanghyunjung"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center transition-colors ${isDarkMode
                  ? 'text-gray-300 hover:text-pink-500'
                  : 'text-gray-600 hover:text-pink-500'
                  }`}
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </li>

            {/* Admin Section */}
            <li className="pt-4 border-t border-gray-200 dark:border-gray-700">
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
      <main className="ml-64 relative">
        <div className="fixed inset-0 -z-10">
          <div className={`absolute inset-0 transition-opacity duration-1000 ${isDarkMode ? 'opacity-100' : 'opacity-0'
            }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse"></div>
            </div>
          </div>
          <div className={`absolute inset-0 transition-opacity duration-1000 ${isDarkMode ? 'opacity-0' : 'opacity-100'
            }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-rose-50">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,192,203,0.2),transparent_50%)] animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section id="home" className="flex flex-col items-center justify-center min-h-screen px-4 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,192,203,0.2),transparent_50%)] animate-pulse"></div>
            </div>
            <BackgroundParticles />
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/20 dark:bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rose-500/20 dark:bg-rose-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Profile Image */}
          <div className="fixed top-8 right-8 w-32 h-32 z-10 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-pink-200 dark:border-gray-700 shadow-lg transform hover:scale-105 transition-transform duration-300 animate-float">
            <Image
              src="/me.png"
              alt="Hyunjung Yang"
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Main Content */}
          <div className="text-center max-w-4xl transform hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text animate-gradient cute-title">
                Hyunjung Yang
              </h1>
              <div className="absolute -top-4 -right-4 w-8 h-8 animate-spin-slow">
                <svg className="w-full h-full text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            <div className="space-y-4">
              <p className={`text-xl md:text-2xl mb-4 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} cute-subtitle`}>
                Frontend Engineer
              </p>
              <div className="space-y-2">
                <p className={`text-lg md:text-xl transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} cute-text`}>
                  새로운 기술 트렌드를 학습하고 적용하는 것을 즐깁니다.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className={`p-4 rounded-xl backdrop-blur-sm ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                  <p className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'} cute-title`}>3+</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} cute-text`}>Years Experience</p>
                </div>
                <div className={`p-4 rounded-xl backdrop-blur-sm ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                  <p className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'} cute-title`}>10+</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} cute-text`}>Projects</p>
                </div>
                <div className={`p-4 rounded-xl backdrop-blur-sm ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                  <p className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'} cute-title`}>5+</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} cute-text`}>Technologies</p>
                </div>
              </div>

              {/* 기술 스택 미리보기 */}
              <div className="mt-8">
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} cute-subtitle`}>
                  Tech Stack
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['React', 'TypeScript'].map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-sm cute-text ${isDarkMode
                        ? 'bg-gray-800/50 text-gray-300'
                        : 'bg-white/50 text-gray-700'}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <a
                href="https://dev-jjeong9.tistory.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105 hover:from-pink-600 hover:to-rose-600 transform hover:-translate-y-1"
              >
                <span className="flex items-center space-x-2">
                  <span>Blog</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
              <a
                href="https://github.com/yanghyunjung"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105 hover:from-pink-700 hover:to-rose-700 transform hover:-translate-y-1"
              >
                <span className="flex items-center space-x-2">
                  <span>GitHub</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
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

        {/* Skills Section with enhanced cards */}
        <section id="skills" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text animate-gradient">
              Skills (스킬셋)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Frontend Skills */}
              <div className={`backdrop-blur-sm p-8 rounded-2xl shadow-lg border ${isDarkMode
                ? 'bg-gray-800/80 border-gray-700'
                : 'bg-white/80 border-pink-100'
                }`}>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text">
                  Frontend
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      name: 'React',
                      level: 95,
                      icon: '⚛️',
                      description: '컴포넌트 기반 개발과 상태 관리에 능숙하며, React Hooks를 활용한 효율적인 개발 경험이 있습니다.'
                    },
                    {
                      name: 'TypeScript',
                      level: 85,
                      icon: '📘',
                      description: '타입 안정성을 통한 안정적인 개발 환경 구축과 인터페이스 설계에 능숙합니다.'
                    },
                    {
                      name: 'React Query',
                      level: 85,
                      icon: '🔄',
                      description: '서버 상태 관리와 캐싱 전략을 효율적으로 구현할 수 있습니다.'
                    },
                    {
                      name: 'Redux',
                      level: 85,
                      icon: '📦',
                      description: '복잡한 상태 관리와 미들웨어를 활용한 비동기 처리에 능숙합니다.'
                    },
                    {
                      name: 'Styled-Components',
                      level: 90,
                      icon: '💅',
                      description: 'CSS-in-JS를 활용한 컴포넌트 스타일링에 능숙합니다.'
                    },
                    {
                      name: 'Tailwind CSS',
                      level: 95,
                      icon: '🎨',
                      description: '유틸리티 기반의 빠른 스타일링과 반응형 디자인 구현에 능숙합니다.'
                    },
                  ].map((skill) => (
                    <div key={skill.name} className="group">
                      <div className={`p-4 rounded-lg transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-pink-50/50'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">{skill.icon}</span>
                            <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                              {skill.name}
                            </span>
                          </div>
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
                          <div
                            className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <p className={`text-sm transition-all duration-300 max-h-0 overflow-hidden group-hover:max-h-20 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {skill.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Others */}
              <div className={`backdrop-blur-sm p-8 rounded-2xl shadow-lg border ${isDarkMode
                ? 'bg-gray-800/80 border-gray-700'
                : 'bg-white/80 border-pink-100'
                }`}>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text">
                  Tools & Others
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      name: 'GitHub',
                      level: 90,
                      icon: '🐙',
                      description: '버전 관리와 협업을 위한 Git 사용에 능숙하며, GitHub를 통한 프로젝트 관리 경험이 풍부합니다.'
                    },
                    {
                      name: 'Confluence',
                      level: 85,
                      icon: '📝',
                      description: '프로젝트 문서화와 지식 공유를 위한 Confluence 활용에 능숙합니다.'
                    },
                    {
                      name: 'Slack',
                      level: 80,
                      icon: '💬',
                      description: '팀 커뮤니케이션과 협업을 위한 Slack 활용에 능숙합니다.'
                    },
                    {
                      name: 'Jira',
                      level: 85,
                      icon: '📋',
                      description: '애자일 방법론을 통한 프로젝트 관리와 이슈 트래킹에 능숙합니다.'
                    },
                    {
                      name: 'VS Code',
                      level: 95,
                      icon: '💻',
                      description: 'VS Code를 활용한 효율적인 개발 환경 구축과 확장 프로그램 활용에 능숙합니다.'
                    },
                    {
                      name: 'Figma',
                      level: 40,
                      icon: '🎨',
                      description: 'Fimga를 통해 디자이너와의 협업 경험이 있습니다.'
                    },
                  ].map((skill) => (
                    <div key={skill.name} className="group">
                      <div className={`p-4 rounded-lg transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-pink-50/50'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">{skill.icon}</span>
                            <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                              {skill.name}
                            </span>
                          </div>
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
                          <div
                            className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <p className={`text-sm transition-all duration-300 max-h-0 overflow-hidden group-hover:max-h-20 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {skill.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="notion" className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text animate-gradient">
              Portfolio (포트폴리오)
            </h2>
            <div className={`backdrop-blur-sm p-8 rounded-2xl shadow-lg border duration-300 ${isDarkMode
              ? 'bg-gray-800/80 border-gray-700 hover:bg-gray-700/80'
              : 'bg-white/80 border-pink-100 hover:bg-white/90'
              }`}>
              <div className="text-center">
                <p className={`mb-8 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  더 많은 프로젝트들은 노션에서 확인하실 수 있습니다.
                </p>
                <a
                  href="https://devjjung.notion.site/Frontend-Engineer_-a392d62685ef495d839f566901c28533"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold shadow-lg"
                >
                  <span className="flex items-center space-x-2">
                    <span>Notion</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Guestbook Section */}
        <section id="guestbook" className={`py-20 ${isDarkMode
          ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-b from-gray-50 to-white'}`}>
          <div className="container mx-auto px-4">
            <h2 className={`text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent ${isDarkMode ? 'animate-gradient' : ''}`}>
              Guestbook (방명록)
            </h2>
            <div className={`max-w-2xl mx-auto backdrop-blur-sm p-8 rounded-2xl shadow-lg border ${isDarkMode
              ? 'bg-gray-800/80 border-gray-700'
              : 'bg-white/80 border-pink-100'}`}>
              <GuestbookForm isDarkMode={isDarkMode} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
