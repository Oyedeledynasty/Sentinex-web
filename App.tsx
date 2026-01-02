
import React, { useState } from 'react';
import { Logo, EmailIcon, LocationIcon } from './components/Icons';
import { BlogCard } from './components/BlogCard';
import { Sidebar } from './components/Sidebar';
import { PostDetail } from './components/PostDetail';
import { Home } from './components/Home';
import { Contact } from './components/Contact';
import { Consulting } from './components/Consulting';
import { About } from './components/About';
import { Product } from './components/Product';
import { Legal } from './components/Legal';
import { Post } from './types';
import { INITIAL_POSTS } from './constants';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeTab, setActiveTab] = useState('Home');

  const navItems = ['Home', 'About', 'Product', 'Consulting', 'Insights', 'Contact'];

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <Home 
            onStartConversation={() => setActiveTab('Contact')} 
            onViewPlatform={() => setActiveTab('Product')}
            onViewConsulting={() => setActiveTab('Consulting')}
          />
        );
      case 'About':
        return <About />;
      case 'Product':
        return <Product onDemoRequest={() => setActiveTab('Contact')} />;
      case 'Contact':
        return <Contact />;
      case 'Consulting':
        return <Consulting onContact={() => setActiveTab('Contact')} />;
      case 'Privacy':
        return <Legal type="privacy" onBack={() => setActiveTab('Home')} />;
      case 'Terms':
        return <Legal type="terms" onBack={() => setActiveTab('Home')} />;
      case 'Insights':
        return (
          <>
            {!selectedPost && (
              <section className="bg-white border-b border-gray-50 pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4">
                  <span className="text-xs font-bold tracking-widest text-[#166534] uppercase mb-4 block animate-pulse">
                    OUR BLOG
                  </span>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <h1 className="text-5xl font-bold text-[#166534] tracking-tight">
                      Insights and Updates
                    </h1>
                  </div>
                </div>
              </section>
            )}

            <main className={`max-w-7xl mx-auto px-4 ${selectedPost ? 'py-12' : 'py-16'}`}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  {selectedPost ? (
                    <PostDetail post={selectedPost} onBack={handleBack} />
                  ) : (
                    posts.map((post, idx) => (
                      <BlogCard 
                        key={post.id} 
                        post={post} 
                        isFirst={idx === 0} 
                        onClick={handlePostClick}
                      />
                    ))
                  )}
                </div>
                <aside className="lg:col-span-1">
                  <div className="sticky top-28">
                    <Sidebar />
                  </div>
                </aside>
              </div>
            </main>
          </>
        );
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 py-32 text-center">
            <h2 className="text-3xl font-bold text-[#14532d]">{activeTab} Page</h2>
            <p className="text-gray-500 mt-4">This section is currently under development.</p>
            <button 
              onClick={() => setActiveTab('Home')}
              className="mt-8 text-[#14532d] font-bold underline"
            >
              Back to Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => { setActiveTab('Home'); handleBack(); }}>
            <Logo />
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  if (item === 'Insights') handleBack();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative text-sm font-medium transition-all duration-300 py-2.5 px-6 rounded-xl flex flex-col items-center group ${
                  activeTab === item 
                    ? 'text-[#166534] bg-[#f0f9f4]' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item}
                {activeTab === item && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 bg-[#166534] rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {renderContent()}

      <footer className="bg-[#14532d] text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
            <div className="md:col-span-5 space-y-6">
              <Logo color="text-white" iconBg="bg-white/10 border border-white/20" />
              <p className="text-gray-300 text-base leading-relaxed max-w-sm">
                Clear insight for Nigeria. SentiNEX helps teams understand public sentiment through data-aware insights, transforming noise into actionable strategy.
              </p>
              <p className="text-[#fbbf24] font-medium text-sm">
                Built for Nigeria with care.
              </p>
            </div>

            <div className="md:col-span-3 space-y-6">
              <h4 className="text-lg font-bold">Company</h4>
              <ul className="space-y-4">
                <li><button onClick={() => setActiveTab('About')} className="text-gray-300 hover:text-white transition-colors text-left">About Us</button></li>
                <li><button onClick={() => setActiveTab('Product')} className="text-gray-300 hover:text-white transition-colors text-left">Platform</button></li>
                <li><button onClick={() => setActiveTab('Consulting')} className="text-gray-300 hover:text-white transition-colors text-left">Consulting</button></li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-300">Careers</span>
                  <span className="bg-white/10 text-[10px] px-1.5 py-0.5 rounded border border-white/10 text-white/60">Future</span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-6">
              <h4 className="text-lg font-bold">Contact</h4>
              <ul className="space-y-5">
                <li className="flex items-center gap-3 text-gray-300">
                  <EmailIcon />
                  <a href="mailto:info@sentinex.co" className="hover:text-white transition-colors">info@sentinex.co</a>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <LocationIcon />
                  <span>Lagos, Nigeria</span>
                </li>
              </ul>
              <div className="pt-4">
                <button 
                  onClick={() => setActiveTab('Contact')}
                  className="px-6 py-2.5 border border-white/20 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium"
                >
                  Get in touch
                </button>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-gray-400">
              © 2025 SentiNEX. All rights reserved.
            </div>
            <div className="flex gap-8 text-sm text-gray-400">
              <button onClick={() => setActiveTab('Privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => setActiveTab('Terms')} className="hover:text-white transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
