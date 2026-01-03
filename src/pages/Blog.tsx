/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import PostList from "../components/PostList";
import BlogHeroCard from "../components/BlogHeroCard";
import Footer from "../components/Footer";
import SocialFooter from "../components/SocialFooter";
import NewsletterSignup from "../components/NewsletterSignup";
import LoadMoreButton from "../components/Pagination/LoadMoreButton";
import NumberedPagination from "../components/Pagination/NumberedPagination";
import PostCountIndicator from "../components/Pagination/PostCountIndicator";
import siteConfig from "../config/siteConfig";
import { ArrowLeft } from "lucide-react";

// Local storage key for blog view mode preference
const BLOG_VIEW_MODE_KEY = "blog-view-mode";

// Blog page component
// Displays all published posts with featured blog posts layout:
// 1. Hero: first blogFeatured post (large card)
// 2. Featured row: remaining blogFeatured posts (2 columns)
// 3. Regular posts: non-featured posts (3 columns, paginated)
// Controlled by siteConfig.blogPage and siteConfig.postsDisplay settings
export default function Blog() {
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [allRegularPosts, setAllRegularPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Check if pagination is enabled and get mode
  const isPaginationEnabled = siteConfig.pagination?.enabled ?? false;
  const paginationMode = siteConfig.pagination?.mode ?? "load-more";
  const postsPerPage = siteConfig.pagination?.postsPerPage ?? 9;

  // Calculate skip for offset-based pagination
  const skipAmount = (currentPage - 1) * postsPerPage;

  // Fetch paginated regular posts (non-blogFeatured)
  // Use different queries based on pagination mode
  const paginatedPostsResult = useQuery(
    paginationMode === "numbered" ? api.posts.getPostsByPage : api.posts.getPaginatedPosts,
    paginationMode === "numbered"
      ? {
          offset: skipAmount,
          limit: postsPerPage,
          excludeUnlisted: true,
        }
      : {
          limit: postsPerPage,
          cursor: undefined,
          excludeUnlisted: true,
        },
  );

  // For load-more mode, we also need hasMore
  const cursorBasedResult = useQuery(
    api.posts.getPaginatedPosts,
    paginationMode === "load-more"
      ? {
          limit: postsPerPage,
          cursor: undefined,
          excludeUnlisted: true,
        }
      : "skip",
  );

  // Fetch all blog featured posts for hero + featured row
  const blogFeaturedPosts = useQuery(api.posts.getBlogFeaturedPosts);

  // Fetch footer content from Convex (synced via markdown)
  const footerPage = useQuery(api.pages.getPageBySlug, { slug: "footer" });

  // Fetch total count of regular posts for indicator
  const totalRegularPostsCount = useQuery(api.posts.getRegularPostsCount, {
    excludeUnlisted: true,
  });

  // Calculate total pages
  const totalPages = totalRegularPostsCount
    ? Math.ceil(totalRegularPostsCount / postsPerPage)
    : 1;

  // State for view mode toggle (list or cards)
  const [viewMode, setViewMode] = useState<"list" | "cards">(
    siteConfig.blogPage.viewMode,
  );

  // Track if we've loaded to prevent double-loading
  const isLoadingRef = useRef(false);

  // Update posts list when paginated data loads
  useEffect(() => {
    if (!isLoadingRef.current) {
      isLoadingRef.current = true;

      if (paginationMode === "numbered" && paginatedPostsResult) {
        // For numbered pagination, result is directly an array
        // Type guard to ensure it's an array (not the object type from getPaginatedPosts)
        const posts = Array.isArray(paginatedPostsResult)
          ? paginatedPostsResult
          : "posts" in paginatedPostsResult
            ? paginatedPostsResult.posts
            : [];
        setAllRegularPosts(posts);
        setIsLoading(false);
      } else if (paginationMode === "load-more" && cursorBasedResult?.posts) {
        // For load-more mode, result is an object with posts, nextCursor, hasMore
        if (currentPage === 1) {
          setAllRegularPosts(cursorBasedResult.posts);
        } else {
          setAllRegularPosts((prev) => [...prev, ...cursorBasedResult.posts]);
        }
        setIsLoading(false);
      }

      // Reset loading flag after a short delay
      setTimeout(() => {
        isLoadingRef.current = false;
      }, 100);
    }
  }, [paginatedPostsResult, cursorBasedResult, currentPage, paginationMode]);

  // Load saved view mode preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(BLOG_VIEW_MODE_KEY);
    if (saved === "list" || saved === "cards") {
      setViewMode(saved);
    }
  }, []);

  // Toggle view mode and save preference
  const toggleViewMode = () => {
    const newMode = viewMode === "list" ? "cards" : "list";
    setViewMode(newMode);
    localStorage.setItem(BLOG_VIEW_MODE_KEY, newMode);
  };

  // Load more posts handler (for load-more mode)
  const handleLoadMore = useCallback(() => {
    if (!isLoading && cursorBasedResult?.nextCursor) {
      setIsLoading(true);
      setCurrentPage((prev) => prev + 1);
    }
  }, [isLoading, cursorBasedResult?.nextCursor]);

  // Page change handler (for numbered pagination)
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    setIsLoading(true);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Check if posts should be shown on blog page
  const showPosts = siteConfig.postsDisplay.showOnBlogPage;

  // Check if footer should be shown on blog page
  const showFooter =
    siteConfig.footer.enabled && siteConfig.footer.showOnBlogPage;

  // Split featured posts: first one is hero, rest go to featured row
  const heroPost =
    blogFeaturedPosts && blogFeaturedPosts.length > 0
      ? blogFeaturedPosts[0]
      : null;
  const featuredRowPosts =
    blogFeaturedPosts && blogFeaturedPosts.length > 1
      ? blogFeaturedPosts.slice(1)
      : [];

  // Get slugs of all featured posts for filtering
  const featuredSlugs = new Set(blogFeaturedPosts?.map((p) => p.slug) || []);

  // Regular posts are now from pagination (already filtered by query)
  const regularPosts = allRegularPosts;

  // Determine if we have featured content to show
  const hasFeaturedContent = heroPost !== null;

  // Build CSS class for the blog page
  const blogPageClass = [
    "blog-page",
    viewMode === "cards" ? "blog-page-cards" : "blog-page-list",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className={blogPageClass}>
        <nav className="post-nav">
          {/* Navigation with back button commented out  <button onClick={() => navigate("/")} className="back-button">
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>*/}
        </nav>
        {/* Blog page header */}
        <header className="blog-header">
          <div className="blog-header-top">
            <div>
              <h1 className="blog-title">{siteConfig.blogPage.title}</h1>
              {siteConfig.blogPage.description && (
                <p className="blog-description">
                  {siteConfig.blogPage.description}
                </p>
              )}
            </div>
            {/* View toggle button */}
            {showPosts &&
              siteConfig.blogPage.showViewToggle &&
              regularPosts !== undefined &&
              regularPosts.length > 0 && (
                <button
                  className="view-toggle-button"
                  onClick={toggleViewMode}
                  aria-label={`Switch to ${viewMode === "list" ? "card" : "list"} view`}
                >
                  {viewMode === "list" ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  )}
                </button>
              )}
          </div>
        </header>
        {/* Hero featured post section (only in cards view) */}
        {showPosts && hasFeaturedContent && viewMode === "cards" && heroPost && (
          <section className="blog-hero-section">
            <BlogHeroCard
              slug={heroPost.slug}
              title={heroPost.title}
              description={heroPost.description}
              date={heroPost.date}
              tags={heroPost.tags}
              readTime={heroPost.readTime}
              image={heroPost.image}
              excerpt={heroPost.excerpt}
              authorName={heroPost.authorName}
              authorImage={heroPost.authorImage}
            />
          </section>
        )}
        {/* Featured row: remaining featured posts in 2 columns (only in cards view) */}
        {showPosts && featuredRowPosts.length > 0 && viewMode === "cards" && (
          <section className="blog-featured-row">
            <PostList
              posts={featuredRowPosts}
              viewMode="cards"
              columns={2}
              showExcerpts={true}
            />
          </section>
        )}
        {/* Regular posts section: non-featured posts in 3 columns */}
        {showPosts && (
          <section className="blog-posts">
            {regularPosts === undefined ? null : regularPosts.length === 0 ? (
              !hasFeaturedContent && (
                <p className="no-posts">No posts yet. Check back soon!</p>
              )
            ) : (
              <>
                <PostList
                  posts={regularPosts}
                  viewMode={viewMode}
                  columns={3}
                  showExcerpts={false}
                />
                {/* Post count indicator - only show when pagination is enabled */}
                {isPaginationEnabled && totalRegularPostsCount !== undefined && (
                  <PostCountIndicator
                    currentCount={regularPosts.length}
                    totalCount={totalRegularPostsCount}
                    label="posts"
                  />
                )}
                {/* Pagination - show based on mode */}
                {isPaginationEnabled && paginationMode === "load-more" && cursorBasedResult && (
                  <LoadMoreButton
                    onClick={handleLoadMore}
                    loading={isLoading}
                    hasMore={cursorBasedResult.hasMore}
                  />
                )}
                {isPaginationEnabled && paginationMode === "numbered" && totalPages > 1 && (
                  <NumberedPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </section>
        )}

        {/* Newsletter signup (below-posts position) */}
        {siteConfig.newsletter?.enabled &&
          siteConfig.newsletter.signup.blogPage.enabled &&
          siteConfig.newsletter.signup.blogPage.position === "below-posts" && (
            <NewsletterSignup source="blog-page" />
          )}
        {/* Message when posts are disabled on blog page */}
        {!showPosts && (
          <p className="blog-disabled-message">
            Posts are configured to not display on this page. Update{" "}
            <code>postsDisplay.showOnBlogPage</code> in siteConfig to enable.
          </p>
        )}

      </div>

      <Footer />
    </>
  );
}
