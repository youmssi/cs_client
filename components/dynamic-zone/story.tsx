"use client";

import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import Image from 'next/image';

import type { StoryBlock } from '@/types';
import { cn } from '@/lib/utils';

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-16 mb-8 leading-tight tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-14 mb-6 leading-tight tracking-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mt-12 mb-5 leading-tight tracking-tight">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mt-10 mb-4 leading-tight">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-base md:text-lg font-semibold text-foreground mt-8 mb-3 leading-tight">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-sm md:text-base font-semibold text-foreground mt-6 mb-3 leading-tight uppercase tracking-wide">
      {children}
    </h6>
  ),
  p: ({ children }) => (
    <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6 font-normal">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic text-foreground">
      {children}
    </em>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary/60 bg-muted/20 rounded-r-lg py-6 px-8 my-8 italic text-muted-foreground shadow-sm">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="my-8 ml-6 space-y-3 text-muted-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-8 ml-6 space-y-3 text-muted-foreground">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed text-base md:text-lg relative pl-2">
      <span className="absolute -left-6 top-0 text-primary font-bold">•</span>
      {children}
    </li>
  ),
  code: ({ children, className }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="bg-muted/60 px-2 py-1 rounded text-sm font-mono text-primary border border-muted-foreground/20">
          {children}
        </code>
      );
    }
    return (
      <code className={cn(
        "block bg-muted/40 p-6 rounded-lg text-sm font-mono overflow-x-auto my-8 border border-muted-foreground/20 shadow-inner",
        className
      )}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-muted/40 p-6 rounded-lg overflow-x-auto my-8 border border-muted-foreground/20 shadow-inner">
      {children}
    </pre>
  ),
  a: ({ href = "#", children, ...props }) => {
    const isExternal = href?.startsWith('http');
    
    if (isExternal) {
      return (
        <a
          href={href}
          className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors font-medium"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors font-medium"
        {...props}
      >
        {children}
      </Link>
    );
  },
  img: ({ src, alt }) => (
    <span className="block my-12 rounded-xl overflow-hidden shadow-lg border border-muted-foreground/10">
      <Image
        src={typeof src === 'string' ? src : ''}
        alt={alt ?? "Story image"}
        width={800}
        height={400}
        className="w-full h-auto object-cover"
      />
    </span>
  ),
  hr: () => (
    <hr className="border-muted-foreground/20 my-12 border-t-2" />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse border border-border">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-muted">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody>
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-border">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="text-left p-4 font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="p-4 text-muted-foreground">
      {children}
    </td>
  ),
};

export function Story({ content }: Readonly<StoryBlock>) {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <article className="prose prose-lg max-w-none text-pretty">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={markdownComponents}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </section>
  );
}
