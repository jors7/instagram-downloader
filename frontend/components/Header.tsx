import { Instagram } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">IG Downloader</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How it works
            </a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors">
              FAQ
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}