// components/VideoUpload.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { useUser } from '@supabase/auth-helpers-react';

interface VideoData {
  title: string;
  description: string;
  file: File | null;
}

export default function VideoUpload(): JSX.Element {
  const user = useUser();
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [videoData, setVideoData] = useState<VideoData>({
    title: '',
    description: '',
    file: null,
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoData({ ...videoData, file });
    }
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!videoData.file || !user) return;

    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('video', videoData.file);
      formData.append('title', videoData.title);
      formData.append('description', videoData.description);
      formData.append('userId', user.id);

      const xhr = new XMLHttpRequest();
      
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          alert(`Video uploaded successfully! Video ID: ${response.videoId}`);
          
          // Reset form
          setVideoData({ title: '', description: '', file: null });
          document.getElementById('video-file').value = '';
        } else {
          alert('Upload failed');
        }
        setUploading(false);
        setProgress(0);
      };

      xhr.onerror = () => {
        alert('Upload failed');
        setUploading(false);
        setProgress(0);
      };

      xhr.open('POST', '/api/youtube/upload');
      xhr.send(formData);

    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Upload Course Video</h2>
      
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Video Title</label>
          <input
            type="text"
            value={videoData.title}
            onChange={(e) => setVideoData({ ...videoData, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={videoData.description}
            onChange={(e) => setVideoData({ ...videoData, description: e.target.value })}
            className="w-full p-2 border rounded h-20"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Video File</label>
          <input
            id="video-file"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <button
          type="submit"
          disabled={uploading || !videoData.file}
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {uploading ? `Uploading... ${Math.round(progress)}%` : 'Upload to YouTube'}
        </button>
      </form>
    </div>
  );
}