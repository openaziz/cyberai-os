"use client"

import type React from "react"
import { useState } from "react"
import type Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
  width?: number
  height?: number
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  className,
  width,
  height,
  ...props
}: ImageWithFallbackProps & Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "width" | "height">) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {hasError ? (
        <div
          className="w-full h-full flex items-center justify-center bg-muted"
          style={{ width: width || "100%", height: height || "100%" }}
        >
          <span className="text-muted-foreground text-sm">{alt}</span>
        </div>
      ) : (
        <img
          src={imgSrc || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          onError={() => {
            setImgSrc(fallbackSrc)
            setHasError(true)
          }}
          className={cn("object-cover", className)}
          {...props}
        />
      )}
    </div>
  )
}
