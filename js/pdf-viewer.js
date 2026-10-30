// The Cash Cows — PDF-viewer voor playlist en technical rider.
// Rendert alle pagina's onder elkaar, zodat ze ook op mobiel allemaal te zien zijn
// (een PDF in een iframe toont op telefoons vaak alleen de eerste pagina).

(function () {
  const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
  const box = document.getElementById('doc-pages');
  if (!box) return;
  const url = box.dataset.pdf;

  // Lukt renderen niet, dan GEEN iframe meer (die toont op mobiel maar 1 pagina),
  // maar een duidelijke knop om de PDF zelf te openen.
  const MSG = {
    nl: ['Het document kan hier niet getoond worden.', 'Open de PDF'],
    en: ['The document cannot be displayed here.', 'Open the PDF'],
    es: ['No se puede mostrar el documento aquí.', 'Abrir el PDF']
  }[(document.documentElement.lang || 'nl').slice(0, 2)] || ['', 'PDF'];
  const fallback = (err) => {
    if (err) console.error('[pdf-viewer]', err);
    box.innerHTML = '';
    const p = document.createElement('p');
    p.className = 'doc-loading';
    p.textContent = MSG[0];
    const a = document.createElement('a');
    a.href = url;
    a.className = 'ghost-btn';
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = MSG[1];
    box.append(p, a);
  };

  const script = document.createElement('script');
  script.src = PDFJS + 'pdf.min.js';
  script.onerror = () => fallback('pdf.js niet geladen');
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
      fallback(e);
    }
  };
  document.head.appendChild(script);
})();
