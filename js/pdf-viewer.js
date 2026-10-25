// The Cash Cows — PDF-viewer voor playlist en technical rider.
// Rendert alle pagina's onder elkaar, zodat ze ook op mobiel allemaal te zien zijn
// (een PDF in een iframe toont op telefoons vaak alleen de eerste pagina).

(function () {
  const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
  const box = document.getElementById('doc-pages');
  if (!box) return;
  const url = box.dataset.pdf;

  const fallback = () => {
    box.innerHTML = '';
    const frame = document.createElement('iframe');
    frame.className = 'doc-frame';
    frame.src = url;
    frame.title = document.title;
    box.replaceWith(frame);
  };

  const script = document.createElement('script');
  script.src = PDFJS + 'pdf.min.js';
  script.onerror = fallback;
  script.onload = async () => {
    try {
      const lib = window.pdfjsLib;
      lib.GlobalWorkerOptions.workerSrc = PDFJS + 'pdf.worker.min.js';
      const pdf = await lib.getDocument(url).promise;
      const pages = [];
      for (let i = 1; i <= pdf.numPages; i++) pages.push(await pdf.getPage(i));

      let lastWidth = 0;
      const render = async () => {
        const width = box.clientWidth;
        if (!width || width === lastWidth) return;
        lastWidth = width;
        const dpr = Math.min(window.devicePixelRatio || 1, 3);
        const canvases = [];
        for (const page of pages) {
          const base = page.getViewport({ scale: 1 });
          const scale = (width / base.width) * dpr;
          const vp = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          canvas.className = 'doc-page';
          canvas.width = Math.floor(vp.width);
          canvas.height = Math.floor(vp.height);
          canvas.style.aspectRatio = `${base.width} / ${base.height}`;
          await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
          canvases.push(canvas);
        }
        box.replaceChildren(...canvases);
      };

      await render();
      let t;
      window.addEventListener('resize', () => {
        clearTimeout(t);
        t = setTimeout(render, 250);
      });
    } catch (e) {
      fallback();
    }
  };
  document.head.appendChild(script);
})();
