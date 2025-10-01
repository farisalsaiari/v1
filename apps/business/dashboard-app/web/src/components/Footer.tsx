export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Your Company. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-500 hover:text-gray-700">
                            <span className="sr-only">Help</span>
                            <span>Help Center</span>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-700">
                            <span className="sr-only">Terms</span>
                            <span>Terms</span>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-700">
                            <span className="sr-only">Privacy</span>
                            <span>Privacy</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}