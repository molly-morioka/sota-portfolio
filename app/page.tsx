export default function Home() {
  return (
    <div className="bg-gray-50 text-black min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen px-6">
        <h1 className="text-6xl font-bold mb-4">Sota</h1>
        <p className="text-xl text-gray-600 mb-2">
          Photographer × Developer × Podcaster
        </p>
        <p className="text-lg text-gray-500">
          写真とコード、そして声で。
        </p>
      </section>
    </div>
  );
}