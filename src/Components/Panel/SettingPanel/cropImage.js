// cropImage.js
export default function getCroppedImg(imageSrc, pixelCrop) {
  const canvas = document.createElement("canvas");
  const img = new Image();
  img.src = imageSrc;

  return new Promise((resolve, reject) => {
    img.onload = () => {
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        img,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("خطا در ایجاد تصویر کراپ شده"));
          return;
        }
        const croppedImageUrl = URL.createObjectURL(blob);
        resolve(croppedImageUrl);
      }, "image/jpeg");
    };
    img.onerror = () => reject(new Error("خطا در بارگذاری تصویر"));
  });
}
