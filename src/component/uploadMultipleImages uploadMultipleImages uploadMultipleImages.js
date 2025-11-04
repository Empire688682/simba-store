const uploadMultipleImages = async (files) => {
  try {
    const uploadPromises = files.map(async (file) => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'jayempire');
        
        const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData
        });
        
        if (!res.ok) {
          console.log(`HTTP error! status: ${res.status}`)
        }
        
        const result = await res.json();
        
        // Check if Cloudinary returned an error
        if (result.error) {
          console.log(result.error.message);
        }
        
        return result.secure_url;
      } catch (error) {
        console.log(`Failed to upload ${file.name}:`, error);
        return null; // Return null for failed uploads
      }
    });
    
    const results = await Promise.all(uploadPromises);
    
    // Filter out failed uploads (null values)
    const successfulUploads = results.filter(url => url !== null);
    
    return successfulUploads;
  } catch (error) {
    console.log("uploadMultipleImages error:", error);
    return []; // Return empty array on complete failure
  }
};

export default uploadMultipleImages;