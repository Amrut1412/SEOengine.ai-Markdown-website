interface PostCountIndicatorProps {
  currentCount: number; // Number of posts currently displayed
  totalCount: number; // Total number of posts
  label?: string; // Custom label (e.g., "articles", "posts")
  className?: string;
}

/**
 * PostCountIndicator component
 *
 * Displays "Showing X of Y posts" text to help users understand pagination progress
 *
 * @example
 * ```tsx
 * <PostCountIndicator
 *   currentCount={posts.length}
 *   totalCount={totalPosts}
 *   label="posts"
 * />
 * ```
 */
export default function PostCountIndicator({
  currentCount,
  totalCount,
  label = "posts",
  className = "",
}: PostCountIndicatorProps) {
  // Don't render if totalCount is 0 or not loaded yet
  if (totalCount === 0) {
    return null;
  }

  return (
    <div className={`post-count-indicator ${className}`}>
      <p className="post-count-text">
        Showing <span className="post-count-current">{currentCount}</span> of{" "}
        <span className="post-count-total">{totalCount}</span> {label}
      </p>
    </div>
  );
}
