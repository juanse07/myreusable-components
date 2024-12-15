import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface Author {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
}

export interface BlogPostCardProps {
  slug: string;
  title: string;
  summary: string;
  featuredImageUrl: string;
  author: Author
  createdAt: string;
  className?: string;
  imageHeight?: number;
  imageWidth?: number;
  basePath?: string;
  formatDate?: (date: string) => string;
}

export const CardComponent1: React.FC<BlogPostCardProps> = ({
  slug,
  title,
  summary,
  featuredImageUrl,
  author,
  createdAt,
  className = '',
  imageHeight = 200,
  imageWidth = 550,
  basePath = '/blog',
  formatDate = (date) => new Date(date).toLocaleDateString(),
}) => {
  const postUrl = `${basePath}/${slug}`;

  return (
    <div className={`overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md ${className}`}>
      <article className="flex flex-col h-full">
        <Link href={postUrl} className="block overflow-hidden aspect-[16/9]">
          <Image
            src={featuredImageUrl}
            alt={`Cover image for ${title}`}
            width={imageWidth}
            height={imageHeight}
            className="h-full w-full object-cover transition-transform hover:scale-105"
            priority={false}
          />
        </Link>

        <div className="flex flex-col flex-grow p-4 space-y-3">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">
              <Link href={postUrl} className="hover:text-blue-600">
                {title}
              </Link>
            </h2>

            <p className="text-sm text-gray-500">
              By {author.name} • 
              <time dateTime={createdAt} className="ml-1">
                {formatDate(createdAt)}
              </time>
            </p>
          </div>

          <p className="flex-grow text-gray-600">
            {summary}
          </p>

          <Link
            href={postUrl}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Read more
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default CardComponent1;