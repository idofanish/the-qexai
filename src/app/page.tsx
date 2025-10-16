export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center bg-gray-50 p-6">
      <h1 className="text-5xl font-bold text-red-600 mb-4 hover:text-blue-700">
        Welcome to The QEX AI
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Building Trust in Intelligent Systems
      </p>
      <button className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
        Get Started
      </button>
    </main>
  );
}
