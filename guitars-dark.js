(() => {
  const files = ["/sg-ember.js?v=13","/sg-host.js?v=13","/sg-kveld.js?v=13","/sg-rav.js?v=13"];
  let left = files.length;
  const done = () => {
    const U = window.SG || {};
    const rewrite = (url) => {
      if (!url) return url;
      for (const name of Object.keys(U)) {
        if (url.indexOf(name) !== -1 && U[name]) return U[name];
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
    const obs = new MutationObserver(scan);
    obs.observe(document.documentElement, {childList:true,subtree:true,attributes:true,attributeFilter:["src"]});
    scan();
  };
  files.forEach((src) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => { left -= 1; if (left === 0) done(); };
    s.onerror = () => { left -= 1; if (left === 0) done(); };
    document.documentElement.appendChild(s);
  });
})();
