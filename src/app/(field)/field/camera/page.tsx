"use client"

import { useRef, useState } from "react"
import { Camera, ImageIcon, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FieldCameraPage() {
  const [photos, setPhotos] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCapture = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (ev) => {
          if (ev.target?.result) {
            setPhotos((prev) => [...prev, ev.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
    }
    e.target.value = ""
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="px-4 py-5 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Quick Capture</h1>
        <p className="text-sm text-gray-500 mt-0.5">Take photos for your current visit</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-8">
        <div className="h-16 w-16 rounded-full bg-[#4CAF50] flex items-center justify-center mb-4 shadow-lg shadow-green-200">
          <Camera className="h-8 w-8 text-white" />
        </div>
        <p className="text-sm font-medium text-gray-700 mb-1">Capture Photo</p>
        <p className="text-xs text-gray-400 mb-4">Shelf, display, or issue photos</p>
        <div className="flex gap-3">
          <Button onClick={handleCapture} className="bg-[#4CAF50] hover:bg-[#388E3C] text-white gap-2">
            <Camera className="h-4 w-4" />
            Take Photo
          </Button>
          <Button onClick={handleCapture} variant="outline" className="gap-2">
            <ImageIcon className="h-4 w-4" />
            Gallery
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {photos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Captured ({photos.length})</h3>
            <Button size="sm" className="bg-[#4CAF50] hover:bg-[#388E3C] text-white text-xs gap-1 h-8">
              <Upload className="h-3 w-3" />
              Upload All
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {photos.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt={`Capture ${index + 1}`} className="h-full w-full object-cover" />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/60 flex items-center justify-center"
                >
                  <X className="h-3 w-3 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Photo Category</h3>
        <div className="flex flex-wrap gap-2">
          {["Shelf", "Display", "Before/After", "Expiry", "Issue", "General"].map((cat) => (
            <button
              key={cat}
              className="px-3 py-1.5 text-xs font-medium rounded-full border border-gray-200 bg-white text-gray-600 hover:border-[#4CAF50] hover:text-[#4CAF50] transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
