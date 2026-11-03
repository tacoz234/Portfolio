(function () {
    'use strict';

    var reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    var reduced = reducedQuery.matches;
    reducedQuery.addEventListener('change', function (e) { reduced = e.matches; });
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // ---- Staggered scroll-in: sequential, once ----
    var targets = document.querySelectorAll('.bento-item, .log-label, .log-entry, .project-minimal-card');
    targets.forEach(function (el) {
        el.classList.add('m-reveal');
        var parent = el.closest('.reveal');
        if (parent) parent.classList.add('m-pass');
    });

    function show(el, delay) {
        el.style.setProperty('--m-delay', delay + 'ms');
        el.classList.add('is-in');
    }

    if (!('IntersectionObserver' in window)) {
        targets.forEach(function (el) { show(el, 0); });
    } else {
        var io = new IntersectionObserver(function (entries) {
            var n = 0;
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                show(entry.target, reduced ? 0 : Math.min(n++, 6) * 80);
                io.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -50px 0px', threshold: 0.05 });
        targets.forEach(function (el) { io.observe(el); });
    }

    if (!finePointer) return;

    // ---- Card hover: cursor-follow glow; will-change only while hovered ----
    var timers = new WeakMap();
    document.querySelectorAll('.bento-item, .project-minimal-card').forEach(function (el) {
        el.addEventListener('pointerenter', function () {
            clearTimeout(timers.get(el));
            if (!reduced) el.style.willChange = 'transform';
        });
        el.addEventListener('pointermove', function (e) {
            if (reduced) return;
            var r = el.getBoundingClientRect();
            el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
            el.style.setProperty('--my', (e.clientY - r.top) + 'px');
        });
        el.addEventListener('pointerleave', function () {
            timers.set(el, setTimeout(function () { el.style.willChange = ''; }, 450));
        });
    });

    // ---- Custom cursor: transform-only, rAF loop runs just while catching up ----
    var dot = document.querySelector('.cursor-dot');
    var ring = document.querySelector('.cursor-outline');
    if (!dot || !ring) return;

    var tx = 0, ty = 0, rx = 0, ry = 0, raf = 0, seen = false;

    function render() {
        raf = 0;
        if (reduced) { rx = tx; ry = ty; } else { rx += (tx - rx) * 0.2; ry += (ty - ry) * 0.2; }
        ring.style.setProperty('--cx', rx + 'px');
        ring.style.setProperty('--cy', ry + 'px');
        if (Math.abs(tx - rx) > 0.1 || Math.abs(ty - ry) > 0.1) raf = requestAnimationFrame(render);
    }

    window.addEventListener('mousemove', function (e) {
        tx = e.clientX;
        ty = e.clientY;
        dot.style.setProperty('--cx', tx + 'px');
        dot.style.setProperty('--cy', ty + 'px');
        if (!seen) {
            seen = true;
            rx = tx; ry = ty;
            dot.classList.add('is-live');
            ring.classList.add('is-live');
        }
        if (!raf) raf = requestAnimationFrame(render);
    }, { passive: true });

    document.documentElement.addEventListener('mouseleave', function () {
        dot.classList.remove('is-live');
        ring.classList.remove('is-live');
        seen = false;
    });

    document.addEventListener('mouseover', function (e) {
        var hot = e.target.closest && e.target.closest('a, .btn, .project-minimal-card, .marquee-item, .theme-toggle, .course-tag');
        ring.classList.toggle('is-hot', !!hot);
    });
})();
