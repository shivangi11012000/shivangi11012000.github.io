(function () {
  const P = window.PROFILE, APPS = window.APPS, EARLIER = window.EARLIER, BB = window.BUGBUBBLE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = matchMedia("(hover:hover)").matches;

  const APPLE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>';
  const PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"/></svg>';
  const stores = (l, name) => [
    l.appStore && `<a class="store" target="_blank" rel="noopener" href="${esc(l.appStore)}" aria-label="${esc(name)} on the App Store">${APPLE}<span>Download on the<b>App Store</b></span></a>`,
    l.playStore && `<a class="store" target="_blank" rel="noopener" href="${esc(l.playStore)}" aria-label="${esc(name)} on Google Play">${PLAY}<span>Get it on<b>Google Play</b></span></a>`
  ].filter(Boolean).join("");
  const btn = (href, label) => href ? `<a class="btn" target="_blank" rel="noopener" href="${esc(href)}">${label}</a>` : "";
  const copy = async (text, el, done = "Copied") => {
    const old = el.textContent;
    try { await navigator.clipboard.writeText(text); el.textContent = done; }
    catch { el.textContent = "Select and copy"; }
    setTimeout(() => (el.textContent = old), 1600);
  };

  // ---------- hero ----------
  const nameEl = $("#name");
  [...P.name].forEach((ch, i) => {
    const s = document.createElement("span");
    s.setAttribute("aria-hidden", "true");
    s.innerHTML = `<i style="--i:${i}">${esc(ch)}</i>`;
    nameEl.appendChild(s);
  });
  $("#year").textContent = "© " + new Date().getFullYear();
  if (P.cv) $("#cv-link").href = P.cv; else $("#cv-link").remove();

  const stage = $("#hero-stage");
  const heroPick = [[APPS[0], 1], [APPS[1], 2], [APPS[0], 3]];
  stage.innerHTML = heroPick.map(([a, i], k) =>
    `<div class="ph" style="--k:${k}"><div class="phone"><img src="${esc(a.screenshots[i])}" alt="" width="645" height="1398" decoding="async" ${k ? 'loading="lazy"' : 'fetchpriority="high"'}></div></div>`).join("");
  if (!reduced && canHover) {
    const hero = $(".hero");
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      stage.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      stage.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
    hero.addEventListener("pointerleave", () => { stage.style.setProperty("--px", 0); stage.style.setProperty("--py", 0); });
  }

  // pointer spotlight
  if (!reduced && canHover) {
    addEventListener("pointermove", (e) => {
      document.documentElement.style.setProperty("--mx", e.clientX + "px");
      document.documentElement.style.setProperty("--my", e.clientY + "px");
    }, { passive: true });
  }

  // marquee
  const words = ["React Native", "Swift", "TypeScript", "WebSockets", "CallKit", "VoIP", "RTK Query", "Turbo Modules", "Stream", "Firebase", "Expo", "AVPlayer"];
  const row = words.map((w) => `<span>${esc(w)}</span>`).join("");
  $("#marquee").innerHTML = row + row;

  // ---------- open source ----------
  $("#oss-links").innerHTML =
    btn(BB.npm, `npm  ·  v${esc(BB.version)}`).replace('class="btn"', 'class="btn solid"') + btn(BB.github, "GitHub") ;
  $("#copy-install").addEventListener("click", (e) => copy($("#install-cmd").textContent, e.target));
  $("#oss-demos").innerHTML = BB.demos.map((d) => `
    <figure class="demo" style="margin:0"><div class="phone"><img src="${esc(d.local)}" data-next="${esc(d.src)}" alt="BugBubble running on ${esc(d.label)}" loading="lazy" referrerpolicy="no-referrer"></div>
    <figcaption>${esc(d.label)}</figcaption></figure>`).join("");
  $$("#oss-demos img").forEach((im) => im.addEventListener("error", () => {
    const n = im.dataset.next;
    if (n) { im.removeAttribute("data-next"); im.src = n; }
    else {
      im.closest(".demo").classList.add("fail");
      if ($$("#oss-demos .demo").every((d) => d.classList.contains("fail"))) $("#oss").classList.add("no-demos");
    }
  }));

  // ---------- apps ----------
  const lightboxSets = [];
  const mount = $("#apps-list");
  APPS.forEach((a, ai) => {
    const sec = document.createElement("section");
    sec.className = "app";
    sec.id = a.id;
    sec.style.setProperty("--accent", a.accent);
    sec.style.setProperty("--glow", a.glow);
    sec.innerHTML = `
      <div class="app-top">
        <div class="app-main">
          <div class="app-head">
            <img src="${esc(a.icon)}" alt="" width="64" height="64" referrerpolicy="no-referrer">
            <div><h2>${esc(a.name)}</h2><p class="meta">${esc(a.role)}, ${esc(a.company)}. ${esc(a.period)}</p></div>
          </div>
          <p class="tagline">${esc(a.tagline)}</p>
          <p class="desc">${esc(a.description)}</p>
          <div class="stores">${stores(a.links, a.name)}</div>
        </div>
        <div>
          <dl class="facts">${a.facts.map((f) => `<div><dt>${esc(f.l)}</dt><dd>${esc(f.v)}</dd></div>`).join("")}</dl>
          <ul class="built">${a.built.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
          <div class="stack">${a.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div>
        </div>
      </div>
      <div class="shots-wrap">
        <div class="shots" tabindex="0" role="group" aria-label="${esc(a.name)} screenshots, scroll sideways">
          ${a.screenshots.map((s, i) => `
            <figure class="shot"><div class="phone"><img src="${esc(s)}" alt="${esc(a.name)}: ${esc((a.captions || [])[i] || "screenshot " + (i + 1))}" width="645" height="1398" decoding="async" loading="${i < 3 ? "eager" : "lazy"}" data-i="${i}" draggable="false"></div>
            <figcaption>${esc((a.captions || [])[i] || "")}</figcaption></figure>`).join("")}
        </div>
        <div class="arrows"><button type="button" class="prev" aria-label="Previous screenshots">‹</button><button type="button" class="next" aria-label="Next screenshots">›</button><span class="hint">Drag, swipe or use the arrows</span></div>
      </div>`;
    mount.appendChild(sec);
    lightboxSets.push({ app: a, el: sec });

    // Horizontal carousel. Nothing here listens to the page scroll or the wheel,
    // so scrolling the page never moves the screenshots.
    const strip = $(".shots", sec), prev = $(".prev", sec), next = $(".next", sec);
    const step = () => Math.max(220, Math.round(strip.clientWidth * 0.7));
    const upd = () => {
      prev.disabled = strip.scrollLeft < 8;
      next.disabled = strip.scrollLeft > strip.scrollWidth - strip.clientWidth - 8;
    };
    prev.addEventListener("click", () => strip.scrollBy({ left: -step(), behavior: reduced ? "auto" : "smooth" }));
    next.addEventListener("click", () => strip.scrollBy({ left: step(), behavior: reduced ? "auto" : "smooth" }));
    strip.addEventListener("scroll", upd, { passive: true });
    addEventListener("resize", upd);
    strip.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev.click(); }
    });
    // mouse drag-to-scroll (touch already scrolls natively)
    let down = false, sx = 0, sl = 0, moved = 0;
    strip.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true; moved = 0; sx = e.clientX; sl = strip.scrollLeft;
    });
    addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx));
      if (moved > 5) strip.classList.add("drag");
      strip.scrollLeft = sl - dx;
    });
    addEventListener("pointerup", () => {
      if (!down) return;
      down = false;
      setTimeout(() => strip.classList.remove("drag"), 0);
    });
    strip.addEventListener("click", (e) => { if (moved > 5) { e.stopPropagation(); e.preventDefault(); moved = 0; } }, true);
    upd();
  });

  // hide images that fail to load, keep the layout intact
  document.addEventListener("error", (e) => {
    if (e.target.tagName === "IMG" && !e.target.closest(".demo")) { const ic = e.target.closest(".app-head"); if (ic) e.target.style.display = "none"; else e.target.style.visibility = "hidden"; }
  }, true);

  // ---------- earlier work ----------
  $("#earlier-grid").innerHTML = EARLIER.map((e) => `
    <article><h3>${esc(e.name)}</h3><p>${esc(e.text)}</p><p class="meta">${esc(e.meta)}</p>
    <div class="stores">${stores(e.links, e.name)}</div></article>`).join("");

  // ---------- contact ----------
  $("#contact-links").innerHTML = btn(P.linkedin, "LinkedIn") + btn(P.github, "GitHub") + btn(P.medium, "Medium") + btn(BB.npm, "BugBubble on npm");
  const mail = $("#mail"); mail.href = "mailto:" + P.email; mail.textContent = P.email;
  $("#copy").addEventListener("click", (e) => copy(P.email, e.target));

  // ---------- lightbox ----------
  const lb = $("#lightbox"), lbImg = $("img", lb);
  let set = null, idx = 0;
  const open = (s, i) => { set = s; idx = i; lbImg.src = set.app.screenshots[idx]; lbImg.alt = set.app.name + " screenshot " + (idx + 1); lb.classList.add("on"); lb.setAttribute("aria-hidden", "false"); };
  const close = () => { lb.classList.remove("on"); lb.setAttribute("aria-hidden", "true"); };
  const go = (d) => { const n = set.app.screenshots.length; idx = (idx + d + n) % n; lbImg.src = set.app.screenshots[idx]; };
  document.addEventListener("click", (e) => {
    const im = e.target.closest(".shot img");
    if (im) { const s = lightboxSets.find((x) => x.el.contains(im)); open(s, +im.dataset.i); return; }
    if (!lb.classList.contains("on")) return;
    if (e.target.closest(".prev")) go(-1);
    else if (e.target.closest(".next")) go(1);
    else if (e.target !== lbImg) close();
  });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("on")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  });
})();
