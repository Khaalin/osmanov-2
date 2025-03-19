document.addEventListener('DOMContentLoaded', function() {
    const mask = document.getElementById('mask');
    const windows = document.querySelectorAll('.window');

    function updateMaskCutouts() {
        let maskSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs><mask id="textMask" maskUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="white"/>';

        windows.forEach((window, index) => {
            const rect = window.getBoundingClientRect();
            const bodyRect = document.body.getBoundingClientRect();

            const top = rect.top - bodyRect.top;
            const left = rect.left - bodyRect.left;
            const width = rect.width;
            const height = rect.height;

            maskSVG += `<rect x="${left}" y="${top}" width="${width}" height="${height}" fill="black"/>`;
        });

        maskSVG += '</mask></defs><rect width="100%" height="100%" fill="black" mask="url(#textMask)"/></svg>';

        const dataURL = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(maskSVG);

        mask.style.webkitMaskImage = `url('${dataURL}')`;
        mask.style.maskImage = `url('${dataURL}')`;
    }

    updateMaskCutouts();

    window.addEventListener('resize', updateMaskCutouts);

    window.addEventListener('orientationchange', function() {
        setTimeout(updateMaskCutouts, 100);
    });

    setInterval(updateMaskCutouts, 2000);
});