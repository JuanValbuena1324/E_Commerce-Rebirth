'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  if (!session) {
    router.push('/login');
    return null;
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.success) {
        setImageUrl(data.url);
        alert('¡Imagen subida! URL: ' + data.url);
      }
    } catch (error) {
      alert('Error al subir');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-offwhite p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-cinzel text-3xl mb-8">Panel de Imágenes</h1>
        
        <div className="bg-white p-6 rounded-lg">
          <label className="block mb-4">
            <span className="font-cinzel">Subir imagen</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2 block w-full text-sm"
              disabled={uploading}
            />
          </label>
          
          {uploading && <p>Subiendo...</p>}
          
          {imageUrl && (
            <div className="mt-4">
              <p className="text-sm mb-2">URL de la imagen:</p>
              <code className="bg-gray-100 p-2 block text-xs break-all">{imageUrl}</code>
              <img src={imageUrl} alt="Subida" className="mt-4 max-h-48 object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}