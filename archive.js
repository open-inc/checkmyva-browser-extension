// require modules
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

main();

async function main() {
  // create src.zip

  await createZip(path.resolve("./src.zip"), (archive) => {
    archive.directory(path.resolve("./src"), "src");

    archive.append(fs.createReadStream(path.resolve("./README.md")), {
      name: "README.md",
    });

    archive.append(fs.createReadStream(path.resolve("./webpack.config.js")), {
      name: "webpack.config.js",
    });

    archive.append(fs.createReadStream(path.resolve("./package.json")), {
      name: "package.json",
    });
  });

  await createZip(path.resolve("./dist.zip"), (archive) => {
    archive.directory(path.resolve("./dist"), false);
  });
}

async function createZip(destPath, factory) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(destPath);

    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    archive.pipe(output);

    output.on("close", function() {
      resolve(archive);
    });

    archive.on("error", function(error) {
      reject(error);
    });

    factory(archive);

    archive.finalize();
  });
}
