import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our E-commerce</h1>
        <div className="space-x-4">
          <Link
            href="/auth"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get Started
          </Link>
          <Link
            href="/auth"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
