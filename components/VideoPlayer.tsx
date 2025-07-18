// components/VideoPlayer.tsx
import { useState } from 'react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  width?: number;
  height?: number;
}

export default function VideoPlayer({ 
  videoId, 
  title, 
  width = 560, 
  height = 315 
}: VideoPlayerProps): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  if (!videoId) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded" 
           style={{ width, height }}>
        <p className="text-gray-500">No video selected</p>
      </div>
    );
  }

  return (
    <div className="video-container">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="relative" style={{ width, height }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        )}
        <iframe
          width={width}
          height={height}
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          className="rounded"
        />
      </div>
    </div>
  );
}