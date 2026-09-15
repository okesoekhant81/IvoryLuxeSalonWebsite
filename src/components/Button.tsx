import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export function PrimaryCta({ href, children, className = "", ...props }: Props) {
  return (
    <a
      href={href}
      className={`inline-block touch-manipulation rounded-full bg-brown px-8 py-3 font-serif-italic text-sm text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-black hover:shadow-lg active:scale-95 active:bg-black ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

export function OutlineCta({ href, children, className = "", ...props }: Props) {
  return (
    <a
      href={href}
      className={`inline-block touch-manipulation rounded-full border border-brown px-5 py-2 font-serif-italic text-sm text-brown transition-all duration-300 ease-out hover:bg-brown hover:text-white active:scale-95 active:bg-brown active:text-white ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

export function TextLink({ href, children, className = "", ...props }: Props) {
  return (
    <a
      href={href}
      className={`inline-block touch-manipulation font-serif-italic text-brown underline decoration-1 underline-offset-4 transition-opacity duration-300 ease-out hover:opacity-70 active:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
