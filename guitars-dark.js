(() => {
  const parts = [
    "/sg-ember-0.js?v=13","/sg-ember-1.js?v=13","/sg-ember-2.js?v=13",
    "/sg-host-0.js?v=13","/sg-host-1.js?v=13","/sg-host-2.js?v=13",
    "/sg-kveld-0.js?v=13","/sg-kveld-1.js?v=13","/sg-kveld-2.js?v=13",
    "/sg-rav-0.js?v=13","/sg-rav-1.js?v=13","/sg-rav-2.js?v=13"
  ];
  const asms = ["/sg-ember.js?v=13","/sg-host.js?v=13","/sg-kveld.js?v=13","/sg-rav.js?v=13"];
  const load = (src) => new Promise((res) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = res;
    s.onerror = res;
    document.documentElement.appendChild(s);
  });
  const rewrite = (url) => {
    const U = window.SG || {};
    if (!url) return url;
    for (const name of Object.keys(U)) {
      if (U[name] && url.indexOf(name) !== -1) return U[name];
    }
    const aliases = {
      "ember-window.jpg":"ember-hero.svg",
      "ember-sofa.jpg":"ember-hero.svg",
      "ember-close.jpg":"ember-hero.svg",
      "ember-angle.jpg":"ember-hero.svg",
      "ember-alt.svg":"ember-hero.svg",
      "ember-angle.svg":"ember-hero.svg",
      "host-lie.jpg":"host-hero.svg",
      "host-portrait.jpg":"host-hero.svg",
      "host-sofa.jpg":"host-hero.svg",
      "host-wide.jpg":"host-hero.svg",
      "kveld-balkong.jpg":"kveld-hero.svg",
      "kveld-gulv.jpg":"kveld-hero.svg",
      "kveld-rom.jpg":"kveld-hero.svg",
      "kveld-staende.jpg":"kveld-hero.svg",
      "rav-carve.jpg":"rav-hero.svg",
      "rav-full.jpg":"rav-hero.svg",
      "rav-sofa.jpg":"rav-hero.svg",
      "rav-wide.jpg":"rav-hero.svg"
    };
    for (const from in aliases) {
      if (url.indexOf(from) !== -1 && U[aliases[from]]) return U[aliases[from]];
    }
    return url;
  };
  const scan = () => {
    document.querySelectorAll("img").forEach((img) => {
      const cur = img.getAttribute("src") || img.src || "";
      const next = rewrite(cur);
      if (next && next !== cur) img.setAttribute("src", next);
    });
  };
  Promise.all(parts.map(load)).then(() => Promise.all(asms.map(load))).then(() => {
    const obs = new MutationObserver(scan);
    obs.observe(document.documentElement, {childList:true,subtree:true,attributes:true,attributeFilter:["src"]});
    scan();
  });
})();
