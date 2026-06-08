// P1P3 — Main JS v2 | 2026-05-28
(function () {
  "use strict";

  // ── safe wrapper ─────────────────────────────────────────────────────
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[P1P3/" + name + "]", e); }
  }

  // ── state ────────────────────────────────────────────────────────────
  var lang = "en";
  var isPlaying = false;
  var bgVariant = "stars";
  var bgIntensity = 1.0;
  var bgAccent = "#2AF3FF";

  // ── boot ─────────────────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  function boot() {
    safe(initBackground, "background");
    safe(initNav, "nav");
    safe(initClock, "clock");
    safe(initScrollProgress, "scrollProgress");
    safe(initReveals, "reveals");
    safe(initHeroMouse, "heroMouse");
    safe(initWaveform, "waveform");
    safe(initSoundCloud, "soundcloud");
    safe(initContent, "content");
    safe(initForm, "form");
    safe(initGSAP, "gsap");
  }

  // ── Content ──────────────────────────────────────────────────────────
  function C() { return (window.P1P3 && window.P1P3.CONTENT && window.P1P3.CONTENT[lang]) || {}; }

  function initContent() {
    renderContent(lang);
  }

  function renderContent(l) {
    lang = l;
    var c = C();
    if (!c.nav) return;

    // Nav links
    setNavLinks(c);

    // Hero
    setTxt("hero-tagline", c.hero && c.hero.tagline);
    setTxt("hero-caption", c.hero && c.hero.caption);
    setTxt("hero-status", c.hero && c.hero.status);
    setTxt("hero-cta", c.hero && c.hero.cta);
    setTxt("hero-epk", c.hero && c.hero.epk);
    setTxt("hero-scroll-lbl", c.hero && c.hero.scroll);

    // Music
    setTxt("music-label", c.music && c.music.label);
    setTxt("music-title", c.music && c.music.title);
    setTxt("music-sub", c.music && c.music.sub);
    setTxt("player-label", c.music && c.music.player);
    setTxt("releases-label", c.music && c.music.releases);
    setTxt("sessions-label", c.music && c.music.sessions);
    renderReleases(c.music && c.music.tracklist || []);
    renderSessions(c.music && c.music.sessionlist || []);

    // About
    setTxt("about-label", c.about && c.about.label);
    setTxt("about-title", c.about && c.about.title);
    setTxt("about-bio1", c.about && c.about.bio1);
    setTxt("about-bio2", c.about && c.about.bio2);
    setTxt("about-bio3", c.about && c.about.bio3);
    setTxt("statement1", c.about && c.about.statement1);
    setTxt("statement2", c.about && c.about.statement2);
    setTxt("statement3", c.about && c.about.statement3);
    setTxt("about-epk-btn", c.about && c.about.dossierCta);
    setTxt("about-pk-btn", c.about && c.about.presskit);
    renderStats(c.about && c.about.stats || []);
    setTxt("influences-title", c.about && c.about.influencesTitle);
    setTxt("influences-intro", c.about && c.about.influencesIntro);
    setTxt("influences-outro", c.about && c.about.influencesOutro);
    renderInfluences(c.about && c.about.influences || []);

    // Dossier
    setTxt("dossier-label", c.dossier && c.dossier.label);
    setTxt("dossier-footnote", c.dossier && c.dossier.footnote);
    setTxt("dossier-dl", c.dossier && c.dossier.download);
    setTxt("dossier-intro", c.dossier && c.dossier.intro);
    setTxt("dossier-channels-head", c.dossier && c.dossier.channels);
    renderDossierBlocks(c.dossier && c.dossier.blocks || []);
    renderDossierContact(c.dossier && c.dossier.contact || []);

    // Rider
    setTxt("rider-label", c.rider && c.rider.label);
    setTxt("rider-title", c.rider && c.rider.title);
    setTxt("rider-sub", c.rider && c.rider.sub);
    renderRider(c.rider);

    // Booking
    setTxt("booking-label", c.booking && c.booking.label);
    setTxt("booking-title", c.booking && c.booking.title);
    setTxt("booking-sub", c.booking && c.booking.sub);
    setTxt("aside-head", c.booking && c.booking.direct);
    if (c.booking && c.booking.fields) {
      setAttr("field-name-el", "textContent", c.booking.fields.name);
      setAttr("field-email-el", "textContent", c.booking.fields.email);
      setAttr("field-date-el", "textContent", c.booking.fields.date);
      setAttr("field-city-el", "textContent", c.booking.fields.city);
      setAttr("field-budget-el", "textContent", c.booking.fields.budget);
      setAttr("field-message-el", "textContent", c.booking.fields.message);
      setTxt("form-send-txt", c.booking.fields.send);
    }

    // Live
    setTxt("live-label", c.live && c.live.label);
    setTxt("live-title", c.live && c.live.title);
    setTxt("live-sub", c.live && c.live.sub);
    renderLive(c.live);

    // Footer
    setTxt("footer-built", c.footer && c.footer.built);
    var yr = new Date().getFullYear();
    setTxt("footer-copy", "© P1P3 — " + yr + " — " + (c.footer && c.footer.rights));

    // Lang buttons
    document.querySelectorAll(".lang-btn, .mobile-lang-btn").forEach(function (b) {
      b.classList.toggle("is-active", b.dataset.lang === lang);
    });
  }

  function setTxt(id, txt) {
    var el = document.getElementById(id);
    if (el && txt !== undefined && txt !== null) el.textContent = txt;
  }
  function setAttr(id, attr, val) {
    var el = document.getElementById(id);
    if (el && val !== undefined) el[attr] = val;
  }

  function setNavLinks(c) {
    var links = document.querySelectorAll(".nav-link[data-key], .mobile-nav-link[data-key]");
    links.forEach(function (a) {
      var key = a.dataset.key;
      if (c.nav && c.nav[key]) a.textContent = c.nav[key];
    });
  }

  function renderReleases(list) {
    var el = document.getElementById("release-list");
    if (!el) return;
    el.innerHTML = list.map(function (t) {
      var playBtn = t.url
        ? '<button class="release-play" data-sc-url="' + esc(t.url) + '" aria-label="Play">' +
            '<svg width="13" height="13" viewBox="0 0 13 13" aria-hidden="true"><path d="M2 1L11 6.5L2 12Z" fill="currentColor"/></svg>' +
          '</button>'
        : '<button class="release-play" aria-label="Play" disabled>' +
            '<svg width="13" height="13" viewBox="0 0 13 13" aria-hidden="true"><path d="M2 1L11 6.5L2 12Z" fill="currentColor"/></svg>' +
          '</button>';
      return '<li class="release-item">' +
        '<span class="release-n mono">' + t.n + '</span>' +
        '<div class="release-meta">' +
          '<span class="release-title">' + esc(t.title) + '</span>' +
          '<span class="release-sub">' + esc(t.label) + ' · ' + t.year + ' · ' + esc(t.kind) + '</span>' +
        '</div>' +
        playBtn +
      '</li>';
    }).join('');

    // Click handler — load track in main player and scroll to it
    el.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-sc-url]');
      if (!btn) return;
      var url = btn.getAttribute('data-sc-url');
      document.querySelector('.player') && document.querySelector('.player').scrollIntoView({ behavior: 'smooth', block: 'center' });
      playScTrack(url);
    });
  }

  function renderSessions(list) {
    var el = document.getElementById("session-list");
    if (!el) return;
    el.innerHTML = list.map(function (t) {
      var playBtn = t.url
        ? '<button class="release-play" data-sc-url="' + esc(t.url) + '" aria-label="Play">' +
            '<svg width="13" height="13" viewBox="0 0 13 13" aria-hidden="true"><path d="M2 1L11 6.5L2 12Z" fill="currentColor"/></svg>' +
          '</button>'
        : '<button class="release-play" aria-label="Play" disabled>' +
            '<svg width="13" height="13" viewBox="0 0 13 13" aria-hidden="true"><path d="M2 1L11 6.5L2 12Z" fill="currentColor"/></svg>' +
          '</button>';
      return '<li class="release-item release-item--session">' +
        '<span class="release-n mono">' + t.n + '</span>' +
        '<div class="release-meta">' +
          '<span class="release-title">' + esc(t.title) + '</span>' +
          (t.desc ? '<span class="release-desc mono">' + esc(t.desc) + '</span>' : '') +
          '<span class="release-sub">' + esc(t.label) + ' · ' + t.year + ' · ' + esc(t.kind) + '</span>' +
        '</div>' +
        playBtn +
      '</li>';
    }).join('');

    el.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-sc-url]');
      if (!btn) return;
      var url = btn.getAttribute('data-sc-url');
      document.querySelector('.player') && document.querySelector('.player').scrollIntoView({ behavior: 'smooth', block: 'center' });
      playScTrack(url);
    });
  }

  function renderInfluences(list) {
    var el = document.getElementById("influences-list");
    if (!el) return;
    el.innerHTML = list.map(function(name) {
      return '<li class="influences-item"><span class="influences-bullet mono">·</span>' + esc(name) + '</li>';
    }).join('');
  }

  function renderStats(stats) {
    var el = document.getElementById("stats-container");
    if (!el) return;
    el.innerHTML = stats.map(function (s) {
      return '<div class="stat">' +
        '<span class="stat-v">' + esc(s.v) + '</span>' +
        '<span class="stat-k mono dim">' + esc(s.k) + '</span>' +
      '</div>';
    }).join('');
  }

  function renderDossierBlocks(blocks) {
    var el = document.getElementById("dossier-blocks");
    if (!el) return;
    el.innerHTML = blocks.map(function (b) {
      return '<div class="dossier-block">' +
        '<span class="dossier-block-tag mono">' + esc(b.tag) + '</span>' +
        '<span class="dossier-block-body">' + esc(b.body) + '</span>' +
      '</div>';
    }).join('');
  }

  function renderDossierContact(contacts) {
    var el = document.getElementById("dossier-contact-list");
    if (!el) return;
    el.innerHTML = contacts.map(function (c) {
      var isExt = c.href && c.href.startsWith("http");
      return '<a class="dossier-contact-item" href="' + c.href + '"' +
        (isExt ? ' target="_blank" rel="noopener"' : '') + '>' +
        '<span class="dossier-contact-k mono">' + esc(c.k) + '</span>' +
        '<span class="dossier-contact-v">' + esc(c.v) + '</span>' +
      '</a>';
    }).join('');
  }

  function renderRider(r) {
    if (!r) return;
    var cols = [
      document.getElementById("rider-col-1"),
      document.getElementById("rider-col-2"),
    ];
    if (!cols[0] || !cols[1]) return;

    // col-1: audio — col-2: hospitality
    cols[0].innerHTML = [r.audio].filter(Boolean).map(function(s) {
      return riderBlock(s);
    }).join('');
    cols[1].innerHTML = [r.hospitality].filter(Boolean).map(function(s) {
      return riderBlock(s);
    }).join('');

    var notesEl = document.getElementById("rider-notes");
    if (notesEl && r.notes) {
      var items = r.notes.items || [];
      notesEl.innerHTML = '<div class="rider-block-tag mono">' + esc(r.notes.tag) + '</div>' +
        '<ul class="rider-list rider-list-notes">' +
        items.map(function(it) { return '<li>' + esc(it) + '</li>'; }).join('') +
        '</ul>';
    }
  }

  function riderBlock(s) {
    if (!s) return '';
    var items = s.items || [];
    return '<div class="rider-block">' +
      '<div class="rider-block-tag mono">' + esc(s.tag) + '</div>' +
      '<ul class="rider-list">' +
      items.map(function(it) {
        if (typeof it === 'string') return '<li>' + esc(it) + '</li>';
        return '<li class="' + (it.red ? 'is-red' : '') + '">' +
          esc(it.main) +
          (it.note ? ' <span class="rider-note-inline mono">' + esc(it.note) + '</span>' : '') +
        '</li>';
      }).join('') +
      '</ul>' +
    '</div>';
  }

  function renderLive(live) {
    var el = document.getElementById("live-content");
    if (!el || !live) return;
    var shows = live.shows || [];
    if (shows.length === 0) {
      el.innerHTML =
        '<div class="live-empty">' +
          '<div class="live-empty-inner">' +
            '<div class="live-empty-mark">' +
              '<span class="live-empty-dot"></span>' +
              '<span class="live-empty-line"></span>' +
            '</div>' +
            '<div class="live-empty-head mono">' + esc(live.tba) + '</div>' +
            '<p class="live-empty-body">' + esc(live.tbaBody) + '</p>' +
            '<a href="#booking" class="live-empty-cta" data-scroll>' +
              '<span>' + esc(live.tbaCta) + '</span>' +
              '<span aria-hidden="true">→</span>' +
            '</a>' +
          '</div>' +
        '</div>';
    } else {
      var months_en = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
      var months_es = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
      var months = lang === "es" ? months_es : months_en;
      el.innerHTML = '<ol class="shows">' +
        shows.map(function (s, i) {
          var d = new Date(s.date + "T00:00:00");
          var day = String(d.getDate()).padStart(2, "0");
          var mon = months[d.getMonth()];
          var yr = d.getFullYear();
          var sold = s.status === "soldout";
          return '<li class="show' + (sold ? ' is-sold' : '') + '">' +
            '<span class="show-idx mono">' + String(i + 1).padStart(2, "0") + '</span>' +
            '<div class="show-date">' +
              '<span class="show-day">' + day + '</span>' +
              '<span class="show-mon mono dim">' + mon + ' ' + yr + '</span>' +
            '</div>' +
            '<div class="show-place">' +
              '<span class="show-city">' + esc(s.city) + '</span>' +
              '<span class="show-country mono dim">— ' + esc(s.country) + '</span>' +
            '</div>' +
            '<div class="show-venue">' +
              '<span class="show-venue-name">' + esc(s.venue) + '</span>' +
              (s.note ? '<span class="show-note mono">' + esc(s.note) + '</span>' : '') +
            '</div>' +
            '<div class="show-action">' +
              (sold
                ? '<span class="pill is-muted">' + live.soldout + '</span>'
                : '<a href="#" class="pill is-tickets">' + live.tickets + ' <span aria-hidden="true">→</span></a>'
              ) +
            '</div>' +
          '</li>';
        }).join('') +
      '</ol>';
    }
  }

  function esc(s) {
    if (s === undefined || s === null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ── Nav ──────────────────────────────────────────────────────────────
  function initNav() {
    var nav = document.getElementById("nav");
    var menuBtn = document.querySelector(".nav-menu-btn");
    var overlay = document.getElementById("mobile-overlay");

    // scroll effect
    function onScroll() {
      nav.classList.toggle("is-scrolled", window.scrollY > 16);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // smooth scroll for anchor links
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var offset = 80;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
      // close mobile nav if open
      if (overlay && overlay.classList.contains("is-open")) toggleMenu();
    });

    // mobile menu
    if (menuBtn && overlay) {
      menuBtn.addEventListener("click", toggleMenu);
    }

    // lang buttons
    document.querySelectorAll(".lang-btn, .mobile-lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        renderContent(btn.dataset.lang || "en");
      });
    });

    function toggleMenu() {
      var open = overlay.classList.toggle("is-open");
      menuBtn.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    }
  }

  // ── Clock ─────────────────────────────────────────────────────────────
  function initClock() {
    var el = document.getElementById("hero-clock");
    if (!el) return;
    function update() {
      var d = new Date();
      var opts = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "America/Bogota" };
      el.textContent = d.toLocaleTimeString("en-GB", opts) + " COT";
    }
    update();
    setInterval(update, 1000);
  }

  // ── Scroll progress ───────────────────────────────────────────────────
  function initScrollProgress() {
    var bar = document.getElementById("scroll-progress");
    if (!bar) return;
    function update() {
      var doc = document.documentElement;
      var h = doc.scrollHeight - doc.clientHeight;
      var pct = h > 0 ? (window.scrollY / h * 100).toFixed(1) : 0;
      bar.style.setProperty("--p", pct + "%");
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  // ── Reveal on scroll ──────────────────────────────────────────────────
  function initReveals() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -4% 0px" });

    document.querySelectorAll(".reveal, .reveal-left").forEach(function (el) {
      io.observe(el);
    });

    // Safety net — revela en viewport a los 3s, todos a los 8s
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.is-visible), .reveal-left:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.2) {
          el.classList.add("is-visible");
        }
      });
    }, 3000);
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.is-visible), .reveal-left:not(.is-visible)").forEach(function (el) {
        el.classList.add("is-visible");
      });
    }, 8000);
  }

  // ── Hero mouse gradient ───────────────────────────────────────────────
  function initHeroMouse() {
    var hero = document.getElementById("hero");
    if (!hero) return;
    var glow = document.getElementById("hero-glow");
    if (!glow) return;
    var rx = 0, ry = 0, mx = window.innerWidth / 2, my = window.innerHeight / 2;

    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
    });

    var raf;
    function loop() {
      rx += (mx - rx) * 0.06;
      ry += (my - ry) * 0.06;
      glow.style.left = rx + "px";
      glow.style.top = ry + "px";
      raf = requestAnimationFrame(loop);
    }
    loop();
  }

  // ── Waveform ──────────────────────────────────────────────────────────
  function initWaveform() {
    var BARS = 48;
    var container = document.getElementById("waveform");
    if (!container) return;

    // Build bars with cyan→magenta gradient per position
    // All bars share the same vertical gradient: cyan (base) → purple → magenta (top)
    var barGradient = 'linear-gradient(to top, rgb(42,243,255) 0%, rgb(100,100,255) 50%, rgb(255,46,136) 100%)';
    var html = "";
    for (var i = 0; i < BARS; i++) {
      html += '<span class="waveform-bar" style="background:' + barGradient + '"></span>';
    }
    container.innerHTML = html;

    var bars = container.querySelectorAll(".waveform-bar");
    // Each bar: multiple sine waves + random phase for organic feel
    var seeds = Array.from({ length: BARS }, function (_, i) {
      var pos = i / (BARS - 1); // 0..1
      // Center-weighted envelope so middle bars are taller (classic EQ shape)
      var env = 0.3 + 0.7 * Math.sin(pos * Math.PI);
      return {
        env: env,
        f1: 0.8 + Math.random() * 1.8,   // slow wave
        f2: 3.0 + Math.random() * 4.0,   // fast wave
        f3: 1.5 + Math.random() * 2.5,   // mid wave
        p1: Math.random() * Math.PI * 2,
        p2: Math.random() * Math.PI * 2,
        p3: Math.random() * Math.PI * 2,
        spikeTimer: Math.random() * 60,   // frames until next spike
        spikeVal: 0,
      };
    });
    var last = new Array(BARS).fill(0.05);
    var t0 = performance.now();

    function frame(now) {
      var t = (now - t0) / 1000;
      for (var i = 0; i < BARS; i++) {
        var s = seeds[i];
        var target;
        if (isPlaying) {
          var a = (Math.sin(t * s.f1 + s.p1) + 1) / 2;
          var b = (Math.sin(t * s.f2 + s.p2) + 1) / 2;
          var c = (Math.sin(t * s.f3 + s.p3) + 1) / 2;
          // Weighted mix: slow wave dominates shape, fast gives life
          var raw = a * 0.45 + b * 0.35 + c * 0.20;
          // Random spikes
          s.spikeTimer--;
          if (s.spikeTimer <= 0) {
            s.spikeVal = 0.25 + Math.random() * 0.45;
            s.spikeTimer = 20 + Math.random() * 80;
          }
          s.spikeVal *= 0.88; // decay spike
          target = 0.08 + (raw * 0.78 + s.spikeVal) * s.env;
        } else {
          // Idle: very subtle breathing
          var idle = (Math.sin(t * 0.9 + s.p1) + 1) / 2;
          target = 0.04 + idle * 0.06 * s.env;
        }
        target = Math.max(0.03, Math.min(1, target));
        var prev = last[i];
        // Fast attack, slow decay — classic VU meter feel
        var ease = target > prev ? 0.55 : 0.12;
        var v = prev + (target - prev) * ease;
        last[i] = v;
        // clip from top: inset(top% 0 0 0) — segments always same size
        var topPct = ((1 - v) * 100).toFixed(1);
        bars[i].style.clipPath = "inset(" + topPct + "% 0 0 0)";
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // ── SoundCloud ────────────────────────────────────────────────────────
  var _currentScUrl = null;

  function playScTrack(url) {
    var iframe = document.getElementById('sc-iframe');
    if (!iframe) return;
    _currentScUrl = url;

    // Highlight active release across both lists
    document.querySelectorAll('#release-list .release-item, #session-list .release-item').forEach(function(li) { li.classList.remove('is-active'); });
    var activeBtn = document.querySelector('[data-sc-url="' + url + '"]');
    if (activeBtn) activeBtn.closest('.release-item').classList.add('is-active');

    if (window._scWidget) {
      window._scWidget.load(url, { auto_play: true, hide_related: true, show_comments: false, show_user: true, show_reposts: false, visual: true });
    } else {
      var src = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(url);
      src += '&color=%232AF3FF&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true';
      iframe.src = src;
    }
  }

  function playRandomTrack() {
    var urls = Array.from(document.querySelectorAll('[data-sc-url]')).map(function(b) { return b.getAttribute('data-sc-url'); });
    if (!urls.length) return;
    // pick a random track different from current
    var pool = urls.filter(function(u) { return u !== _currentScUrl; });
    if (!pool.length) pool = urls;
    var next = pool[Math.floor(Math.random() * pool.length)];
    playScTrack(next);
  }

  window.playScTrack = playScTrack; // expose for release clicks

  function initSoundCloud() {
    var iframe = document.getElementById("sc-iframe");
    var statusEl = document.getElementById("player-status");
    if (!iframe) return;

    function tryBind() {
      if (!window.SC || !window.SC.Widget) {
        setTimeout(tryBind, 300);
        return;
      }
      var w = window.SC.Widget(iframe);
      window._scWidget = w;
      w.bind(window.SC.Widget.Events.PLAY, function () {
        isPlaying = true;
        if (statusEl) statusEl.textContent = "● NOW PLAYING";
        if (statusEl) statusEl.style.color = "var(--accent)";
        document.getElementById("waveform") && document.getElementById("waveform").classList.add("is-playing");
      });
      w.bind(window.SC.Widget.Events.PAUSE, function () {
        isPlaying = false;
        if (statusEl) statusEl.textContent = "○ PAUSED";
        if (statusEl) statusEl.style.color = "";
        document.getElementById("waveform") && document.getElementById("waveform").classList.remove("is-playing");
      });
      w.bind(window.SC.Widget.Events.FINISH, function () {
        isPlaying = false;
        if (statusEl) statusEl.textContent = "○ PAUSED";
        if (statusEl) statusEl.style.color = "";
        document.getElementById("waveform") && document.getElementById("waveform").classList.remove("is-playing");
        // Auto-play next random track
        setTimeout(playRandomTrack, 800);
      });
    }
    tryBind();
  }

  // ── Booking form ──────────────────────────────────────────────────────
  function initForm() {
    var form = document.getElementById("booking-form");
    var btn = document.getElementById("form-send-btn");
    var txt = document.getElementById("form-send-txt");
    if (!form || !btn || !txt) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      btn.classList.add("is-sent");
      var c = C();
      if (txt && c.booking && c.booking.fields) txt.textContent = c.booking.fields.sent;
      setTimeout(function () {
        btn.classList.remove("is-sent");
        if (txt && c.booking && c.booking.fields) txt.textContent = c.booking.fields.send;
        form.reset();
      }, 5000);
    });
  }

  // ── GSAP ──────────────────────────────────────────────────────────────
  function initGSAP() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // Section title reveals
    document.querySelectorAll(".section-title").forEach(function (el) {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 85%", once: true }
        }
      );
    });

    // Stat counters
    document.querySelectorAll(".stat-v").forEach(function (el) {
      var target = parseInt(el.textContent, 10);
      if (isNaN(target)) return;
      el.textContent = "00";
      gsap.to({ val: 0 }, {
        val: target, duration: 1.8, ease: "power2.out",
        onUpdate: function () {
          el.textContent = String(Math.round(this.targets()[0].val)).padStart(2, "0");
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    // Hero name reveal
    var heroName = document.querySelector(".hero-name");
    if (heroName) {
      gsap.from(heroName, { y: 60, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.2 });
    }
    var heroEyebrow = document.querySelector(".hero-eyebrow");
    if (heroEyebrow) {
      gsap.from(heroEyebrow, { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.1 });
    }
    var heroTagline = document.querySelector(".hero-tagline");
    if (heroTagline) {
      gsap.from(heroTagline, { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.5 });
    }
    var heroActions = document.querySelector(".hero-actions");
    if (heroActions) {
      gsap.from(heroActions, { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.75 });
    }

    // Photo strip — entrada dinámica + parallax interior
    document.querySelectorAll(".ps-row").forEach(function (row, i) {
      var fromX = i % 2 === 0 ? "-8%" : "8%";
      // Entrada: slide desde el lado + fade
      gsap.fromTo(row,
        { x: fromX, opacity: 0 },
        {
          x: "0%", opacity: 1,
          duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true }
        }
      );
      // Parallax en la imagen interior
      var imgWrap = row.querySelector(".ps-img-wrap");
      var img = row.querySelector(".ps-img");
      if (imgWrap && img) {
        gsap.fromTo(img,
          { y: "-8%" },
          {
            y: "8%", ease: "none",
            scrollTrigger: {
              trigger: imgWrap,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );
      }
    });

    // About logo — no parallax (overlay on portrait)

    // Dossier frame
    var dossierFrame = document.querySelector(".dossier-frame");
    if (dossierFrame) {
      gsap.fromTo(dossierFrame,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: dossierFrame, start: "top 85%", once: true }
        }
      );
    }

    // Rider blocks stagger
    var riderBlocks = document.querySelectorAll(".rider-block");
    if (riderBlocks.length > 0) {
      gsap.fromTo(riderBlocks,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power2.out",
          immediateRender: false,
          scrollTrigger: { trigger: riderBlocks[0], start: "top 85%", once: true }
        }
      );
    }
  }

  // ── Background canvas ─────────────────────────────────────────────────
  function initBackground() {
    var canvas = document.getElementById("bg-canvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");

    var S = { mouseX: 0, mouseY: 0, w: 0, h: 0, dpr: 1, t: 0, last: 0, click: 0 };
    var particles = [], stars = [];

    function resize() {
      S.dpr = Math.min(window.devicePixelRatio || 1, 2);
      S.w = window.innerWidth;
      S.h = window.innerHeight;
      canvas.width = S.w * S.dpr;
      canvas.height = S.h * S.dpr;
      canvas.style.width = S.w + "px";
      canvas.style.height = S.h + "px";
      ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
      buildScene();
    }

    function onMove(e) {
      var t = e.touches ? e.touches[0] : e;
      S.mouseX = t.clientX; S.mouseY = t.clientY;
    }
    function onClick() { S.click = 1; }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("click", onClick);
    window.addEventListener("resize", resize);

    function buildScene() {
      var area = S.w * S.h;
      if (bgVariant === "stars") {
        var count = Math.floor(area / 1800 * bgIntensity);
        stars = Array.from({ length: count }, function () {
          return {
            x: Math.random() * S.w, y: Math.random() * S.h,
            z: Math.random() * 0.9 + 0.1,
            r: Math.random() * 1.4 + 0.2,
            tw: Math.random() * Math.PI * 2,
            tws: Math.random() * 0.02 + 0.005,
          };
        });
      } else if (bgVariant === "network") {
        var nc = Math.floor(area / 14000 * bgIntensity);
        particles = Array.from({ length: nc }, function () {
          return { x: Math.random() * S.w, y: Math.random() * S.h, vx: (Math.random()-0.5)*0.25, vy: (Math.random()-0.5)*0.25, r: Math.random()*1.6+0.6 };
        });
      } else {
        var gc = Math.floor(area / 9000 * bgIntensity);
        particles = Array.from({ length: gc }, function () {
          return { x: Math.random()*S.w, y: Math.random()*S.h, vy: -(Math.random()*0.35+0.1), r: Math.random()*1.2+0.3, o: Math.random()*0.6+0.2 };
        });
      }
    }

    resize();

    function hexA(hex, a) {
      var h = hex.replace("#","");
      var r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16);
      return "rgba("+r+","+g+","+b+","+a+")";
    }

    function drawStars() {
      ctx.fillStyle = "#000"; ctx.fillRect(0,0,S.w,S.h);
      var mx = S.mouseX||S.w/2, my = S.mouseY||S.h/2;
      var gr = 380+S.click*220;
      var grad = ctx.createRadialGradient(mx,my,0,mx,my,gr);
      grad.addColorStop(0,hexA(bgAccent,0.18+S.click*0.12));
      grad.addColorStop(0.5,hexA(bgAccent,0.05));
      grad.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=grad; ctx.fillRect(0,0,S.w,S.h);
      var g2=ctx.createRadialGradient(S.w*0.2,S.h*0.3,0,S.w*0.2,S.h*0.3,600);
      g2.addColorStop(0,"rgba(42,243,255,0.05)"); g2.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=g2; ctx.fillRect(0,0,S.w,S.h);
      var ox=(mx-S.w/2)*0.02, oy=(my-S.h/2)*0.02;
      for (var i=0;i<stars.length;i++) {
        var s=stars[i]; s.tw+=s.tws;
        var tw=(Math.sin(s.tw)+1)*0.5;
        var px=s.x+ox*s.z*3, py=s.y+oy*s.z*3;
        var alpha=0.22+tw*0.78*s.z;
        if (s.z>0.7&&tw>0.85) {
          ctx.fillStyle=hexA(bgAccent,alpha*0.35);
          ctx.beginPath(); ctx.arc(px,py,s.r*2.2,0,Math.PI*2); ctx.fill();
        }
        ctx.fillStyle="rgba(255,255,255,"+alpha.toFixed(3)+")";
        ctx.beginPath(); ctx.arc(px,py,s.r*s.z,0,Math.PI*2); ctx.fill();
      }
    }

    function drawNetwork() {
      ctx.fillStyle="rgba(0,0,0,0.55)"; ctx.fillRect(0,0,S.w,S.h);
      var g=ctx.createLinearGradient(0,S.h*0.5,0,S.h);
      g.addColorStop(0,"rgba(0,0,0,0)"); g.addColorStop(1,hexA(bgAccent,0.07));
      ctx.fillStyle=g; ctx.fillRect(0,0,S.w,S.h);
      var mx=S.mouseX||-9999, my=S.mouseY||-9999;
      var ld=130, ld2=ld*ld, mr=200;
      for (var i=0;i<particles.length;i++) {
        var p=particles[i];
        var dx=mx-p.x, dy=my-p.y, d2=dx*dx+dy*dy;
        if (d2<mr*mr) { var f=(1-Math.sqrt(d2)/mr)*0.06; p.vx+=dx*0.0008*f*60; p.vy+=dy*0.0008*f*60; }
        p.vx*=0.985; p.vy*=0.985;
        p.x+=p.vx; p.y+=p.vy;
        if (p.x<-20) p.x=S.w+20; if (p.x>S.w+20) p.x=-20;
        if (p.y<-20) p.y=S.h+20; if (p.y>S.h+20) p.y=-20;
      }
      ctx.lineWidth=0.6;
      for (var i=0;i<particles.length;i++) {
        for (var j=i+1;j<particles.length;j++) {
          var a=particles[i], b=particles[j];
          var dx=a.x-b.x, dy=a.y-b.y, d2=dx*dx+dy*dy;
          if (d2<ld2) {
            var alpha=(1-Math.sqrt(d2)/ld)*0.48;
            ctx.strokeStyle=hexA(bgAccent,alpha);
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
      }
      for (var i=0;i<particles.length;i++) {
        var p=particles[i];
        var near=(mx-p.x)**2+(my-p.y)**2<mr*mr;
        ctx.fillStyle=near?hexA(bgAccent,0.95):"rgba(255,255,255,0.65)";
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
      }
    }

    function drawGrid() {
      ctx.fillStyle="#000"; ctx.fillRect(0,0,S.w,S.h);
      var hy=S.h*0.62, mx=S.mouseX||S.w/2;
      var gTop=ctx.createRadialGradient(mx,hy*0.4,0,mx,hy*0.4,500);
      gTop.addColorStop(0,hexA(bgAccent,0.13)); gTop.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=gTop; ctx.fillRect(0,0,S.w,hy);
      var hGrad=ctx.createLinearGradient(0,hy-40,0,hy+40);
      hGrad.addColorStop(0,"rgba(0,0,0,0)"); hGrad.addColorStop(0.5,hexA(bgAccent,0.55)); hGrad.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=hGrad; ctx.fillRect(0,hy-40,S.w,80);
      ctx.save(); ctx.strokeStyle=hexA(bgAccent,0.32); ctx.lineWidth=1;
      var vp={x:S.w/2+(mx-S.w/2)*0.05,y:hy}, bot=S.h+100, sp=60, cols=22;
      for (var i=-cols;i<=cols;i++) {
        var xb=S.w/2+i*sp*4;
        ctx.beginPath(); ctx.moveTo(vp.x,vp.y); ctx.lineTo(xb,bot); ctx.stroke();
      }
      var spd=60, phase=(S.t*spd)%sp;
      for (var i=0;i<30;i++) {
        var k=i+phase/sp, yLin=hy+(Math.pow(k/30,2.2))*(bot-hy);
        if (yLin>bot) continue;
        var alpha=Math.max(0,1-(yLin-hy)/(bot-hy));
        ctx.strokeStyle=hexA(bgAccent,0.48*alpha);
        ctx.beginPath(); ctx.moveTo(0,yLin); ctx.lineTo(S.w,yLin); ctx.stroke();
      }
      ctx.restore();
      var spp=(S.t%6)/6;
      if (spp<0.5) {
        var sx=spp*2*S.w;
        var sg=ctx.createLinearGradient(sx-80,0,sx+80,0);
        sg.addColorStop(0,"rgba(0,0,0,0)"); sg.addColorStop(0.5,hexA(bgAccent,0.12)); sg.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle=sg; ctx.fillRect(sx-80,0,160,S.h);
      }
      for (var i=0;i<particles.length;i++) {
        var p=particles[i]; p.y+=p.vy;
        if (p.y<-10) { p.y=S.h+10; p.x=Math.random()*S.w; }
        ctx.fillStyle="rgba(255,255,255,"+p.o.toFixed(2)+")";
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
      }
    }

    function loop(now) {
      var dt = Math.min(50, now - S.last) || 16;
      S.last = now; S.t += dt * 0.001; S.click *= 0.93;
      if (bgVariant === "stars") drawStars();
      else if (bgVariant === "network") drawNetwork();
      else drawGrid();
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    // Expose for bg switcher
    window.P1P3 = window.P1P3 || {};
    window.P1P3.setBg = function (variant, intensity, accent) {
      bgVariant = variant || bgVariant;
      bgIntensity = intensity !== undefined ? intensity : bgIntensity;
      bgAccent = accent || bgAccent;
      buildScene();
    };
  }

})();
