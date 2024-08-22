
const qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    data: "https://seusite.com",
    dotsOptions: { color: "#000000", type: "square" },
    backgroundOptions: { color: "transparent" }, 
    cornersSquareOptions: { color: "#000000", type: "square" }
});


qrCode.append(document.getElementById("qrcode"));


document.getElementById("urlInput").addEventListener("input", (e) => {
    qrCode.update({ data: e.target.value });
});


document.getElementById("colorPicker").addEventListener("input", (e) => {
    qrCode.update({ dotsOptions: { color: e.target.value } });
});


document.getElementById("sizeSlider").addEventListener("input", (e) => {
    const size = e.target.value;
    document.getElementById("sizeLabel").textContent = `${size}x${size}`;
    qrCode.update({ width: parseInt(size), height: parseInt(size) });
});


document.getElementById("shapeSelect").addEventListener("change", (e) => {
    qrCode.update({ dotsOptions: { type: e.target.value } });
});

document.getElementById("eyeStyleSelect").addEventListener("change", (e) => {
    qrCode.update({ cornersSquareOptions: { type: e.target.value } });
});


document.getElementById("logoInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            qrCode.update({ image: event.target.result, imageOptions: { crossOrigin: "anonymous", margin: 10 } });
        };
        reader.readAsDataURL(file);
    }
});


document.getElementById("generateBtn").addEventListener("click", () => {
    const url = document.getElementById("urlInput").value || "https://seusite.com";
    qrCode.update({ data: url });
});


document.getElementById("downloadBtn").addEventListener("click", () => {
    const format = document.getElementById("downloadFormat").value;
    qrCode.update({ backgroundOptions: { color: format === "jpeg" ? "#ffffff" : "transparent" } });
    qrCode.download({ name: "qrcode", extension: format });
});
