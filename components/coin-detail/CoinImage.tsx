'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, X } from 'lucide-react';
import { Coin } from '@/types';
import { getImageUrl } from '@/lib/utils';

interface CoinImageProps {
  coin: Coin;
}

export function CoinImage({ coin }: CoinImageProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  // Mock additional images for demo
  const images = [
    getImageUrl(coin.imageUrl),
    getImageUrl(coin.thumbnailUrl),
    // Add mock images
    '/images/coin-placeholder.png',
    '/images/coin-placeholder.png',
  ].filter(Boolean);

  const handleZoomIn = () => setZoom(Math.min(200, zoom + 25));
  const handleZoomOut = () => setZoom(Math.max(50, zoom - 25));
  const handleRotate = () => setRotation((rotation + 90) % 360);
  const handleReset = () => {
    setZoom(100);
    setRotation(0);
  };

  const ImageControls = () => (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={handleZoomOut}
        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        title="Zoom Out"
      >
        <ZoomOut className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      </button>

      <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[3rem] text-center">
        {zoom}%
      </span>

      <button
        onClick={handleZoomIn}
        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        title="Zoom In"
      >
        <ZoomIn className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      </button>

      <button
        onClick={handleRotate}
        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        title="Rotate"
      >
        <RotateCcw className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      </button>

      <button
        onClick={handleReset}
        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        title="Reset"
      >
        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">RESET</span>
      </button>

      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        title="Full Screen"
      >
        <Maximize2 className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Coin Images
        </h2>

        {/* Main Image */}
        <div className="aspect-square relative bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden mb-4">
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ 
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transition: 'transform 0.3s ease'
            }}
          >
            <Image
              src={images[currentImage]}
              alt={`${coin.name} - Image ${currentImage + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Controls */}
        <ImageControls />

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex space-x-2 mt-6 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                  index === currentImage
                    ? 'border-primary-600 ring-2 ring-primary-200 dark:ring-primary-800'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Image
                  src={image}
                  alt={`${coin.name} thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Image Info */}
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Image {currentImage + 1} of {images.length} • High resolution available
        </div>
      </div>

      {/* Full Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-screen w-full">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-[80vh] bg-gray-900 rounded-lg overflow-hidden">
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ 
                  transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                  transition: 'transform 0.3s ease'
                }}
              >
                <Image
                  src={images[currentImage]}
                  alt={`${coin.name} - Full Screen`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </div>

            {/* Modal Controls */}
            <div className="mt-4">
              <ImageControls />
            </div>

            {/* Modal Thumbnails */}
            {images.length > 1 && (
              <div className="flex justify-center space-x-2 mt-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-12 h-12 rounded border-2 overflow-hidden transition-all ${
                      index === currentImage
                        ? 'border-primary-500'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}