import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'client', 'public');
const assetsDir = path.resolve(__dirname, '..', 'attached_assets');
const logoPath = path.join(assetsDir, 'Areeb_White-green_1768388319561.png');

if (!fs.existsSync(logoPath)) {
  console.error('Logo not found at:', logoPath);
  process.exit(1);
}

const sizes = [16, 32, 48, 96];

async function resizeFavicon() {
  try {
    console.log('Creating favicons from footer logo...');
    
    // Get image metadata to understand dimensions
    const metadata = await sharp(logoPath).metadata();
    console.log(`Source image: ${metadata.width}x${metadata.height}`);
    
    for (const size of sizes) {
      const outputPath = path.join(publicDir, `favicon-${size}x${size}.png`);
      // Use 'contain' with padding to ensure logo is visible and centered
      // Scale to 85% of the size to add some padding around the logo
      const logoSize = Math.floor(size * 0.85);
      
      await sharp(logoPath)
        .resize(logoSize, logoSize, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .extend({
          top: Math.floor((size - logoSize) / 2),
          bottom: Math.ceil((size - logoSize) / 2),
          left: Math.floor((size - logoSize) / 2),
          right: Math.ceil((size - logoSize) / 2),
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`Created favicon-${size}x${size}.png`);
    }
    
    // Also create a main favicon.png (32x32) for backward compatibility
    const mainFavicon = path.join(publicDir, 'favicon.png');
    const mainLogoSize = Math.floor(32 * 0.85);
    await sharp(logoPath)
      .resize(mainLogoSize, mainLogoSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .extend({
        top: Math.floor((32 - mainLogoSize) / 2),
        bottom: Math.ceil((32 - mainLogoSize) / 2),
        left: Math.floor((32 - mainLogoSize) / 2),
        right: Math.ceil((32 - mainLogoSize) / 2),
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .resize(32, 32)
      .png()
      .toFile(mainFavicon);
    console.log('Created favicon.png');
    
    console.log('Favicon creation complete!');
  } catch (error) {
    console.error('Error creating favicon:', error);
    process.exit(1);
  }
}

resizeFavicon();