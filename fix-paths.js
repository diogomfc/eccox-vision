const fs = require('fs');
const path = require('path');

function fixAssetPaths(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
        const filePath = path.join(dir, file.name);
        
        if (file.isDirectory()) {
            fixAssetPaths(filePath);
        } else if (file.name.endsWith('.html')) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Substituir caminhos absolutos por relativos
            content = content.replace(/href="\/_next\//g, 'href="./_next/');
            content = content.replace(/src="\/_next\//g, 'src="./_next/');
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Fixed paths in: ${filePath}`);
        }
    }
}

console.log('📦 Fixing asset paths...');
const outDir = path.join(__dirname, 'out');

if (fs.existsSync(outDir)) {
    fixAssetPaths(outDir);
    console.log('✅ Asset paths fixed successfully!');
} else {
    console.error('❌ Out directory not found!');
}