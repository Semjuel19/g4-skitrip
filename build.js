const fs = require('fs');
const path = require('path');
const { minify: minifyHTML } = require('html-minifier-terser');
const { minify: minifyJS } = require('terser');
const CleanCSS = require('clean-css');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Create assets directory in dist
const distAssetsDir = path.join(distDir, 'assets');
if (!fs.existsSync(distAssetsDir)) {
    fs.mkdirSync(distAssetsDir);
}

// Create gallery directories in dist/assets
const distGalleryDir = path.join(distAssetsDir, 'gallery');
const distGallery2Dir = path.join(distAssetsDir, 'gallery_2');
if (!fs.existsSync(distGalleryDir)) {
    fs.mkdirSync(distGalleryDir);
}
if (!fs.existsSync(distGallery2Dir)) {
    fs.mkdirSync(distGallery2Dir);
}

console.log('🚀 Starting build process...');

// Minify CSS
console.log('📦 Minifying CSS...');
const cssContent = fs.readFileSync('styles.css', 'utf8');
const minifiedCSS = new CleanCSS({
    level: 2,
    returnPromise: false
}).minify(cssContent);

if (minifiedCSS.errors.length > 0) {
    console.error('❌ CSS minification errors:', minifiedCSS.errors);
} else {
    fs.writeFileSync(path.join(distDir, 'styles.css'), minifiedCSS.styles);
    console.log('✅ CSS minified successfully');
    console.log(`   Original: ${(cssContent.length / 1024).toFixed(2)}KB`);
    console.log(`   Minified: ${(minifiedCSS.styles.length / 1024).toFixed(2)}KB`);
    console.log(`   Savings: ${(((cssContent.length - minifiedCSS.styles.length) / cssContent.length) * 100).toFixed(1)}%`);
}

// Minify JavaScript
console.log('📦 Minifying JavaScript...');
const jsContent = fs.readFileSync('script.js', 'utf8');
minifyJS(jsContent, {
    compress: {
        drop_console: false,
        drop_debugger: true
    },
    mangle: true,
    format: {
        comments: false
    }
}).then(minifiedJS => {
    if (minifiedJS.error) {
        console.error('❌ JavaScript minification error:', minifiedJS.error);
    } else {
        fs.writeFileSync(path.join(distDir, 'script.js'), minifiedJS.code);
        console.log('✅ JavaScript minified successfully');
        console.log(`   Original: ${(jsContent.length / 1024).toFixed(2)}KB`);
        console.log(`   Minified: ${(minifiedJS.code.length / 1024).toFixed(2)}KB`);
        console.log(`   Savings: ${(((jsContent.length - minifiedJS.code.length) / jsContent.length) * 100).toFixed(1)}%`);
    }
}).catch(err => {
    console.error('❌ JavaScript minification failed:', err);
});

// Minify HTML
console.log('📦 Minifying HTML...');
const htmlContent = fs.readFileSync('index.html', 'utf8');
minifyHTML(htmlContent, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true
}).then(minifiedHTML => {
    fs.writeFileSync(path.join(distDir, 'index.html'), minifiedHTML);
    console.log('✅ HTML minified successfully');
    console.log(`   Original: ${(htmlContent.length / 1024).toFixed(2)}KB`);
    console.log(`   Minified: ${(minifiedHTML.length / 1024).toFixed(2)}KB`);
    console.log(`   Savings: ${(((htmlContent.length - minifiedHTML.length) / htmlContent.length) * 100).toFixed(1)}%`);
}).catch(err => {
    console.error('❌ HTML minification failed:', err);
});

// Copy assets
console.log('📁 Copying assets...');

// Copy main assets
const mainAssets = ['bg_1.jpg', 'G4_biele-logo-biele.png', 'nav-bar-scroll.png', 'nav-bar-top.png'];
mainAssets.forEach(asset => {
    if (fs.existsSync(path.join('assets', asset))) {
        fs.copyFileSync(path.join('assets', asset), path.join(distAssetsDir, asset));
        console.log(`   ✅ Copied ${asset}`);
    }
});

// Copy gallery images (2025)
console.log('📸 Copying gallery images (Lyžovačka 2025)...');
const galleryDir = path.join('assets', 'gallery');
let gallery2025Count = 0;
if (fs.existsSync(galleryDir)) {
    const galleryFiles = fs.readdirSync(galleryDir);
    galleryFiles.forEach(file => {
        if (file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png')) {
            fs.copyFileSync(path.join(galleryDir, file), path.join(distGalleryDir, file));
            gallery2025Count++;
        }
    });
    console.log(`   ✅ Copied ${gallery2025Count} images from gallery/ (2025)`);
} else {
    console.log('   ⚠️  Gallery folder not found');
}

// Copy gallery_2 images (2024)
console.log('📸 Copying gallery_2 images (Lyžovačka 2024)...');
const gallery2Dir = path.join('assets', 'gallery_2');
let gallery2024Count = 0;
if (fs.existsSync(gallery2Dir)) {
    const gallery2Files = fs.readdirSync(gallery2Dir);
    gallery2Files.forEach(file => {
        if (file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png')) {
            fs.copyFileSync(path.join(gallery2Dir, file), path.join(distGallery2Dir, file));
            gallery2024Count++;
        }
    });
    console.log(`   ✅ Copied ${gallery2024Count} images from gallery_2/ (2024)`);
} else {
    console.log('   ⚠️  Gallery_2 folder not found');
}

// Skip copying README.md and AGENTS.md for production build
console.log('   ⏭️  Skipping README.md and AGENTS.md (development files only)');

console.log('🎉 Build completed! Check the dist/ folder for minified files.');
console.log('📦 Ready for deployment!');