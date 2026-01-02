// Utility to parse frontmatter from markdown content
export interface ParsedFrontmatter {
    title?: string;
    description?: string;
    date?: string;
    slug?: string;
    published?: boolean;
    tags?: string[];
    readTime?: string;
    image?: string;
    showImageAtTop?: boolean;
    excerpt?: string;
    featured?: boolean;
    featuredOrder?: number;
    authorName?: string;
    authorImage?: string;
    layout?: string;
    rightSidebar?: boolean;
    showFooter?: boolean;
    footer?: string;
    showSocialFooter?: boolean;
    aiChat?: boolean;
    blogFeatured?: boolean;
    newsletter?: boolean;
    contactForm?: boolean;
    unlisted?: boolean;
}

export interface ParsedMarkdown {
    frontmatter: ParsedFrontmatter;
    content: string;
    errors: string[];
}

export function parseFrontmatter(markdown: string): ParsedMarkdown {
    const errors: string[] = [];

    // Check if content has frontmatter
    if (!markdown.trim().startsWith('---')) {
        errors.push('No frontmatter found. Content must start with ---');
        return { frontmatter: {}, content: markdown, errors };
    }

    // Extract frontmatter
    const parts = markdown.split('---');
    if (parts.length < 3) {
        errors.push('Invalid frontmatter format. Must be enclosed in ---');
        return { frontmatter: {}, content: markdown, errors };
    }

    const frontmatterText = parts[1];
    const content = parts.slice(2).join('---').trim();

    const frontmatter: ParsedFrontmatter = {};

    // Parse each line of frontmatter
    const lines = frontmatterText.split('\n');

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const colonIndex = trimmed.indexOf(':');
        if (colonIndex === -1) continue;

        const key = trimmed.substring(0, colonIndex).trim();
        let value = trimmed.substring(colonIndex + 1).trim();

        // Remove quotes from string values
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        // Parse different types
        switch (key) {
            case 'title':
            case 'description':
            case 'date':
            case 'slug':
            case 'readTime':
            case 'image':
            case 'excerpt':
            case 'authorName':
            case 'authorImage':
            case 'layout':
            case 'footer':
                frontmatter[key] = value;
                break;

            case 'published':
            case 'showImageAtTop':
            case 'featured':
            case 'rightSidebar':
            case 'showFooter':
            case 'showSocialFooter':
            case 'aiChat':
            case 'blogFeatured':
            case 'newsletter':
            case 'contactForm':
            case 'unlisted':
                frontmatter[key] = value === 'true';
                break;

            case 'featuredOrder':
                frontmatter[key] = parseInt(value, 10);
                break;

            case 'tags':
                // Parse array format: ["tag1", "tag2"]
                try {
                    const parsed = JSON.parse(value);
                    if (Array.isArray(parsed)) {
                        frontmatter[key] = parsed;
                    }
                } catch {
                    errors.push(`Invalid tags format: ${value}`);
                }
                break;
        }
    }

    // Validate required fields for posts
    const requiredFields = ['title', 'slug', 'date', 'description'];
    for (const field of requiredFields) {
        if (!frontmatter[field as keyof ParsedFrontmatter]) {
            errors.push(`Missing required field: ${field}`);
        }
    }

    // Set defaults
    if (frontmatter.published === undefined) {
        frontmatter.published = true;
    }
    if (!frontmatter.tags) {
        frontmatter.tags = [];
    }

    return { frontmatter, content, errors };
}

// Calculate reading time from content
export function calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
}
