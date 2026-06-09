async function getPhotos() {
  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
  const token = process.env.AIRTABLE_API_TOKEN;

  const response = await fetch(
    `https://api.airtable.com/v0/${baseId}/Photos`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data.records || [];
}

export default async function Home() {
  const photos = await getPhotos();

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

      {/* Photos Section */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-4xl font-bold mb-12 text-center">Photos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {photos.map((photo: any) => {
            // Airtable の attachments 配列から最初の画像を取得
            const imageUrl = photo.fields.image?.[0]?.url;

            return (
              <div key={photo.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                {/* 画像 */}
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={photo.fields.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}

                {/* テキスト */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {photo.fields.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {photo.fields.category}
                  </p>
                  {photo.fields.description && (
                    <p className="text-xs text-gray-500 mt-2">
                      {photo.fields.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}