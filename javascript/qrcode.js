function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;  
    }
}

document.getElementById('generateButton').addEventListener('click', () => {
    const url = document.getElementById('urlInput').value;
    console.log(`URL entrée: ${url}`);

    const qrCodeCanvas = document.getElementById('qrCanvas');
    qrCodeCanvas.width = 300;
    qrCodeCanvas.height = 300;

    const ctx = qrCodeCanvas.getContext('2d');
    ctx.clearRect(0, 0, qrCodeCanvas.width, qrCodeCanvas.height);

    if (url && isValidUrl(url)) {
        QRCode.toCanvas(qrCodeCanvas, url, { width: 300, height: 300 }, function (error) {
            if (error) {
                console.error('Erreur lors de la génération du QR Code:', error);
                alert('Erreur lors de la génération du QR Code.');
            } else {
                console.log('QR Code généré avec succès!');
            }
        });
    } else {
        alert('Veuillez entrer une URL valide.');
    }
});