import React, { useState, useMemo } from 'react';

interface Post {
  slug: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    tags: string[];
    heroImage?: string;
  };
}

interface Props {
  posts: Post[];
}

const BlogSearch: React.FC<Props> = ({ posts }) => {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPosts = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    const filtered = query 
      ? posts.filter(post => 
          post.data.title.toLowerCase().includes(lowerQuery) ||
          post.data.description.toLowerCase().includes(lowerQuery) ||
          post.data.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        )
      : posts;
    
    // Reset to page 1 when query changes
    return filtered;
  }, [query, posts]);

  // Reset page when query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-12">
      <div className="relative">
        <input
          type="text"
          placeholder="SEARCH_ARCHIVE..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent border-b border-[var(--line)] py-4 font-mono text-sm uppercase tracking-widest focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--ink-muted)] text-[var(--ink)]"
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[var(--ink-muted)]">
          {filteredPosts.length} / {posts.length} RECORDS_FOUND
        </div>
      </div>

      <div className="flex flex-col gap-16">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => (
            <article key={post.slug} className="group border-b border-[var(--line)] pb-16 last:border-0">
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="w-full lg:w-1/3 aspect-video overflow-hidden border border-[var(--line)] relative group-hover:border-[var(--accent)] transition-all duration-500">
                  <a href={`/blog/${post.slug}`} className="block w-full h-full">
                    <img
                      src={post.data.heroImage || `https://picsum.photos/seed/${post.slug}/800/450`}
                      alt={post.data.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </a>
                </div>
                <div className="w-full lg:w-2/3">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--ink-muted)] mb-4">
                    {new Date(post.data.pubDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <a href={`/blog/${post.slug}`} className="block group-hover:text-[var(--accent)] transition-colors">
                    <h2 className="text-4xl font-display font-light mb-4 leading-tight text-[var(--ink)]">{post.data.title}</h2>
                  </a>
                  <p className="text-lg text-[var(--ink-secondary)] font-light mb-6 max-w-2xl line-clamp-2">{post.data.description}</p>
                  <div className="flex gap-4">
                    {post.data.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono uppercase tracking-widest text-[var(--ink-muted)] border border-[var(--line)] px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="py-20 text-center font-mono text-sm text-[var(--ink-muted)] italic">
            NO_RECORDS_MATCH_QUERY
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <nav className="py-20 border-t border-[var(--line)] flex justify-between items-center font-mono text-[11px] uppercase tracking-widest text-[var(--ink-secondary)]">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`transition-colors ${currentPage === 1 ? 'text-[var(--ink-muted)] cursor-not-allowed' : 'text-[var(--ink-secondary)] hover:text-[var(--accent)]'}`}
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
            className={`transition-colors ${currentPage === totalPages ? 'text-[var(--ink-muted)] cursor-not-allowed' : 'text-[var(--ink-secondary)] hover:text-[var(--accent)]'}`}
          >
            NEXT_PAGE →
          </button>
        </nav>
      )}
    </div>
  );
};

export default BlogSearch;
