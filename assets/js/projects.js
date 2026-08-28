/**
 * projects.js
 * Handles two page modes:
 *   Mode A — Works grid (works.html): renders all projects as cards
 *   Mode B — Detail page (project.html): populates a single project's case study
 *
 * Data source: window.PROJECTS_DATA (set by projects-data.js, loaded before this script)
 * This approach works on file:// (no fetch/CORS needed) AND on any HTTP server.
 *
 * To add a new project: edit assets/js/projects-data.js — no changes needed here.
 */

(function () {
    'use strict';

    /* ──────────────────────────────────────────────────
       Detect which page we're on
    ────────────────────────────────────────────────── */
    const isWorksPage  = document.body.classList.contains('page-works');
    const isDetailPage = document.body.classList.contains('page-project-detail');

    if (!isWorksPage && !isDetailPage) return;

    /* ──────────────────────────────────────────────────
       Load project data
       Primary:  window.PROJECTS_DATA (from projects-data.js)
       Fallback: fetch projects.json (for hosted environments)
    ────────────────────────────────────────────────── */
    function getProjects() {
        if (window.PROJECTS_DATA && Array.isArray(window.PROJECTS_DATA)) {
            return Promise.resolve(window.PROJECTS_DATA);
        }
        // Fallback for HTTP server environments
        return fetch('./projects.json')
            .then(function (r) {
                if (!r.ok) throw new Error('HTTP ' + r.status);
                return r.json();
            });
    }

    /* ──────────────────────────────────────────────────
       Helpers
    ────────────────────────────────────────────────── */

    function esc(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function imgPath(pagename, filename) {
        if (!filename) return '';
        return './assets/project-images/' + encodeURIComponent(pagename) + '/' + encodeURIComponent(filename);
    }

    function detailURL(slug) {
        return './project.html?slug=' + encodeURIComponent(slug);
    }

    function techTagHTML(tag, large) {
        var cls = large ? 'detail-tech-tag' : 'tech-tag';
        return '<span class="' + cls + '">' + esc(tag) + '</span>';
    }

    /* ──────────────────────────────────────────────────
       SVG icons
    ────────────────────────────────────────────────── */
    var ARROW_RIGHT_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    var BACK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>';

    /* ══════════════════════════════════════════════════
       MODE A — WORKS PAGE GRID
    ══════════════════════════════════════════════════ */

    function initWorksGrid() {
        var grid = document.getElementById('projects-grid');
        if (!grid) return;

        // Show skeletons while resolving
        grid.innerHTML = buildSkeletons(3);

        getProjects()
            .then(function (projects) {
                grid.innerHTML = '';

                if (!projects || projects.length === 0) {
                    grid.innerHTML =
                        '<div class="projects-empty">' +
                            '<h3>No projects yet</h3>' +
                            '<p>Check back soon — new work is on the way.</p>' +
                        '</div>';
                    return;
                }

                projects.forEach(function (project, index) {
                    if (project.id >= 1 && project.id <= 9) {
                        grid.appendChild(buildBannerCard(project));
                    } else {
                        grid.appendChild(buildProjectCard(project, index));
                    }
                });

                if (typeof AOS !== 'undefined') AOS.refreshHard();
            })
            .catch(function (err) {
                console.error('projects.js grid error:', err);
                grid.innerHTML =
                    '<div class="projects-empty">' +
                        '<h3>Could not load projects</h3>' +
                        '<p>Please try refreshing the page.</p>' +
                    '</div>';
            });
    }

    function buildSkeletons(count) {
        var html = '';
        for (var i = 0; i < count; i++) {
            html +=
                '<div class="skeleton-card">' +
                    '<div class="skeleton-thumb"></div>' +
                    '<div class="skeleton-body">' +
                        '<div class="skeleton-line short" style="margin-bottom:14px"></div>' +
                        '<div class="skeleton-line medium" style="margin-bottom:10px"></div>' +
                        '<div class="skeleton-line full"></div>' +
                    '</div>' +
                '</div>';
        }
        return html;
    }

    /* ── Banner cards (projects 1–8) ─────────────────────── */

    /* Chart SVG inner-HTML per project — sourced from Project Banners/*.html */
    var BANNER_CHARTS = {
        1: '<line x1="8" y1="134" x2="552" y2="134" stroke="var(--rule)" stroke-width="1.5"></line>' +
           '<path class="trend-line" d="M10,126 L70,110 L130,120 L190,98 L250,106 L310,78 L370,88 L430,50 L490,34 L540,22"/>' +
           '<circle class="vertex" cx="70" cy="110" r="2.2"></circle>' +
           '<circle class="vertex" cx="130" cy="120" r="2.2"></circle>' +
           '<circle class="vertex" cx="250" cy="106" r="2.2"></circle>' +
           '<circle class="vertex" cx="310" cy="78" r="2.2"></circle>' +
           '<circle class="vertex" cx="370" cy="88" r="2.2"></circle>' +
           '<circle class="vertex" cx="490" cy="34" r="2.2"></circle>' +
           '<g class="callout">' +
             '<line class="leader" x1="430" y1="50" x2="430" y2="24"></line>' +
             '<rect class="callout-flag" x="426" y="17" width="7" height="7" transform="rotate(45 429.5 20.5)"></rect>' +
             '<circle class="callout-dot" cx="430" cy="50" r="5"></circle>' +
             '<text class="callout-label" x="430" y="16">17M+ SIGNALS</text>' +
           '</g>' +
           '<circle class="live-ring" cx="540" cy="22" r="8"></circle>' +
           '<circle class="live-dot" cx="540" cy="22" r="4"></circle>',

        2: '<rect class="cell" x="108" y="28" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.17" style="animation-delay:0.00s"></rect>' +
           '<rect class="cell" x="158" y="28" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.19" style="animation-delay:0.02s"></rect>' +
           '<rect class="cell" x="208" y="28" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.17" style="animation-delay:0.04s"></rect>' +
           '<rect class="cell" x="258" y="28" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.22" style="animation-delay:0.06s"></rect>' +
           '<rect class="cell" x="308" y="28" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.19" style="animation-delay:0.08s"></rect>' +
           '<rect class="cell" x="358" y="28" width="44" height="20" rx="4" fill="var(--ochre)" fill-opacity="0.57" style="animation-delay:0.10s"></rect>' +
           '<rect class="cell" x="408" y="28" width="44" height="20" rx="4" fill="var(--ochre)" fill-opacity="0.52" style="animation-delay:0.12s"></rect>' +
           '<rect class="cell" x="108" y="54" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.28" style="animation-delay:0.14s"></rect>' +
           '<rect class="cell" x="158" y="54" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.3" style="animation-delay:0.16s"></rect>' +
           '<rect class="cell" x="208" y="54" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.28" style="animation-delay:0.18s"></rect>' +
           '<rect class="cell" x="258" y="54" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.33" style="animation-delay:0.20s"></rect>' +
           '<rect class="cell" x="308" y="54" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.3" style="animation-delay:0.22s"></rect>' +
           '<rect class="cell" x="358" y="54" width="44" height="20" rx="4" fill="var(--ochre)" fill-opacity="0.76" style="animation-delay:0.24s"></rect>' +
           '<rect class="cell" x="408" y="54" width="44" height="20" rx="4" fill="var(--ochre)" fill-opacity="0.81" style="animation-delay:0.26s"></rect>' +
           '<rect class="cell" x="108" y="80" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.22" style="animation-delay:0.28s"></rect>' +
           '<rect class="cell" x="158" y="80" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.25" style="animation-delay:0.30s"></rect>' +
           '<rect class="cell" x="208" y="80" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.22" style="animation-delay:0.32s"></rect>' +
           '<rect class="cell" x="258" y="80" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.28" style="animation-delay:0.34s"></rect>' +
           '<rect class="cell" x="308" y="80" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.28" style="animation-delay:0.36s"></rect>' +
           '<rect class="cell" x="358" y="80" width="44" height="20" rx="4" fill="var(--ochre)" fill-opacity="0.66" style="animation-delay:0.38s"></rect>' +
           '<rect class="cell" x="408" y="80" width="44" height="20" rx="4" fill="var(--ochre)" fill-opacity="0.71" style="animation-delay:0.40s"></rect>' +
           '<rect class="cell" x="108" y="106" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.14" style="animation-delay:0.42s"></rect>' +
           '<rect class="cell" x="158" y="106" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.17" style="animation-delay:0.44s"></rect>' +
           '<rect class="cell" x="208" y="106" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.17" style="animation-delay:0.46s"></rect>' +
           '<rect class="cell" x="258" y="106" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.19" style="animation-delay:0.48s"></rect>' +
           '<rect class="cell" x="308" y="106" width="44" height="20" rx="4" fill="var(--ink)" fill-opacity="0.22" style="animation-delay:0.50s"></rect>' +
           '<rect class="cell" x="358" y="106" width="44" height="20" rx="4" fill="var(--ochre)" fill-opacity="0.52" style="animation-delay:0.52s"></rect>' +
           '<rect class="cell" x="408" y="106" width="44" height="20" rx="4" fill="var(--ochre)" fill-opacity="0.57" style="animation-delay:0.54s"></rect>' +
           '<text class="micro-label" x="130.0" y="140" text-anchor="middle" fill="var(--ink-soft)">M</text>' +
           '<text class="micro-label" x="180.0" y="140" text-anchor="middle" fill="var(--ink-soft)">T</text>' +
           '<text class="micro-label" x="230.0" y="140" text-anchor="middle" fill="var(--ink-soft)">W</text>' +
           '<text class="micro-label" x="280.0" y="140" text-anchor="middle" fill="var(--ink-soft)">T</text>' +
           '<text class="micro-label" x="330.0" y="140" text-anchor="middle" fill="var(--ink-soft)">F</text>' +
           '<text class="micro-label" x="380.0" y="140" text-anchor="middle" fill="var(--ochre)">S</text>' +
           '<text class="micro-label" x="430.0" y="140" text-anchor="middle" fill="var(--ochre)">S</text>' +
           '<circle class="live-ring" cx="430.0" cy="64.0" r="9"></circle>' +
           '<circle class="live-dot" cx="430.0" cy="64.0" r="3.6"></circle>' +
           '<text class="callout-label" x="280" y="16">29% WEEKEND SPIKE</text>',

        3: '<circle class="cell" cx="44" cy="34" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.00s"></circle>' +
           '<circle class="cell" cx="86" cy="34" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.01s"></circle>' +
           '<circle class="cell" cx="128" cy="34" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.02s"></circle>' +
           '<circle class="cell" cx="170" cy="34" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.04s"></circle>' +
           '<circle class="cell" cx="212" cy="34" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.05s"></circle>' +
           '<circle class="cell" cx="254" cy="34" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.06s"></circle>' +
           '<circle class="cell" cx="296" cy="34" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.07s"></circle>' +
           '<circle class="cell" cx="338" cy="34" r="3.4" fill="var(--teal)" fill-opacity="0.9" style="animation-delay:0.08s"></circle>' +
           '<circle class="cell" cx="380" cy="34" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.10s"></circle>' +
           '<circle class="cell" cx="422" cy="34" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.11s"></circle>' +
           '<circle class="cell" cx="464" cy="34" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.12s"></circle>' +
           '<circle class="cell" cx="506" cy="34" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.13s"></circle>' +
           '<circle class="cell" cx="44" cy="55" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.14s"></circle>' +
           '<circle class="cell" cx="86" cy="55" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.16s"></circle>' +
           '<circle class="cell" cx="128" cy="55" r="3.4" fill="var(--teal)" fill-opacity="0.9" style="animation-delay:0.17s"></circle>' +
           '<circle class="cell" cx="170" cy="55" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.18s"></circle>' +
           '<circle class="cell" cx="212" cy="55" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.19s"></circle>' +
           '<circle class="cell" cx="254" cy="55" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.20s"></circle>' +
           '<circle class="cell" cx="296" cy="55" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.22s"></circle>' +
           '<circle class="cell" cx="338" cy="55" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.23s"></circle>' +
           '<circle class="cell" cx="380" cy="55" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.24s"></circle>' +
           '<circle class="cell" cx="422" cy="55" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.25s"></circle>' +
           '<circle class="cell" cx="464" cy="55" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.26s"></circle>' +
           '<circle class="cell" cx="506" cy="55" r="3.4" fill="var(--teal)" fill-opacity="0.9" style="animation-delay:0.28s"></circle>' +
           '<circle class="cell" cx="44" cy="76" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.29s"></circle>' +
           '<circle class="cell" cx="86" cy="76" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.30s"></circle>' +
           '<circle class="cell" cx="128" cy="76" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.31s"></circle>' +
           '<circle class="cell" cx="170" cy="76" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.32s"></circle>' +
           '<circle class="cell" cx="212" cy="76" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.34s"></circle>' +
           '<circle class="cell" cx="254" cy="76" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.35s"></circle>' +
           '<circle class="cell" cx="296" cy="76" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.36s"></circle>' +
           '<circle class="cell" cx="338" cy="76" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.37s"></circle>' +
           '<circle class="cell" cx="380" cy="76" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.38s"></circle>' +
           '<circle class="cell" cx="422" cy="76" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.40s"></circle>' +
           '<circle class="cell" cx="464" cy="76" r="3.4" fill="var(--teal)" fill-opacity="0.9" style="animation-delay:0.41s"></circle>' +
           '<circle class="cell" cx="506" cy="76" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.42s"></circle>' +
           '<circle class="cell" cx="44" cy="97" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.43s"></circle>' +
           '<circle class="cell" cx="86" cy="97" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.44s"></circle>' +
           '<circle class="cell" cx="128" cy="97" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.46s"></circle>' +
           '<circle class="cell" cx="170" cy="97" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.47s"></circle>' +
           '<circle class="cell" cx="212" cy="97" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.48s"></circle>' +
           '<circle class="cell" cx="254" cy="97" r="3.4" fill="var(--teal)" fill-opacity="0.9" style="animation-delay:0.49s"></circle>' +
           '<circle class="cell" cx="296" cy="97" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.50s"></circle>' +
           '<circle class="cell" cx="338" cy="97" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.52s"></circle>' +
           '<circle class="cell" cx="380" cy="97" r="3.4" fill="var(--ochre)" fill-opacity="0.9" style="animation-delay:0.53s"></circle>' +
           '<circle class="cell" cx="422" cy="97" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.54s"></circle>' +
           '<circle class="cell" cx="464" cy="97" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.55s"></circle>' +
           '<circle class="cell" cx="506" cy="97" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.56s"></circle>' +
           '<circle class="cell" cx="44" cy="118" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.58s"></circle>' +
           '<circle class="cell" cx="86" cy="118" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.59s"></circle>' +
           '<circle class="cell" cx="128" cy="118" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.60s"></circle>' +
           '<circle class="cell" cx="170" cy="118" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.61s"></circle>' +
           '<circle class="cell" cx="212" cy="118" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.62s"></circle>' +
           '<circle class="cell" cx="254" cy="118" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.64s"></circle>' +
           '<circle class="cell" cx="296" cy="118" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.65s"></circle>' +
           '<circle class="cell" cx="338" cy="118" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.66s"></circle>' +
           '<circle class="cell" cx="380" cy="118" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.67s"></circle>' +
           '<circle class="cell" cx="422" cy="118" r="3.4" fill="var(--teal)" fill-opacity="0.9" style="animation-delay:0.68s"></circle>' +
           '<circle class="cell" cx="464" cy="118" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.70s"></circle>' +
           '<circle class="cell" cx="506" cy="118" r="3.0" fill="var(--ink)" fill-opacity="0.55" style="animation-delay:0.71s"></circle>' +
           '<text class="callout-label" x="280" y="16">+33% DATA QUALITY</text>' +
           '<line class="leader" x1="506" y1="24" x2="506" y2="24"></line>' +
           '<circle class="live-ring" cx="506" cy="76" r="8"></circle>' +
           '<circle class="live-dot" cx="506" cy="76" r="3.6"></circle>' +
           '<text class="micro-label" x="44" y="132" fill="var(--ink-soft)">PRESENT</text>' +
           '<circle cx="36" cy="129" r="3" fill="var(--teal)"></circle>' +
           '<text class="micro-label" x="102" y="132" fill="var(--ink-soft)">WFH</text>' +
           '<circle cx="168" cy="129" r="3" fill="var(--ochre)"></circle>' +
           '<text class="micro-label" x="178" y="132" fill="var(--ink-soft)">LEAVE</text>',

        4: '<circle class="donut-track" cx="150" cy="78" r="50"></circle>' +
           '<circle class="donut-seg" cx="150" cy="78" r="50" stroke="var(--ink)" stroke-dasharray="197.9 116.2" stroke-dashoffset="0.0" transform="rotate(-90 150 78)" style="animation-delay:0.00s"></circle>' +
           '<circle class="donut-seg" cx="150" cy="78" r="50" stroke="var(--ochre)" stroke-dasharray="66.0 248.2" stroke-dashoffset="-197.9" transform="rotate(-90 150 78)" style="animation-delay:0.25s"></circle>' +
           '<circle class="donut-seg" cx="150" cy="78" r="50" stroke="var(--teal)" stroke-dasharray="50.3 263.9" stroke-dashoffset="-263.9" transform="rotate(-90 150 78)" style="animation-delay:0.50s"></circle>' +
           '<text class="micro-label" x="150" y="82" text-anchor="middle" fill="var(--ink-soft)">SALES MIX</text>' +
           '<circle class="live-ring" cx="167.1" cy="31.0" r="7"></circle>' +
           '<circle class="live-dot" cx="167.1" cy="31.0" r="3.4"></circle>' +
           '<text class="callout-label" x="400" y="120">$438K+ IN SALES</text>',

        5: '<text class="micro-label" x="10" y="33" fill="var(--ink-soft)">AUSTIN</text>' +
           '<rect class="bar-track" x="96" y="20" width="410" height="14" rx="4"></rect>' +
           '<rect class="bar-fill accent" x="96" y="20" width="380" height="14" rx="4" style="animation-delay:0.00s"></rect>' +
           '<text class="micro-label" x="10" y="60" fill="var(--ink-soft)">JANESVILLE</text>' +
           '<rect class="bar-track" x="96" y="47" width="410" height="14" rx="4"></rect>' +
           '<rect class="bar-fill " x="96" y="47" width="300" height="14" rx="4" style="animation-delay:0.10s"></rect>' +
           '<text class="micro-label" x="10" y="87" fill="var(--ink-soft)">SCOTTSDALE</text>' +
           '<rect class="bar-track" x="96" y="74" width="410" height="14" rx="4"></rect>' +
           '<rect class="bar-fill " x="96" y="74" width="250" height="14" rx="4" style="animation-delay:0.20s"></rect>' +
           '<text class="micro-label" x="10" y="114" fill="var(--ink-soft)">AURORA</text>' +
           '<rect class="bar-track" x="96" y="101" width="410" height="14" rx="4"></rect>' +
           '<rect class="bar-fill " x="96" y="101" width="200" height="14" rx="4" style="animation-delay:0.30s"></rect>' +
           '<g class="callout">' +
             '<line class="leader" x1="476" y1="17" x2="476" y2="4"></line>' +
             '<text class="callout-label" x="436" y="0">$371M+ SALES BOOK</text>' +
           '</g>' +
           '<circle class="live-ring" cx="476" cy="27" r="8"></circle>' +
           '<circle class="live-dot" cx="476" cy="27" r="3.6"></circle>',

        6: '<line x1="10" y1="128" x2="550" y2="128" stroke="var(--rule)" stroke-width="1.5"></line>' +
           '<rect class="col-fill " x="34" y="92" width="34" height="36" rx="3" style="animation-delay:0.00s;transform-origin:51.0px 128px"></rect>' +
           '<text class="micro-label" x="51.0" y="142" text-anchor="middle" fill="var(--ink-soft)">\'08</text>' +
           '<rect class="col-fill " x="102" y="78" width="34" height="50" rx="3" style="animation-delay:0.06s;transform-origin:119.0px 128px"></rect>' +
           '<text class="micro-label" x="119.0" y="142" text-anchor="middle" fill="var(--ink-soft)">\'10</text>' +
           '<rect class="col-fill " x="170" y="100" width="34" height="28" rx="3" style="animation-delay:0.12s;transform-origin:187.0px 128px"></rect>' +
           '<text class="micro-label" x="187.0" y="142" text-anchor="middle" fill="var(--ink-soft)">\'12</text>' +
           '<rect class="col-fill " x="238" y="58" width="34" height="70" rx="3" style="animation-delay:0.18s;transform-origin:255.0px 128px"></rect>' +
           '<text class="micro-label" x="255.0" y="142" text-anchor="middle" fill="var(--ink-soft)">\'14</text>' +
           '<rect class="col-fill " x="306" y="82" width="34" height="46" rx="3" style="animation-delay:0.24s;transform-origin:323.0px 128px"></rect>' +
           '<text class="micro-label" x="323.0" y="142" text-anchor="middle" fill="var(--ink-soft)">\'16</text>' +
           '<rect class="col-fill accent" x="374" y="36" width="34" height="92" rx="3" style="animation-delay:0.30s;transform-origin:391.0px 128px"></rect>' +
           '<text class="micro-label" x="391.0" y="142" text-anchor="middle" fill="var(--ink-soft)">\'18</text>' +
           '<rect class="col-fill " x="442" y="64" width="34" height="64" rx="3" style="animation-delay:0.36s;transform-origin:459.0px 128px"></rect>' +
           '<text class="micro-label" x="459.0" y="142" text-anchor="middle" fill="var(--ink-soft)">\'20</text>' +
           '<rect class="col-fill " x="510" y="74" width="34" height="54" rx="3" style="animation-delay:0.42s;transform-origin:527.0px 128px"></rect>' +
           '<text class="micro-label" x="527.0" y="142" text-anchor="middle" fill="var(--ink-soft)">\'22</text>' +
           '<g class="callout">' +
             '<line class="leader" x1="391.0" y1="36" x2="391.0" y2="14"></line>' +
             '<text class="callout-label" x="391.0" y="10">2008&#8211;2022</text>' +
           '</g>' +
           '<circle class="live-ring" cx="391.0" cy="36" r="8"></circle>' +
           '<circle class="live-dot" cx="391.0" cy="36" r="3.6"></circle>',

        7: '<text class="callout-label" x="280" y="16">3 TEAMS, 1 VIEW</text>' +
           '<path class="gauge-track" d="M 70,92 A 30,30 0 0 1 130,92"></path>' +
           '<path class="gauge-fill" d="M 70,92 A 30,30 0 0 1 130,92" stroke="var(--ink)" style="--start:94.2; --target:82.9; stroke-dasharray:94.2; animation-delay:0.00s"></path>' +
           '<text class="gauge-pct" x="100" y="112">12%</text>' +
           '<text class="gauge-cap" x="100" y="124">ATTRITION</text>' +
           '<path class="gauge-track" d="M 250,92 A 30,30 0 0 1 310,92"></path>' +
           '<path class="gauge-fill" d="M 250,92 A 30,30 0 0 1 310,92" stroke="var(--ink)" style="--start:94.2; --target:77.3; stroke-dasharray:94.2; animation-delay:0.15s"></path>' +
           '<text class="gauge-pct" x="280" y="112">18%</text>' +
           '<text class="gauge-cap" x="280" y="124">SHRINKAGE</text>' +
           '<path class="gauge-track" d="M 430,92 A 30,30 0 0 1 490,92"></path>' +
           '<path class="gauge-fill" d="M 430,92 A 30,30 0 0 1 490,92" stroke="var(--ochre)" style="--start:94.2; --target:5.7; stroke-dasharray:94.2; animation-delay:0.30s"></path>' +
           '<text class="gauge-pct" x="460" y="112">94%</text>' +
           '<text class="gauge-cap" x="460" y="124">STAFFING</text>' +
           '<circle class="live-ring" cx="489.5" cy="97.6" r="7"></circle>' +
           '<circle class="live-dot" cx="489.5" cy="97.6" r="3.2"></circle>',

        8: '<line x1="8" y1="124" x2="552" y2="124" stroke="var(--rule)" stroke-width="1.5"></line>' +
           '<polygon class="forecast-band" points="340,78 410,50 480,30 550,15 550,64 480,72 410,78 340,78"></polygon>' +
           '<path class="trend-line" d="M10,110 L80,100 L150,108 L220,90 L290,96 L340,78"></path>' +
           '<path class="forecast-dash" d="M340,78 L410,64 L480,51 L550,40"></path>' +
           '<line class="today-line" x1="340" y1="16" x2="340" y2="134"></line>' +
           '<text class="micro-label" x="340" y="146" text-anchor="middle" fill="var(--ink-soft)">TODAY</text>' +
           '<g class="callout">' +
             '<line class="leader" x1="340" y1="78" x2="300" y2="56"></line>' +
             '<rect class="callout-flag" x="296" y="49" width="7" height="7" transform="rotate(45 299.5 52.5)"></rect>' +
             '<text class="callout-label" x="220" y="42">93%+ ACCURACY</text>' +
           '</g>' +
           '<circle class="live-ring" cx="550" cy="40" r="8"></circle>' +
           '<circle class="live-dot" cx="550" cy="40" r="3.6"></circle>',

        9: '<line class="funnel-edge" x1="40" y1="36" x2="100" y2="52"></line>' +
           '<line class="funnel-edge" x1="520" y1="36" x2="460" y2="52"></line>' +
           '<line class="funnel-edge" x1="100" y1="72" x2="160" y2="88"></line>' +
           '<line class="funnel-edge" x1="460" y1="72" x2="400" y2="88"></line>' +
           '<line class="funnel-edge" x1="160" y1="108" x2="215" y2="124"></line>' +
           '<line class="funnel-edge" x1="400" y1="108" x2="345" y2="124"></line>' +
           '<text class="micro-label" x="280" y="10" text-anchor="middle">4 PLATFORMS SCANNED</text>' +
           '<rect class="stage-fill" x="40" y="16" width="480" height="20" rx="5" style="animation-delay:0.00s"></rect>' +
           '<text class="micro-label" x="280" y="46" text-anchor="middle">FILTERED TO FIT</text>' +
           '<rect class="stage-fill" x="100" y="52" width="360" height="20" rx="5" style="animation-delay:0.12s"></rect>' +
           '<text class="micro-label" x="280" y="82" text-anchor="middle">PUSHED TO SHEET</text>' +
           '<rect class="stage-fill" x="160" y="88" width="240" height="20" rx="5" style="animation-delay:0.24s"></rect>' +
           '<text class="micro-label" x="280" y="118" text-anchor="middle">AUTO-APPLIED</text>' +
           '<rect class="stage-fill accent" x="215" y="124" width="130" height="20" rx="5" style="animation-delay:0.36s"></rect>' +
           '<circle class="live-ring" cx="345" cy="134" r="8"></circle>' +
           '<circle class="live-dot" cx="345" cy="134" r="3.6"></circle>'
    };

    /* Stamp text per project — matched to banner HTML files */
    var BANNER_STAMPS = {
        1: 'Case file \u2014 Product Research',
        2: 'Case file \u2014 Retail Analytics',
        3: 'Case file \u2014 People Analytics',
        4: 'Case file \u2014 Commerce Analytics',
        5: 'Case file \u2014 Sales Analytics',
        6: 'Personal project \u2014 Sports Analytics',
        7: 'Case file \u2014 Workforce Analytics',
        8: 'Case file \u2014 Forecasting \u0026 Automation',
        9: 'Case file \u2014 Product Engineering'
    };

    function buildBannerCard(project) {
        var a = document.createElement('a');
        a.href = detailURL(project.slug);
        a.className = 'proj-banner';
        var bannerTitle = project.banner_title || project.project_title;
        a.setAttribute('aria-label', 'View case study: ' + esc(bannerTitle));

        var tagsList = project.banner_tags || project.techStackUsed || [];
        var tagsLi = tagsList
            .map(function (t) { return '<li>' + esc(t) + '</li>'; })
            .join('');

        var chart = BANNER_CHARTS[project.id] || '';
        var stamp = BANNER_STAMPS[project.id] || ('Case file \u2014 ' + project.id);

        a.innerHTML =
            '<div class="grid-bg" aria-hidden="true"></div>' +
            '<div class="content">' +
                '<span class="stamp">' + esc(stamp) + '</span>' +
                '<h2 class="title">' + esc(bannerTitle) + '</h2>' +
                '<p class="desc">' + esc(project.tagline || project.project_description || '') + '</p>' +
                '<ul class="tags">' + tagsLi + '</ul>' +
                (chart ? '<div class="chart-wrap"><svg viewBox="0 0 560 150" aria-hidden="true">' + chart + '</svg></div>' : '') +
                '<span class="cta">View case study ' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' +
                '</span>' +
            '</div>';

        return a;
    }

    function buildProjectCard(project, index) {
        var wrapper = document.createElement('a');
        wrapper.href = detailURL(project.slug);
        wrapper.className = 'project-card';
        wrapper.setAttribute('data-aos', 'zoom-in');
        wrapper.setAttribute('data-aos-delay', String(index * 80));
        wrapper.setAttribute('aria-label', 'View ' + esc(project.project_title) + ' project');

        var thumbSrc = (project.thumbnail && project.pagename)
            ? imgPath(project.pagename, project.thumbnail)
            : '';

        var tagsHTML = (project.techStackUsed || [])
            .slice(0, 5)
            .map(function (t) { return techTagHTML(t); })
            .join('');

        var thumbHTML = thumbSrc
            ? '<img src="' + esc(thumbSrc) + '" alt="' + esc(project.project_title) + ' screenshot" loading="lazy">'
            : '<div style="width:100%;height:100%;background:#222;display:flex;align-items:center;justify-content:center;color:#555;font-size:13px;">No image</div>';

        wrapper.innerHTML =
            '<div class="card-inner">' +
                '<div class="card-thumb">' + thumbHTML + '</div>' +
                '<div class="card-body">' +
                    '<span class="card-category">Project</span>' +
                    '<h3 class="card-title">' + esc(project.project_title) + '</h3>' +
                    '<p class="card-tagline">' + esc(project.tagline || '') + '</p>' +
                    '<div class="tech-tags">' + tagsHTML + '</div>' +
                    '<div class="card-arrow"><span>View Case Study ' + ARROW_RIGHT_SVG + '</span></div>' +
                '</div>' +
            '</div>';

        return wrapper;
    }

    /* ══════════════════════════════════════════════════
       MODE B — PROJECT DETAIL PAGE
    ══════════════════════════════════════════════════ */

    function initDetailPage() {
        var params = new URLSearchParams(window.location.search);
        var slug = params.get('slug');

        if (!slug) {
            window.location.href = './works.html';
            return;
        }

        getProjects()
            .then(function (projects) {
                var project = null;
                for (var i = 0; i < projects.length; i++) {
                    if (projects[i].slug === slug) { project = projects[i]; break; }
                }
                if (!project) {
                    window.location.href = './works.html';
                    return;
                }
                populateDetailPage(project);
            })
            .catch(function (err) {
                console.warn('projects.js detail error:', err);
                // Show a non-destructive banner without destroying the template
                var hero = document.querySelector('.detail-hero');
                if (hero) {
                    var banner = document.createElement('div');
                    banner.style.cssText = 'background:rgba(255,80,80,0.08);border:1px solid rgba(255,80,80,0.2);border-radius:12px;padding:16px 22px;margin-bottom:24px;font-size:14px;color:rgba(255,255,255,0.6);';
                    banner.innerHTML = 'Could not load project data. <a href="./works.html" style="color:#5B78F6">\u2190 Back to Works</a>';
                    hero.parentNode.insertBefore(banner, hero);
                }
            });
    }

    function populateDetailPage(project) {
        // ── Back button ──────────────────────────────
        var backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.href = './works.html';
            backBtn.innerHTML = BACK_SVG + ' Back to Works';
        }

        // ── Browser tab title ─────────────────────────
        document.title = project.project_title + ' \u2014 Neel Chaniyara';

        // ── Hero ──────────────────────────────────────
        var heroTitle   = document.getElementById('detail-title');
        var heroTagline = document.getElementById('detail-tagline');
        var heroTags    = document.getElementById('detail-hero-tags');

        if (heroTitle)   heroTitle.textContent   = project.project_title;
        if (heroTagline) heroTagline.textContent = project.tagline || '';
        if (heroTags) {
            heroTags.innerHTML = (project.techStackUsed || [])
                .map(function (t) { return techTagHTML(t); })
                .join('');
        }

        // ── Embed: iframe, Tableau JS, or fallback image ──────────────
        var embedWrap = document.getElementById('detail-embed-wrap');
        if (embedWrap) {
            if (project.tableauVizName) {
                // Tableau Public JS API embed
                var vizId = 'tableauViz_' + project.id;
                embedWrap.innerHTML =
                    '<div class="embed-tableau-wrap">' +
                        '<div class="tableauPlaceholder" id="' + vizId + '" style="position:relative;">' +
                            '<object class="tableauViz" style="display:none;">' +
                                '<param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />' +
                                '<param name="embed_code_version" value="3" />' +
                                '<param name="site_root" value="" />' +
                                '<param name="name" value="' + esc(project.tableauVizName) + '" />' +
                                '<param name="tabs" value="no" />' +
                                '<param name="toolbar" value="yes" />' +
                                '<param name="animate_transition" value="yes" />' +
                                '<param name="display_static_image" value="yes" />' +
                                '<param name="display_spinner" value="yes" />' +
                                '<param name="display_overlay" value="yes" />' +
                                '<param name="display_count" value="yes" />' +
                                '<param name="language" value="en-US" />' +
                            '</object>' +
                        '</div>' +
                    '</div>';
                embedWrap.style.display = 'block';
                // Init Tableau viz using their JS API (mirrors their own embed script)
                (function() {
                    var divEl = document.getElementById(vizId);
                    var vizEl = divEl.getElementsByTagName('object')[0];
                    var w = divEl.offsetWidth;
                    if (w > 800) {
                        vizEl.style.width = '1600px'; vizEl.style.height = '927px';
                    } else if (w > 500) {
                        vizEl.style.width = '1600px'; vizEl.style.height = '927px';
                    } else {
                        vizEl.style.width = '100%'; vizEl.style.height = '2927px';
                    }
                    var scriptEl = document.createElement('script');
                    scriptEl.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
                    vizEl.parentNode.insertBefore(scriptEl, vizEl);
                })();
            } else if (project.embed) {
                var heightStyle = project.embedHeight
                    ? ' style="height:' + project.embedHeight + 'px"'
                    : '';
                // Power BI / YouTube / any iframe embed
                embedWrap.innerHTML =
                    '<div class="embed-responsive-wrap"' + heightStyle + '>' +
                        '<iframe src="' + esc(project.embed) + '" ' +
                            'title="' + esc(project.project_title) + '" ' +
                            'frameborder="0" ' +
                            'allowfullscreen="true" ' +
                            'loading="lazy">' +
                        '</iframe>' +
                    '</div>';
                embedWrap.style.display = 'block';
            } else if (project.thumbnail && project.pagename) {
                // Fallback: plain image
                embedWrap.innerHTML =
                    '<img src="' + esc(imgPath(project.pagename, project.thumbnail)) + '" ' +
                         'alt="' + esc(project.project_title) + ' screenshot" ' +
                         'class="embed-fallback-img">';
                embedWrap.style.display = 'block';
            }
        }

        // ── Problem ───────────────────────────────────
        var problemEl = document.getElementById('detail-problem');
        if (problemEl) {
            problemEl.innerHTML = project.problem
                ? '<p>' + esc(project.problem).replace(/\n/g, '</p><p>') + '</p>'
                : '<p style="color:rgba(255,255,255,0.35);font-style:italic">Coming soon.</p>';
        }

        // ── Process ───────────────────────────────────
        var processEl = document.getElementById('detail-process');
        if (processEl) {
            var steps = project.process || [];
            if (steps.length === 0) {
                processEl.innerHTML = '<p style="color:rgba(255,255,255,0.35);font-style:italic">Coming soon.</p>';
            } else {
                processEl.innerHTML = steps.map(function (step, i) {
                    return '<div class="process-step">' +
                        '<div class="step-number">' + (i + 1) + '</div>' +
                        '<p class="step-text">' + esc(step) + '</p>' +
                        '</div>';
                }).join('');
                processEl.className = 'process-steps';
            }
        }

        // ── Tech Stack ────────────────────────────────
        var techEl = document.getElementById('detail-tech');
        if (techEl) {
            techEl.innerHTML = (project.techStackUsed || [])
                .map(function (t) { return techTagHTML(t, true); })
                .join('');
            techEl.className = 'detail-tech-tags';
        }

        // ── Result ────────────────────────────────────
        var resultEl = document.getElementById('detail-result');
        if (resultEl) {
            resultEl.innerHTML = project.result
                ? '<p>' + esc(project.result).replace(/\n/g, '</p><p>') + '</p>'
                : '<p style="color:rgba(255,255,255,0.35);font-style:italic">Coming soon.</p>';
        }

        // ── Gallery ───────────────────────────────────
        var gallery = project.gallery || [];
        var gallerySection = document.getElementById('gallery-section');
        if (gallerySection) {
            if (gallery.length === 0) {
                gallerySection.style.display = 'none';
            } else {
                initGallery(gallery, project.pagename);
            }
        }

        if (typeof AOS !== 'undefined') AOS.refreshHard();
    }

    /* ──────────────────────────────────────────────────
       Gallery Carousel
    ────────────────────────────────────────────────── */

    function initGallery(imageFiles, pagename) {
        var track   = document.getElementById('gallery-track');
        var dotsEl  = document.getElementById('gallery-dots');
        var counter = document.getElementById('gallery-counter');
        var btnPrev = document.getElementById('gallery-prev');
        var btnNext = document.getElementById('gallery-next');

        if (!track) return;

        var total   = imageFiles.length;
        var current = 0;

        // Build slides
        track.innerHTML = imageFiles.map(function (file, i) {
            return '<div class="gallery-slide">' +
                '<img src="' + esc(imgPath(pagename, file)) + '" ' +
                     'alt="Project image ' + (i + 1) + '" ' +
                     'loading="' + (i === 0 ? 'eager' : 'lazy') + '">' +
                '</div>';
        }).join('');

        // Build dots
        if (dotsEl) {
            dotsEl.innerHTML = imageFiles.map(function (_, i) {
                return '<button class="gallery-dot' + (i === 0 ? ' active' : '') + '" ' +
                    'aria-label="Go to image ' + (i + 1) + '" data-index="' + i + '"></button>';
            }).join('');

            dotsEl.addEventListener('click', function (e) {
                var dot = e.target.closest('.gallery-dot');
                if (dot) goTo(parseInt(dot.dataset.index, 10));
            });
        }

        function updateUI() {
            track.style.transform = 'translateX(-' + (current * 100) + '%)';

            if (dotsEl) {
                var dots = dotsEl.querySelectorAll('.gallery-dot');
                dots.forEach(function (d, i) {
                    d.classList.toggle('active', i === current);
                });
            }

            if (counter) counter.textContent = (current + 1) + ' / ' + total;
            if (btnPrev)  btnPrev.disabled = (current === 0);
            if (btnNext)  btnNext.disabled = (current === total - 1);
        }

        function goTo(index) {
            current = Math.max(0, Math.min(index, total - 1));
            updateUI();
        }

        function prev() { goTo(current - 1); }
        function next() { goTo(current + 1); }

        if (btnPrev) btnPrev.addEventListener('click', prev);
        if (btnNext) btnNext.addEventListener('click', next);

        // Keyboard navigation
        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft')  prev();
            if (e.key === 'ArrowRight') next();
        });

        // Touch/swipe
        var touchStartX = 0;
        track.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        track.addEventListener('touchend', function (e) {
            var diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) { if (diff > 0) next(); else prev(); }
        }, { passive: true });

        updateUI();
    }

    /* ──────────────────────────────────────────────────
       Init
    ────────────────────────────────────────────────── */
    if (isWorksPage)  initWorksGrid();
    if (isDetailPage) initDetailPage();

})();
