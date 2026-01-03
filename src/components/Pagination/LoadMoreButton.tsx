import { Loader2 } from "lucide-react";

interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
  hasMore: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * LoadMoreButton component for paginated blog posts
 *
 * Features:
 * - Shows loading spinner when fetching more posts
 * - Disabled when loading or no more posts
 * - Hidden when hasMore is false
 * - Optional custom className for styling
 */
export default function LoadMoreButton({
  onClick,
  loading,
  hasMore,
  disabled = false,
  className = "",
}: LoadMoreButtonProps) {
  // Don't render if there are no more posts
  if (!hasMore) {
    return null;
  }

  const isDisabled = loading || disabled;

  return (
    <div className={`load-more-container ${className}`}>
      <button
        onClick={onClick}
        disabled={isDisabled}
        className="load-more-button"
        aria-label="Load more posts"
      >
        {loading ? (
          <>
            <Loader2 className="load-more-spinner" size={18} />
            <span>Loading...</span>
          </>
        ) : (
          <span>Load More Posts</span>
        )}
      </button>
    </div>
  );
}
