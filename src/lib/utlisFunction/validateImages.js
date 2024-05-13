export default function validateImages(images) {
  // Handle invalid or null inputs
  if (!images) {
    return false;
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg'];
  const maxFileSizeMB = 5;

  // Convert FileList or single File to an array
  const imageArray = Array.isArray(images) ? images : [images];

  for (let i = 0; i < imageArray.length; i++) {
    const image = imageArray[i];

    // Check for invalid image object or unsupported type
    if (!image || !allowedTypes.includes(image.type)) {
      return false;
    }

    // Validate file size within the specified limit
    if (image.size > maxFileSizeMB * 1024 * 1024) {
      return false;
    }
  }

  return true; // All images passed validation
}