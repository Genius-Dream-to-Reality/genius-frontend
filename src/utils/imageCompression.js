const MAX_IMAGE_SIZE = 800; // Maximum width/height in pixels
const JPEG_QUALITY = 0.6; // JPEG quality (0.6 = 60% quality)

// Helper function to load an image from URL or File
const loadImage = (input) => {
    return new Promise((resolve, reject) => {
        if (input instanceof File) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(input);
        } else {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = input;
        }
    });
};

export const compressImage = async (input) => {
    if (!input) return null;

    try {
        const img = await loadImage(input);

        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
            if (width > MAX_IMAGE_SIZE) {
                height *= MAX_IMAGE_SIZE / width;
                width = MAX_IMAGE_SIZE;
            }
        } else {
            if (height > MAX_IMAGE_SIZE) {
                width *= MAX_IMAGE_SIZE / height;
                height = MAX_IMAGE_SIZE;
            }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        const blob = await new Promise(resolve => {
            canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY);
        });

        return new File([blob], 'compressed-profile-image.jpg', {
            type: 'image/jpeg',
            lastModified: Date.now()
        });
    } catch (error) {
        console.error('Error compressing image:', error);
        return null;
    }
}; 