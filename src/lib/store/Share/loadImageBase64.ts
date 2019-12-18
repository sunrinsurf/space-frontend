function loadImageBase64(file: File) {
  return new Promise((resolve, reject) => {
    if (file.size > 5 * 1024 * 1024) {
      return reject(new Error("파일은 5MB 이하만 올릴 수 있습니다."));
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function(e) {
      resolve((e.target as any).result);
    };
  });
}

export default loadImageBase64;
