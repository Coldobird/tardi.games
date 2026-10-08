import { assetUrl } from './asset-url.js'

// Selected paper treatments. Decorative layers own the cuts so text and
// interactive controls remain intact, including the overlapping card title.
export var PAPER_UI_STYLES = `
  :root {
    font-size: clamp(12px, calc(6px + 1.2vmin), 24px);
    --paper-corners: polygon(18px 0, 48% 3px, calc(100% - 19px) 0,
      100% 18px, calc(100% - 2px) 53%, 100% calc(100% - 20px),
      calc(100% - 20px) 100%, 48% calc(100% - 3px), 18px 100%,
      0 calc(100% - 19px), 2px 47%, 0 18px);
    --paper-edge: polygon(8px 3px, 36% 0, 72% 4px, calc(100% - 9px) 1px,
      calc(100% - 12px) 12px, 100% 7px, calc(100% - 4px) calc(100% - 4px),
      68% 100%, 31% calc(100% - 3px), 3px 100%, 0 67%, 7px 59%, 0 56%);
    --grid-paper: linear-gradient(#48b9cd26 1px, transparent 1px),
      linear-gradient(90deg, #48b9cd26 1px, transparent 1px),
      linear-gradient(#ffffffa8, #ffffffa8), url("assets/reference-origami-white-paper.jpg");
  }
  body[data-picture-phone-style="origami-stage"] {
    background: #e7eee9;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table {
    position: relative; isolation: isolate;
    margin: 0; border: 0; padding: 24px;
    background-color: #fffef8 !important; background-image: var(--grid-paper) !important;
    background-size: 20px 20px, 20px 20px, cover, cover !important;
    box-shadow: none; clip-path: none;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand::before,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table::before {
    display: none; content: none !important;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand {
    scrollbar-width: none;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand::-webkit-scrollbar { display: none; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand .broken-picture-phone-status-sent {
    position: absolute; right: 26px; bottom: 20px; z-index: 1;
    margin: 0 !important; padding: 0; pointer-events: none;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-ruled-paper-sent .broken-picture-phone-input { padding-bottom: 32px; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand::after,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table::after {
    display: none; content: none;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-header {
    display: grid; grid-template-columns: auto minmax(0, 1fr);
    align-items: start; gap: 12px; width: 100%; padding: 0; margin: 0;
    background: none; border: 0; box-shadow: none; clip-path: none;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-header::after { display: none; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-brand { display: block; align-self: center; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-brand[hidden] { display: none; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-logo {
    display: block; width: min(60vw, 300px); height: auto; object-fit: contain;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand .broken-picture-phone-logo { width: min(48vw, 180px); }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table > .broken-picture-phone-table-logo {
    position: absolute; top: 12px; left: 50%; transform: translateX(-50%);
    width: 180px; height: 60px; z-index: 3;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table[data-phase="starting"] > .broken-picture-phone-table-logo {
    top: 50%; transform: translate(-50%, -50%); width: min(65vw, 380px); height: auto;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table:not(.broken-picture-phone-table-results) { gap: 8px !important; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table-results .broken-picture-phone-panel > .broken-picture-phone-table-logo {
    position: absolute; right: 16px; bottom: 4px; top: auto; left: auto;
    width: 100px; height: 32px; transform: none; z-index: 3; pointer-events: none;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-title[hidden],
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-ready-row[hidden] { display: none; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-eyebrow { display: none; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-title,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table > .broken-picture-phone-title {
    display: block; font-family: "Lilita One", sans-serif;
    color: #fffef8 !important; font-size: clamp(18px, 3.3vmin, 44px) !important;
    font-weight: 400; line-height: 1.2; letter-spacing: .02em;
    -webkit-text-stroke: 3px #172663; paint-order: stroke fill;
    text-shadow: none; filter: drop-shadow(1px 2px 0 white);
    text-align: center;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-timer {
    grid-column: 1; grid-row: 1; justify-self: start; align-self: start;
    font-size: max(12px, 1.24rem);
    box-sizing: border-box; width: 5.2em; min-width: 5.2em;
    text-align: center; white-space: nowrap; font-variant-numeric: tabular-nums;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-ready-row {
    display: flex; align-items: center; justify-content: center; gap: 14px; max-width: 100%;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-ready-row .broken-picture-phone-table-status { width: auto; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table-status:empty { display: none; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-ready-row .broken-picture-phone-table-timer {
    position: relative; inset: auto; grid-area: auto; align-self: center; flex: none;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table > .broken-picture-phone-title {
    font-size: clamp(24px, 5vmin, 48px) !important; padding: 0 !important;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-readiness,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table-status,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-panel-title {
    position: relative; isolation: isolate; margin: 0; border: 0;
    padding: 16px 24px; min-width: 0; max-width: 100%;
    background: transparent !important; color: white !important;
    font-family: "Lilita One", sans-serif; font-size: max(14px, 1.25rem) !important;
    font-weight: 400; line-height: 1.2; text-align: center;
    clip-path: none; box-shadow: none; transform: none;
    filter: drop-shadow(1px 3px 2px #17266338);
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-readiness {
    grid-column: 1 / -1; justify-self: center; width: max-content;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table-status {
    font-size: max(16px, 1.6rem) !important;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-readiness::before,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table-status::before,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-panel-title::before {
    content: ""; display: block; position: absolute; inset: 0; z-index: -2;
    width: auto; height: auto; margin: 0;
    background: #cae7e1; box-shadow: none;
    clip-path: polygon(2% 3%,50% 0,98% 5%,100% 20%,97% 97%,48% 100%,0 93%,1% 60%);
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-readiness::after,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table-status::after,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-panel-title::after {
    content: ""; display: block; position: absolute; inset: 5px; z-index: -1;
    width: auto; height: auto; margin: 0;
    background: linear-gradient(#009eabc9,#008c96c9),url("assets/reference-origami-tissue.jpg");
    background-size: auto, 220px; box-shadow: none; filter: none; transform: none;
    clip-path: polygon(2% 0,96% 2%,94% 27%,98% 7%,100% 13%,97% 100%,0 96%,0 58%,4% 51%,1% 49%);
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-entry-text,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-prompt {
    position: relative; isolation: isolate; padding: 19px 21px !important;
    margin: 0; min-height: 0; border: 0 !important; border-radius: 0;
    background: transparent !important; color: #172663 !important;
    font-size: max(12px, 1.1rem) !important; line-height: 1.3 !important;
    box-shadow: none !important; filter: drop-shadow(1px 2px 2px #17266325);
    clip-path: none; transform: none; text-shadow: none;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-entry-text::before,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-prompt::before,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-ruled-paper::before {
    content: ""; position: absolute; inset: 0; z-index: -2;
    background: #ffbd3e url("assets/reference-origami-tissue.jpg");
    background-blend-mode: multiply; background-size: 240px;
    clip-path: var(--paper-edge); pointer-events: none;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-entry-text::after,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-prompt::after {
    content: ""; position: absolute; inset: 8px 10px; z-index: -1;
    background-color: #fffef8; background-image: var(--grid-paper);
    background-size: 20px 20px, 20px 20px, cover, cover;
    box-shadow: 1px 2px 2px #17266320; pointer-events: none;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt {
    display: flex; flex-direction: column; align-items: stretch;
    position: relative; padding: 12px 0 0; gap: 0; background: none; filter: none;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt::before { display: none; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-label {
    position: absolute; top: 0; left: 16px; z-index: 1;
    align-self: flex-start; padding: 6px 14px; font-size: max(12px, .85rem);
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-prompt {
    align-self: stretch; max-height: none; overflow: visible;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-prompt::before { background-color: #f5326c; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-ruled-paper {
    position: relative; isolation: isolate; flex: none; padding: 10px 12px;
    width: 100%; min-height: 0; filter: drop-shadow(1px 2px 2px #17266325);
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-ruled-paper-sent::before { opacity: .35; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-input {
    display: block; width: 100%; height: 8rem; min-height: 0; max-height: none;
    border: 0 !important; border-radius: 0; padding: 12px 14px;
    background-color: #fffef8 !important;
    background-image: repeating-linear-gradient(transparent 0 27px, #48b9cd45 27px 28px),
      linear-gradient(#ffffffa8,#ffffffa8),url("assets/reference-origami-white-paper.jpg") !important;
    background-size: auto,cover,cover !important;
    background-position: 0 9px,center,center !important;
    color: #172663 !important; font-size: max(16px, 1.15rem); line-height: 28px;
    clip-path: none; transform: none; box-shadow: 1px 2px 2px #17266320 !important;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-input:focus,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-input:focus-visible { outline: none; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-panel,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-result-timeline {
    position: relative; isolation: isolate; border: 0 !important; border-radius: 0 !important;
    padding: 2.25rem 16px 16px !important; margin-top: 1.8rem;
    background: transparent !important; box-shadow: none; overflow: visible !important;
    filter: drop-shadow(2px 4px 3px #17266338); clip-path: none;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-panel::before,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-result-timeline::before {
    content: ""; position: absolute; inset: 0; z-index: -2;
    background: #f5326c url("assets/reference-origami-tissue.jpg");
    background-blend-mode: multiply; background-size: 350px; clip-path: var(--paper-corners);
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-panel::after,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-result-timeline::after {
    content: ""; position: absolute; inset: 8px; z-index: -1;
    background: #fffef8 url("assets/reference-origami-white-paper.jpg");
    background-size: cover; clip-path: var(--paper-corners);
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-panel-title {
    position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%);
    width: max-content; max-width: calc(100% - 32px); margin: 0 !important;
    z-index: 2; font-size: max(14px, 1.35rem) !important;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-guess-title {
    position: relative; top: auto; left: auto; transform: none;
    align-self: center; max-width: 100%; font-size: max(14px, 1.15rem) !important;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table-results {
    grid-template-rows: minmax(0, 1fr) !important; padding: 36px 5% 12px !important;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table-results .broken-picture-phone-panel {
    width: min(94%, 980px) !important; max-width: 980px; margin-top: 0;
    height: 100%; max-height: none !important; padding-bottom: 32px !important;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-entries {
    position: relative; padding: 0; min-width: 0; grid-template-columns: minmax(0, 1fr); align-content: start; overflow-x: hidden !important; overflow-y: auto !important; overflow-anchor: none; pointer-events: auto !important;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-entries,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-result-entries {
    scrollbar-width: none; scrollbar-gutter: auto;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-entries::-webkit-scrollbar,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-result-entries::-webkit-scrollbar { display: none; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-status:empty { display: none; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-entry-label {
    font-size: max(12px, .78rem) !important; line-height: 1.2;
    flex: none; min-height: 1.2em; overflow-wrap: anywhere;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table .broken-picture-phone-entry-text {
    min-height: 48px; padding: 13px 21px !important; flex: none; font-size: max(16px, 1.1rem) !important;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table .broken-picture-phone-entry { min-height: 68px; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table .broken-picture-phone-entry:first-child { min-height: 48px; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table .broken-picture-phone-entry[data-entry-type="drawing"] { min-height: calc(clamp(120px, 32vh, 220px) + 28px); }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-status,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-result-status,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-result-position {
    font-size: max(12px, .9rem); line-height: 1.3;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-paper {
    display: flex; align-items: center; justify-content: center; flex: 1 1 auto;
    align-self: center; min-height: 0; height: 100%; width: auto; max-width: 100%;
    aspect-ratio: 1 / 1; padding: 5px; background: #172663;
    clip-path: var(--paper-corners);
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-paper > img {
    display: block; width: 100% !important; height: 100% !important;
    max-height: 100% !important; min-height: 0; border: 0 !important; border-radius: 0 !important;
    background: #fffef8; object-fit: contain; clip-path: var(--paper-corners); box-shadow: none !important;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-result-entry .broken-picture-phone-drawing-paper {
    flex: none; width: min(100%, 320px); height: auto;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table .broken-picture-phone-drawing-paper {
    flex: none; width: min(100%, clamp(120px, 32vh, 220px)); height: auto;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-phase="guessing"] > .broken-picture-phone-drawing-paper {
    flex: 1 1 100px; width: auto; max-height: 32vh;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-panel {
    position: relative; isolation: isolate; border: 0; border-radius: 0;
    background: transparent !important; clip-path: none; box-shadow: none;
    filter: drop-shadow(2px 3px 2px #17266338);
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand:not([data-viewport-layout="short"]) .broken-picture-phone-drawing-surface {
    grid-template-rows: max-content max-content; align-content: start; gap: 14px;
    /* Together with the hand's 10px gap, leave 2 × the tools gap above the canvas. */
    margin-top: 18px;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-layout="short"] .broken-picture-phone-drawing-surface { gap: 4px; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-panel::before {
    content: ""; position: absolute; inset: 0; z-index: -1;
    background: linear-gradient(#1fc7b1cf,#1fc7b1cf),url("assets/reference-origami-white-paper.jpg");
    background-size: cover; clip-path: var(--paper-corners);
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-canvas-wrap {
    display: flex; align-items: center; justify-content: center;
    background: #172663; clip-path: var(--paper-corners);
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-canvas-wrap .broken-picture-phone-canvas {
    width: calc(100% - 12px); height: calc(100% - 12px); clip-path: var(--paper-corners);
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-canvas-wrap .broken-picture-phone-canvas-texture { inset: 6px; clip-path: var(--paper-corners); }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-button {
    flex: 0 0 auto; width: auto !important; max-width: 100%; min-width: 0;
    align-self: flex-end; justify-self: end; padding: 10px 22px;
    background-color: #0095a4;
    background-image: url("assets/action-doodles.svg"),linear-gradient(#0095a4cc,#008796cc),url("assets/reference-origami-white-paper.jpg");
    background-size: 170px 100px,auto,cover; background-position: center;
    color: #fff; text-shadow: 0 1px 1px #006674; font-size: max(14px, 1.2rem);
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-controls,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-result-navigation {
    display: flex; flex-wrap: wrap; justify-content: flex-end; align-items: center; gap: 10px;
    width: 100%;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-result { gap: 14px; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-result-timeline { margin-top: 2rem; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand.broken-picture-phone-hand-results {
    padding: 0 !important; scrollbar-gutter: auto; overflow: hidden !important;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand-results .broken-picture-phone-result { height: 100%; min-height: 0; padding-bottom: 12px; gap: 8px; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-timeline-carousel {
    display: flex; flex: 1 1 auto; min-height: 320px; width: 100%;
    margin-inline: 0; padding: 28px 22px 0; gap: 10px;
    overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory;
    scroll-padding-inline: 22px; scrollbar-width: none; overscroll-behavior-x: contain;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-timeline-carousel::-webkit-scrollbar { display: none; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-timeline-carousel:focus-visible { outline: 3px solid #0095a4; outline-offset: -3px; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-timeline-carousel > .broken-picture-phone-result-timeline {
    flex: 0 0 100%; min-width: 0; height: 100%; margin: 0; padding: 8px !important;
    scroll-snap-align: center; scroll-snap-stop: always;
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-timeline-carousel .broken-picture-phone-result-entries {
    padding: 22px 12px 0; gap: 24px; clip-path: var(--paper-corners);
  }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-restart-button { margin-right: 22px; }
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-result-position { margin: 0; text-align: center; }
  @media (max-width: 600px) {
    body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand {
      overflow-y: auto !important; padding: 22px !important;
    }
    body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-drawing-prompt { padding: 12px 0 0; }
    body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-phase="writing"] .broken-picture-phone-input { height: 9rem; }
    body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand-results { min-height: 400px; }
  }
`.replace(/url\("(assets\/[^\"]+)"\)/g, function (_, path) { return 'url("' + assetUrl(path) + '")' })
