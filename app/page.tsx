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
      <section className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-4xl">
          {/* Profile Image - Left */}
          <div className="flex-shrink-0">
            <img 
              src="/sota-profile.JPG"
              alt="Sota"
              className="w-40 h-40 md:w-48 md:h-48 rounded-lg object-cover shadow-md hover:shadow-lg transition-shadow"
            />
          </div>
          
          {/* Text Content - Right */}
          <div className="text-center md:text-left">
            <h1 className="text-6xl font-bold mb-4">Sota / Molly</h1>
            <p className="text-xl text-gray-600 mb-2">
              Photographer × Podcaster
            </p>
            <p className="text-lg text-gray-500">
              写真と声で私を表現する。
            </p>
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section className="py-20 px-6 bg-white">
        <div className="flex items-center justify-center gap-4 mb-12">
          <h2 className="text-4xl font-bold">Photos</h2>
          <a 
            href="https://www.instagram.com/molly.m_photographer/?hl=ja" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition"
            title="Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {photos.map((photo: any) => {
            const imageUrl = photo.fields.image?.[0]?.url;

            return (
              <div key={photo.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
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

      {/* Podcast Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-amber-950 via-slate-900 to-slate-950 text-white">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title with Image */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src="/morioku-bg.png" alt="もりぽつ" className="w-12 h-12 md:w-16 md:h-16 rounded-md object-cover flex-shrink-0" />
            <h2 className="text-2xl md:text-5xl font-light tracking-wide leading-tight">
              森岡の今夜も<br className="md:hidden" />ポツリ説法堂
            </h2>
          </div>
          
          <p className="text-sm text-gray-400 mb-6">
            #もりぽつ<br className="md:hidden" />Season 2 配信中
          </p>
          <p className="text-base text-gray-300 mb-10 leading-relaxed font-light">
            日常の小さな気づき、<br className="md:hidden" />
            人間関係のモヤモヤ、<br className="md:hidden" />
            仕事や趣味の話を、<br className="md:hidden" />
            ゆるく語ります。
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://stand.fm" target="_blank" rel="noreferrer" className="border border-gray-500 text-gray-300 px-6 py-2 rounded-full text-sm hover:border-white hover:text-white transition">
              stand.fm
            </a>
            <a href="https://www.youtube.com/channel/UCUi9xIb20tkPe7CV_u39eMw" target="_blank" rel="noreferrer" className="border border-gray-500 text-gray-300 px-6 py-2 rounded-full text-sm hover:border-white hover:text-white transition">
              YouTube
            </a>
            <a href="https://spotify.com" target="_blank" rel="noreferrer" className="border border-gray-500 text-gray-300 px-6 py-2 rounded-full text-sm hover:border-white hover:text-white transition">
              Spotify
            </a>
          </div>
        </div>
      </section>

     {/* Contact Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Contact</h2>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-12">
            <p className="text-base md:text-lg text-gray-700 mb-8">
              ご質問やご依頼は、<br className="md:hidden" />
              Instagram の DM からお気軽に<br className="md:hidden" />
              ご連絡ください。
            </p>
            <div className="flex justify-center">
              <a 
                href="https://www.instagram.com/molly.m_photographer/?hl=ja" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 bg-gray-100 text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-gray-200 transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
                @molly.m_photographer
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
