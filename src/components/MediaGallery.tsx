import React, { useState } from 'react';

interface MediaItem {
  slug: string;
  data: {
    title: string;
    category: 'movie' | 'series' | 'anime' | 'book';
    image: string;
    rating?: string;
    year?: string;
    status?: string;
  };
}

interface Props {
  media: MediaItem[];
}

const categories = [
  { id: 'all', label: 'ALL_RECORDS' },
  { id: 'movie', label: 'MOVIES' },
  { id: 'series', label: 'SERIES' },
  { id: 'anime', label: 'ANIME' },
  { id: 'book', label: 'BOOKS' },
];

const MediaGallery: React.FC<Props> = ({ media }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredMedia = activeTab === 'all' 
    ? media 
    : media.filter(item => item.data.category === activeTab);

  // Reset page when tab changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
  const paginatedMedia = filteredMedia.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-12">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-8 border-b border-[var(--line)] pb-8">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`font-mono text-[11px] uppercase tracking-widest transition-all ${
              activeTab === cat.id
                ? 'text-[var(--accent)]'
                : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedMedia.map((item) => (
          <a
            key={item.slug}
            href={`/media/${item.slug}`}
            className="group relative aspect-[2/3] overflow-hidden border border-[var(--line)] hover:border-[var(--accent)] transition-all duration-500"
          >
            <img
              src={item.data.image}
              alt={item.data.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              referrerPolicy="no-referrer"
            />

            {/* Overlay Info */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--ink-muted)] bg-[var(--bg)]/80 px-2 py-1 border border-[var(--line)]">
                  {item.data.category}
                </span>
                {item.data.rating && (
                  <span className="font-mono text-[9px] text-[var(--accent)] bg-[var(--bg)]/80 px-2 py-1 border border-[var(--accent)]/20">
                    {item.data.rating}/10
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-display italic leading-tight text-[var(--ink)]">{item.data.title}</h3>
                <div className="flex justify-between items-center font-mono text-[9px] text-[var(--ink-muted)] uppercase tracking-widest">
                  <span>{item.data.year}</span>
                  {item.data.status && <span>{item.data.status}</span>}
                </div>
              </div>
            </div>

            {/* Static Label */}
            <div className="absolute top-4 right-4 font-mono text-[8px] text-[var(--ink-muted)] group-hover:opacity-0 transition-opacity">
              ID_{item.slug.toUpperCase()}
            </div>
          </a>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <div className="py-20 text-center font-mono text-sm text-[var(--ink-muted)] italic">
          NO_RECORDS_FOUND_IN_CATEGORY
        </div>
      )}

      {totalPages > 1 && (
        <nav className="py-20 border-t border-[var(--line)] flex justify-between items-center font-mono text-[11px] uppercase tracking-widest text-[var(--ink-secondary)]">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`transition-colors ${currentPage === 1 ? 'text-[var(--ink-muted)] cursor-not-allowed' : 'hover:text-[var(--accent)]'}`}
          >
            ← PREV_PAGE
          </button>

          <div className="flex gap-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={currentPage === num ? 'text-[var(--accent)]' : 'text-[var(--ink-secondary)] hover:text-[var(--ink)]'}
              >
                {num.toString().padStart(2, '0')}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`transition-colors ${currentPage === totalPages ? 'text-[var(--ink-muted)] cursor-not-allowed' : 'hover:text-[var(--accent)]'}`}
          >
            NEXT_PAGE →
          </button>
        </nav>
      )}
    </div>
  );
};

export default MediaGallery;
