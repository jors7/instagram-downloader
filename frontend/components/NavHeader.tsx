'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Image, Film, PlayCircle, Layers, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Photo', href: '/', icon: Image },
  { name: 'Reels', href: '/reels', icon: PlayCircle },
  { name: 'Story', href: '/story', icon: Film },
  { name: 'Carousel', href: '/carousel', icon: Layers },
];

export default function NavHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="py-6">
          <nav className="flex justify-center">
            <div className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200",
                      pathname === item.href
                        ? "bg-white text-purple-600 shadow-lg"
                        : "text-white/90 hover:bg-white/20"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}