document.addEventListener("DOMContentLoaded", function() {
    const startCameraButton = document.getElementById("startCamera");
    const takePhotoButton = document.getElementById("takePhoto");
  
    let stream, imageCapture;
  
    startCameraButton.addEventListener("click", async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement("video");
        document.body.appendChild(video);
        video.srcObject = stream;
  
        const track = stream.getVideoTracks()[0];
        imageCapture = new ImageCapture(track);
  
        takePhotoButton.disabled = false;
      } catch (error) {
        console.error("Error al abrir la cámara:", error);
      }
    });
  
    takePhotoButton.addEventListener("click", async () => {
      try {
        const photoBlob = await imageCapture.takePhoto();
        const imageURL = URL.createObjectURL(photoBlob);
  
        // Mostrar la foto en el cuerpo del documento
        const img = document.createElement("img");
        img.src = imageURL;
        document.body.appendChild(img);
  
        // Guardar la foto utilizando File System Access API
        if ('showSaveFilePicker' in window) {
          const fileHandle = await window.showSaveFilePicker({
            suggestedName: 'foto.jpg',
            types: [{
              description: 'Archivos de imagen',
              accept: {
                'image/jpeg': ['.jpg'],
              },
            }],
          });
  
          const writable = await fileHandle.createWritable();
          await writable.write(photoBlob);
          await writable.close();
        } else {
          console.error('File System Access API no es compatible en este navegador.');
        }
      } catch (error) {
        console.error("Error al tomar la foto o guardarla:", error);
      }
    });
  });