export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="mb-4">© 2025 IG Downloader. All rights reserved.</p>
          <p className="text-sm text-gray-400">
            This tool is not affiliated with Instagram. We respect the intellectual property rights of others.
          </p>
          <div className="mt-6 flex justify-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}