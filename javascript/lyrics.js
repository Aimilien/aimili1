let visualGenerated = false;

    function handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.getElementById("outputImage");
        img.src = e.target.result;
        img.style.display = "block";

        const imgElement = new Image();
        imgElement.src = e.target.result;
        imgElement.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = imgElement.width;
          canvas.height = imgElement.height;
          ctx.drawImage(imgElement, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          let r = 0, g = 0, b = 0, count = 0;

          for (let i = 0; i < imageData.length; i += 4) {
            r += imageData[i];
            g += imageData[i + 1];
            b += imageData[i + 2];
            count++;
          }

          r = Math.floor(r / count);
          g = Math.floor(g / count);
          b = Math.floor(b / count);

          document.getElementById("output").style.background = `rgb(${r}, ${g}, ${b})`;
        };
      };
      reader.readAsDataURL(file);
    }

    function generateVisual() {
      const lyrics = document.getElementById("lyrics").value;
      const artist = document.getElementById("artist").value;
      const title = document.getElementById("title").value;

      if (lyrics && artist && title) {
        visualGenerated = true;
        document.getElementById("output").style.display = "flex";
        document.getElementById("outputTitle").textContent = title;
        document.getElementById("outputArtist").textContent = artist;
        document.getElementById("outputLyrics").textContent = lyrics;
      } else {
        alert("Veuillez remplir tous les champs !");
      }
    }

    function resetForm() {
      document.getElementById("lyrics").value = "";
      document.getElementById("artist").value = "";
      document.getElementById("title").value = "";
      document.getElementById("output").style.display = "none";
      document.getElementById("outputImage").style.display = "none";
      visualGenerated = false;
    }

    function downloadImage() {
      if (!visualGenerated) {
        alert("Veuillez d'abord générer une image avant de la télécharger !");
        return;
      }
      const output = document.getElementById("output");
      html2canvas(output).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "visuel.png";
        link.click();
      });
    }