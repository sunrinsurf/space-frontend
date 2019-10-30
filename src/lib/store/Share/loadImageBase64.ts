function loadImageBase64(file: File) {
  return new Promise(resolve => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function(e) {
      resolve((e.target as any).result);
    };
  });
}

export default loadImageBase64;
