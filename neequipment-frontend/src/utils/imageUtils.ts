/**
 * Utility to construct product image URLs robustly.
 * Handles absolute URLs, data URLs, and storage paths.
 * Points to the API fallback route as PRIMARY because cPanel symlinks are unreliable.
 */
export const getProductImageUrl = (path: string | null | undefined): string => {
  if (!path) return '/placeholder-product.png';

  // If it's already a full URL or data URL, return it
  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // PRIMARY (Fallback Route): Serves directly via PHP/Laravel
  // This is the most reliable method for cPanel hosting.
  return `${baseUrl}/storage/${cleanPath}`;
};

/**
 * Standard Storage URL (Requires working symlink)
 * Keep this for cases where symlink is confirmed working.
 */
export const getStandardImageUrl = (path: string | null | undefined): string => {
    if (!path) return '/placeholder-product.png';
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    const rootUrl = baseUrl.endsWith('/api') ? baseUrl.slice(0, -4) : baseUrl.endsWith('/api/') ? baseUrl.slice(0, -5) : baseUrl;
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    
    return `${rootUrl}/storage/${cleanPath}`;
};
