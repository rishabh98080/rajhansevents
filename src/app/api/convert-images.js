const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGE_DIR = "./public/images";

async function convert(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);

        if (fs.statSync(fullPath).isDirectory()) {
            await convert(fullPath);
            continue;
        }

        const ext = path.extname(file).toLowerCase();

        if (![".png", ".jpg", ".jpeg"].includes(ext))
            continue;

        const output = fullPath.replace(ext, ".webp");

        await sharp(fullPath)
            .resize({
                width: 1600,
                withoutEnlargement: true
            })
            .webp({
                quality: 75
            })
            .toFile(output);

        console.log(`${file} -> webp`);
    }
}

convert(IMAGE_DIR);