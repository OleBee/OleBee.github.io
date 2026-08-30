(() => {
  const map = {
    "ember-window.jpg": "ember-hero.svg",
    "ember-sofa.jpg": "ember-hero.svg",
    "ember-close.jpg": "ember-hero.svg",
    "ember-angle.jpg": "ember-angle.svg",
    "host-lie.jpg": "host-hero.svg",
    "host-portrait.jpg": "host-hero.svg",
    "host-sofa.jpg": "host-hero.svg",
    "host-wide.jpg": "host-hero.svg",
    "kveld-balkong.jpg": "kveld-hero.svg",
    "kveld-gulv.jpg": "kveld-hero.svg",
    "kveld-rom.jpg": "kveld-hero.svg",
    "kveld-staende.jpg": "kveld-hero.svg",
    "rav-carve.jpg": "rav-hero.svg",
    "rav-full.jpg": "rav-hero.svg",
    "rav-sofa.jpg": "rav-hero.svg",
    "rav-wide.jpg": "rav-hero.svg"
  };
  const rewrite = (url) => {
    if (!url) return url;
    let next = url;
    for (const [from, to] of Object.entries(map)) {
      if (next.includes(from)) next = next.split(from).join(to);
    }
    if (next !== url) next = next.replace(/([?&])v=\d+/, "$1v=13");
    return next;
  };
  const scan = () => {
    document.querySelectorAll("img").forEach((img) => {
      const cur = img.getAttribute("src") || img.src || "";
      const next = rewrite(cur);
      if (next && next !== cur) img.setAttribute("src", next);
    });
  };
  const obs = new MutationObserver(scan);
  obs.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src"]
  });
  scan();
})();
