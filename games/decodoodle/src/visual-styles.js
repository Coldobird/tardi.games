export var PICTURE_PHONE_STYLES = `
  @font-face {
    font-family: "Lilita One";
    src: url("assets/lilita-one-regular.ttf") format("truetype");
    font-display: swap;
    font-style: normal;
    font-weight: 400;
  }

  :root {
    /* Same viewport-relative root as the other games, so rem-based type and
       spacing scale with the 16:9 frame instead of freezing at 16px. */
    font-size: calc(6px + 1.2vmin);
    color-scheme: light;
  }

  * {
    box-sizing: border-box;
  }

  [hidden] {
    display: none !important;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
  }

  body {
    background: var(--page);
    color: var(--ink);
    font-family: "Trebuchet MS", "Segoe UI", sans-serif;
  }

  body[data-picture-phone-style="origami-stage"] {
    --page: #f4fbfa;
    --paper: #fffef8;
    --paper-2: #dff8f3;
    --ink: #13205c;
    --muted: #5b6482;
    --teal: #1fc7b1;
    --green: #84d62c;
    --navy: #142260;
    --yellow: #ffbd3e;
    --coral: #f5326c;
    --line: #172663;
    --shadow: 0 8px 0 rgba(20, 34, 96, .28), 0 18px 28px rgba(25, 48, 74, .2);
  }

  .broken-picture-phone-hand,
  .broken-picture-phone-table {
    width: 100% !important;
    height: 100% !important;
    min-height: 0;
    margin: 0;
    overflow: hidden !important;
  }

  .broken-picture-phone-hand {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px;
    background: var(--paper);
    color: var(--ink);
  }

  .broken-picture-phone-hand {
    height: var(--picture-phone-viewport-height, 100%) !important;
    max-height: var(--picture-phone-viewport-height, 100%);
    scrollbar-gutter: stable;
  }

  .broken-picture-phone-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 9px;
    flex: none;
  }

  .broken-picture-phone-brand {
    min-width: 0;
  }

  .broken-picture-phone-eyebrow {
    margin: 0 0 2px;
    color: var(--coral);
    font-size: .68rem;
    font-weight: 900;
    letter-spacing: .04em;
    text-transform: uppercase;
  }

  .broken-picture-phone-title {
    margin: 0 !important;
    color: var(--ink) !important;
    font-family: "Arial Rounded MT Bold", "Trebuchet MS", sans-serif;
    font-size: 1.55rem !important;
    font-weight: 900;
    line-height: 1;
    overflow-wrap: anywhere;
  }

  .broken-picture-phone-timer {
    flex: none;
    margin: 0;
    padding: 8px 10px;
    background: var(--coral);
    color: #fff;
    font-size: 1rem;
    font-weight: 900;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  .broken-picture-phone-label {
    margin: 0;
    color: var(--muted);
    font-size: .78rem;
    font-weight: 900;
    letter-spacing: .05em;
    text-transform: uppercase;
  }

  .broken-picture-phone-input,
  .broken-picture-phone-prompt,
  .broken-picture-phone-idea,
  .broken-picture-phone-entry-text {
    border: 2px solid var(--line) !important;
    background: var(--paper-2) !important;
    color: var(--ink) !important;
    box-shadow: 0 4px 0 rgba(35, 52, 67, .22);
  }

  .broken-picture-phone-input {
    flex: 1;
    width: 100%;
    min-height: 90px;
    padding: 14px;
    resize: none;
    outline: none;
    font: inherit;
    font-size: 1rem;
    line-height: 1.35;
  }

  .broken-picture-phone-input:focus {
    outline: 4px solid var(--yellow);
    outline-offset: 2px;
  }

  .broken-picture-phone-input::placeholder {
    color: var(--muted);
    opacity: .7;
  }

  .broken-picture-phone-button {
    min-height: 44px;
    padding: 9px 14px;
    border: 2px solid var(--line);
    background: var(--navy);
    color: #fff;
    box-shadow: 0 4px 0 rgba(26, 39, 66, .4);
    font: inherit;
    font-size: 1rem;
    font-weight: 900;
    cursor: pointer;
  }

  .broken-picture-phone-button:hover:not([disabled]) {
    filter: brightness(1.14);
    transform: translateY(-1px);
  }

  .broken-picture-phone-button:focus-visible,
  .broken-picture-phone-tool-button:focus-visible,
  .broken-picture-phone-swatch:focus-visible {
    outline: 4px solid var(--yellow);
    outline-offset: 3px;
  }

  .broken-picture-phone-button[disabled],
  .broken-picture-phone-tool-button[disabled] {
    cursor: default;
    opacity: .45;
  }

  .broken-picture-phone-status {
    min-height: 1.2em;
    margin: 0;
    color: var(--muted);
    font-size: .78rem;
    line-height: 1.25;
  }

  .broken-picture-phone-status:empty {
    display: none;
  }

  .broken-picture-phone-hand[data-input-focused="true"] {
    overflow-y: auto !important;
  }

  .broken-picture-phone-hand[data-input-focused="true"] > .broken-picture-phone-button {
    position: sticky;
    z-index: 3;
    bottom: 0;
  }

  .broken-picture-phone-hand-results {
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .broken-picture-phone-result {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
    width: 100%;
    min-height: 0;
  }

  .broken-picture-phone-result-title {
    margin: 0;
    color: var(--ink);
    font-family: "Lilita One", "Arial Rounded MT Bold", sans-serif;
    font-size: 2.75rem;
    font-weight: 400;
    line-height: 1;
  }

  .broken-picture-phone-result-status {
    max-width: 26rem;
    margin: 0;
    color: var(--muted);
    font-size: 1.5rem;
    line-height: 1.3;
  }

  .broken-picture-phone-restart-button {
    width: 100%;
    max-width: 260px;
  }

  .broken-picture-phone-drawing-prompt {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: none;
  }

  .broken-picture-phone-prompt,
  .broken-picture-phone-idea {
    margin: 0;
    padding: 9px 11px;
    font-size: .92rem;
    font-weight: 900;
    line-height: 1.2;
    overflow-wrap: anywhere;
  }

  .broken-picture-phone-drawing-surface {
    display: grid;
    grid-template-areas: "canvas" "tools";
    grid-template-rows: auto auto;
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
    align-items: center;
    justify-items: center;
    flex: 1;
    width: 100%;
    min-height: 0;
  }

  .broken-picture-phone-canvas-wrap {
    grid-area: canvas;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% + 28px);
    margin-right: -14px;
    margin-left: -14px;
    aspect-ratio: 1 / 1;
    max-width: 100%;
    max-height: none;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }

  .broken-picture-phone-drawing-panel {
    grid-area: tools;
    display: grid;
    gap: 7px;
    justify-items: center;
    width: 100%;
    max-width: 245px;
    min-width: 0;
  }

  .broken-picture-phone-drawing-tools {
    display: grid;
    gap: 6px;
    justify-items: center;
    width: 100%;
  }

  .broken-picture-phone-swatches,
  .broken-picture-phone-tool-buttons {
    display: grid;
    grid-template-columns: repeat(5, minmax(28px, 37px));
    gap: 5px;
    justify-content: center;
    width: 100%;
  }

  .broken-picture-phone-swatch,
  .broken-picture-phone-tool-button {
    width: 100%;
    height: 33px;
    padding: 0;
    border: 2px solid var(--line);
    background: var(--paper-2);
    color: var(--ink);
    box-shadow: 0 3px 0 rgba(34, 52, 72, .3);
    cursor: pointer;
  }

  .broken-picture-phone-tool-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .broken-picture-phone-tool-button svg {
    width: 19px;
    height: 19px;
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
  }

  .broken-picture-phone-tool-button-active,
  .broken-picture-phone-swatch-active {
    outline: 3px solid var(--coral);
    outline-offset: 1px;
  }

  .broken-picture-phone-size {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 7px;
    align-items: center;
    width: 100%;
    color: var(--muted);
    font-size: .72rem;
    font-weight: 900;
  }

  .broken-picture-phone-size input {
    width: 100%;
    accent-color: var(--coral);
  }

  .broken-picture-phone-canvas,
  .broken-picture-phone-drawing-preview,
  .broken-picture-phone-entry-image {
    display: block;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    aspect-ratio: 1 / 1;
    border: 3px solid var(--line) !important;
    background: #fff;
    box-shadow: 0 5px 0 rgba(32, 50, 65, .26);
    object-fit: contain;
  }

  .broken-picture-phone-canvas {
    height: 100%;
    cursor: crosshair;
    touch-action: none;
    transform-origin: 0 0;
  }

  .broken-picture-phone-canvas {
    border: 0 !important;
    box-shadow: none !important;
    outline: 0 !important;
  }

  .broken-picture-phone-canvas-ready {
    pointer-events: none;
    cursor: default;
    opacity: .3;
  }

  .broken-picture-phone-drawing-preview {
    max-height: 42%;
  }

  .broken-picture-phone-controls {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 7px;
    flex: none;
  }

  .broken-picture-phone-hidden {
    display: none;
  }

  .broken-picture-phone-table {
    position: relative;
    display: grid !important;
    /* Rows must be able to shrink below their content, or the results panel's
       cap plus the title and label rows overflow a short table viewport. */
    grid-auto-rows: minmax(0, auto) !important;
    align-items: center !important;
    justify-items: center !important;
    align-content: center !important;
    gap: 18px !important;
    padding: 7% !important;
    text-align: center !important;
  }

  .broken-picture-phone-table::before {
    content: "ROUND 1  •  DRAWING";
    color: var(--yellow);
    font-size: .8rem;
    font-weight: 900;
    letter-spacing: .12em;
  }

  /* The badge is phase chrome; during the results reveal it is both wrong
     ("ROUND 1 - DRAWING") and stealing height the timeline card needs. */
  .broken-picture-phone-table-results::before {
    content: none !important;
  }

  .broken-picture-phone-table-results {
    grid-template-columns: minmax(0, 1fr) !important;
    grid-template-rows: auto minmax(0, 1fr) !important;
    align-content: stretch !important;
  }

  .broken-picture-phone-table > .broken-picture-phone-title {
    max-width: 820px;
    color: #fff !important;
    font-size: 3.8rem !important;
    line-height: .94;
    text-shadow: 0 5px 0 rgba(30, 51, 71, .45);
  }

  .broken-picture-phone-table-status {
    max-width: 720px;
    margin: 0 !important;
    padding: 13px 22px;
    border: 3px solid var(--line);
    background: var(--paper-2);
    color: var(--ink) !important;
    box-shadow: var(--shadow);
    font-size: 1.35rem !important;
    font-weight: 900;
  }

  .broken-picture-phone-results-title {
    margin: 0 !important;
    color: #fff !important;
    font-size: 2.5rem !important;
    text-shadow: 0 4px 0 rgba(30, 51, 71, .45);
  }

  .broken-picture-phone-panel {
    display: flex !important;
    flex-direction: column !important;
    gap: 11px !important;
    width: 92% !important;
    max-width: 980px;
    justify-self: center;
    /* Fill the grid row left over after the label and title rows, rather than a
       fixed slice of the viewport that ignores them. */
    height: 100% !important;
    max-height: 100% !important;
    min-height: 0;
    padding: 18px !important;
    border: 5px solid var(--yellow) !important;
    background: var(--paper) !important;
    box-shadow: var(--shadow);
    color: var(--ink);
    text-align: left !important;
    overflow: hidden !important;
  }

  .broken-picture-phone-panel-title {
    margin: 0 !important;
    padding: 8px 12px;
    background: var(--teal);
    color: #fff !important;
    font-size: 1.4rem !important;
  }

  .broken-picture-phone-entry {
    display: flex !important;
    flex-direction: column !important;
    min-height: 0;
  }

  .broken-picture-phone-entries {
    display: grid !important;
    gap: 9px !important;
    min-height: 0;
    padding: 6px 12px 12px;
    overflow: hidden !important;
  }

  .broken-picture-phone-entry {
    gap: 5px !important;
  }

  .broken-picture-phone-entry-label {
    margin: 0 !important;
    color: var(--muted) !important;
    font-size: .78rem !important;
    font-weight: 900 !important;
    text-transform: uppercase;
  }

  .broken-picture-phone-entry-text {
    margin: 0 !important;
    padding: 11px !important;
    font-size: 1.15rem !important;
    line-height: 1.25 !important;
    overflow-wrap: anywhere;
  }

  .broken-picture-phone-entry-image {
    align-self: center;
    flex: 1;
    width: auto !important;
    height: 100% !important;
    min-height: 0;
    max-width: 100% !important;
    max-height: 100% !important;
    aspect-ratio: 1 / 1;
    object-fit: contain;
  }

  body[data-picture-phone-style="origami-stage"] {
    background-color: var(--page);
    background-image: url("assets/notebook-doodles.svg"), linear-gradient(to right, rgba(67, 204, 211, .24) 1px, transparent 1px), linear-gradient(to bottom, rgba(67, 204, 211, .24) 1px, transparent 1px), url("assets/reference-origami-white-paper.jpg");
    background-position: center;
    background-size: 420px 420px, 30px 30px, 30px 30px, cover;
    color: var(--ink);
    font-family: "Lilita One", "Arial Rounded MT Bold", "Trebuchet MS", sans-serif;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand {
    margin: 8px;
    width: calc(100% - 16px) !important;
    height: calc(100% - 16px) !important;
    padding: 17px;
    border: 6px solid #fff;
    background-color: var(--paper);
    background-image: url("assets/notebook-doodles.svg"), linear-gradient(to right, rgba(74, 210, 214, .18) 1px, transparent 1px), linear-gradient(to bottom, rgba(74, 210, 214, .18) 1px, transparent 1px), url("assets/reference-origami-white-paper.jpg");
    background-position: center;
    background-size: 420px 420px, 30px 30px, 30px 30px, cover;
    clip-path: polygon(2% 0, 98% 1%, 100% 5%, 99% 18%, 100% 34%, 99% 51%, 100% 70%, 98% 100%, 72% 99%, 48% 100%, 24% 99%, 2% 100%, 0 91%, 1% 72%, 0 48%, 1% 24%, 0 6%);
    box-shadow: 0 8px 0 var(--navy), 0 16px 26px rgba(20, 34, 96, .25), inset 0 0 0 2px rgba(81, 210, 213, .28);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-header {
    padding: 10px 13px;
    border: 4px solid #fff;
    background-color: var(--teal);
    background-image: linear-gradient(rgba(31, 199, 177, .9), rgba(15, 172, 166, .84)), url("assets/reference-origami-tissue.jpg");
    background-size: auto, 128px 128px;
    clip-path: polygon(2% 2%, 94% 0, 100% 50%, 95% 100%, 0 96%);
    box-shadow: 7px 7px 0 var(--navy), 12px 12px 0 rgba(245, 50, 108, .72);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-title,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-eyebrow {
    color: #fff !important;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-title {
    font-family: "Lilita One", "Arial Rounded MT Bold", sans-serif;
    font-weight: 400;
    letter-spacing: .01em;
    text-shadow: 0 3px 0 var(--navy);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt {
    padding: 8px;
    border: 3px solid var(--navy);
    background-color: #fff;
    background-image: url("assets/reference-origami-tissue.jpg");
    background-size: auto, 128px 128px;
    clip-path: polygon(0 5%, 97% 0, 100% 90%, 3% 100%);
    box-shadow: 6px 6px 0 var(--yellow), 10px 10px 0 rgba(20, 34, 96, .22);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-label {
    color: var(--coral);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-prompt,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-input,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-entry-text {
    background-color: #f7f8f4 !important;
    background-image: linear-gradient(to right, rgba(75, 207, 215, .16) 1px, transparent 1px), linear-gradient(to bottom, rgba(75, 207, 215, .16) 1px, transparent 1px), url("assets/reference-origami-white-paper.jpg") !important;
    background-position: center;
    background-size: 24px 24px, 24px 24px, cover !important;
    font-family: "Lilita One", "Arial Rounded MT Bold", sans-serif;
    font-weight: 400;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-canvas,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-preview,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-entry-image {
    border-color: var(--navy) !important;
    box-shadow: inset 0 0 20px rgba(20, 34, 96, .08), 7px 8px 0 var(--coral), 12px 14px 0 var(--yellow), 0 22px 25px rgba(20, 34, 96, .18);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-panel {
    padding: 8px;
    border: 3px solid #fff;
    background-color: var(--teal);
    background-image: url("assets/notebook-doodles.svg"), linear-gradient(rgba(31, 199, 177, .86), rgba(18, 174, 169, .86)), url("assets/reference-origami-tissue.jpg");
    background-size: 210px 210px, auto, 128px 128px;
    clip-path: polygon(3% 0, 98% 3%, 100% 94%, 95% 100%, 0 97%, 2% 48%);
    box-shadow: 5px 6px 0 var(--navy), 9px 10px 0 rgba(245, 50, 108, .48);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-size {
    color: var(--navy);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-button {
    background: var(--teal);
    border-color: #fff;
    color: var(--navy);
    font-family: "Lilita One", "Arial Rounded MT Bold", sans-serif;
    font-weight: 400;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table {
    padding: 8% 10% !important;
    background-color: var(--page);
    background-image: url("assets/notebook-doodles.svg"), linear-gradient(to right, rgba(67, 204, 211, .24) 1px, transparent 1px), linear-gradient(to bottom, rgba(67, 204, 211, .24) 1px, transparent 1px), url("assets/reference-origami-white-paper.jpg");
    background-position: center;
    background-size: 420px 420px, 30px 30px, 30px 30px, cover;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table::before {
    padding: 10px 18px;
    border: 4px solid #fff;
    background-color: var(--coral);
    background-image: linear-gradient(rgba(245, 50, 108, .9), rgba(225, 39, 91, .84)), url("assets/reference-origami-tissue.jpg");
    color: #fff;
    clip-path: polygon(4% 0, 96% 3%, 100% 85%, 3% 100%);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table > .broken-picture-phone-title {
    max-width: 980px;
    padding: 18px 30px;
    background: transparent;
    color: var(--navy) !important;
    font-size: 3.7rem !important;
    font-family: "Lilita One", "Arial Rounded MT Bold", sans-serif;
    font-weight: 400;
    letter-spacing: .01em;
    paint-order: stroke fill;
    -webkit-text-stroke: 7px #fff;
    text-shadow: 5px 6px 0 var(--teal), 10px 11px 0 rgba(245, 50, 108, .62), 15px 16px 18px rgba(20, 34, 96, .22);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table-status {
    border-color: #fff;
    background-color: var(--teal);
    background-image: url("assets/notebook-doodles.svg"), linear-gradient(rgba(31, 199, 177, .9), rgba(15, 172, 166, .86)), url("assets/reference-origami-tissue.jpg");
    background-size: 190px 190px, auto, 128px 128px;
    color: #fff !important;
    font-family: "Lilita One", "Arial Rounded MT Bold", sans-serif;
    font-weight: 400;
    text-shadow: 0 3px 0 var(--navy);
    clip-path: polygon(3% 0, 96% 2%, 100% 50%, 96% 100%, 4% 98%, 0 50%);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-panel {
    border-color: var(--coral) !important;
    background-color: var(--paper) !important;
    background-image: url("assets/reference-origami-white-paper.jpg") !important;
    background-position: center;
    background-size: cover;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-panel-title {
    background-color: var(--navy);
    background-image: linear-gradient(rgba(31, 199, 177, .9), rgba(15, 172, 166, .84)), url("assets/reference-origami-tissue.jpg");
    font-family: "Lilita One", "Arial Rounded MT Bold", sans-serif;
  }

  .broken-picture-phone-hand {
    box-shadow: 0 9px 0 #172c3c, 0 17px 28px rgba(5, 22, 31, .42), inset 0 2px 0 rgba(255, 255, 255, .6), inset 0 -3px 0 rgba(45, 42, 31, .22);
  }

  .broken-picture-phone-header,
  .broken-picture-phone-drawing-prompt,
  .broken-picture-phone-table-status,
  .broken-picture-phone-panel-title {
    position: relative;
    transform: perspective(700px) rotateX(-1.2deg);
    transform-origin: center bottom;
    filter: drop-shadow(0 5px 0 rgba(26, 43, 56, .34)) drop-shadow(0 9px 8px rgba(18, 31, 41, .18));
  }

  .broken-picture-phone-header::after,
  .broken-picture-phone-drawing-prompt::after,
  .broken-picture-phone-panel-title::after {
    content: "";
    position: absolute;
    z-index: -1;
    right: 3px;
    bottom: -6px;
    left: 3px;
    height: 7px;
    background: rgba(27, 50, 64, .42);
    clip-path: polygon(2% 0, 98% 0, 100% 100%, 0 100%);
  }

  .broken-picture-phone-canvas,
  .broken-picture-phone-drawing-preview,
  .broken-picture-phone-entry-image {
    border-width: 4px !important;
    box-shadow: inset 0 0 22px rgba(98, 77, 46, .1), 0 6px 0 rgba(31, 48, 63, .42), 0 13px 19px rgba(17, 31, 42, .22);
    transform: perspective(900px) rotateX(.7deg);
    transform-origin: center bottom;
  }

  .broken-picture-phone-button {
    border-top-color: rgba(255, 255, 255, .64);
    box-shadow: inset 0 2px 0 rgba(255, 255, 255, .28), inset 0 -4px 0 rgba(8, 20, 44, .32), 0 6px 0 #172641, 0 11px 13px rgba(15, 28, 40, .3);
    transform: perspective(600px) rotateX(-2deg);
    transform-origin: center bottom;
  }

  .broken-picture-phone-button:hover:not([disabled]) {
    transform: perspective(600px) rotateX(-2deg) translateY(-2px);
  }

  .broken-picture-phone-button:active:not([disabled]) {
    box-shadow: inset 0 2px 0 rgba(255, 255, 255, .22), inset 0 -2px 0 rgba(8, 20, 44, .3), 0 2px 0 #172641;
    transform: perspective(600px) rotateX(-1deg) translateY(4px);
  }

  .broken-picture-phone-swatch,
  .broken-picture-phone-tool-button {
    border-top-color: rgba(255, 255, 255, .72);
    border-left-color: rgba(255, 255, 255, .5);
    box-shadow: inset 0 2px 0 rgba(255, 255, 255, .46), inset 0 -3px 0 rgba(21, 32, 40, .25), 0 4px 0 rgba(26, 42, 55, .58), 0 7px 8px rgba(19, 30, 40, .2);
    transform: perspective(400px) rotateX(-3deg);
    transform-origin: center bottom;
  }

  .broken-picture-phone-tool-button:active:not([disabled]),
  .broken-picture-phone-swatch:active {
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, .34), inset 0 -2px 0 rgba(21, 32, 40, .2), 0 1px 0 rgba(26, 42, 55, .58);
    transform: perspective(400px) rotateX(-1deg) translateY(3px);
  }

  .broken-picture-phone-tool-button-active,
  .broken-picture-phone-swatch-active {
    box-shadow: inset 0 2px 0 rgba(255, 255, 255, .42), inset 0 -3px 0 rgba(21, 32, 40, .2), 0 3px 0 var(--coral), 0 7px 10px rgba(18, 30, 40, .24);
  }

  .broken-picture-phone-timer {
    border: 2px solid rgba(91, 33, 22, .62);
    box-shadow: inset 0 2px 0 rgba(255, 255, 255, .34), inset 0 -3px 0 rgba(87, 25, 17, .28), 0 5px 0 rgba(70, 35, 23, .48), 0 9px 12px rgba(23, 33, 39, .2);
    transform: perspective(500px) rotateY(-4deg) rotateX(-2deg);
  }

  .broken-picture-phone-table > .broken-picture-phone-title {
    filter: drop-shadow(0 5px 0 rgba(22, 40, 53, .54)) drop-shadow(0 12px 12px rgba(13, 26, 35, .28));
    transform: perspective(900px) rotateX(-2deg);
    transform-origin: center bottom;
  }

  .broken-picture-phone-table-status {
    border-top-color: rgba(255, 255, 255, .58);
    box-shadow: inset 0 2px 0 rgba(255, 255, 255, .3), inset 0 -5px 0 rgba(23, 36, 60, .25), 0 8px 0 rgba(22, 38, 55, .58), 0 16px 20px rgba(12, 25, 35, .3);
  }

  .broken-picture-phone-panel {
    box-shadow: inset 0 3px 0 rgba(255, 255, 255, .62), inset 0 -5px 0 rgba(81, 61, 31, .18), 0 11px 0 rgba(24, 42, 56, .48), 0 23px 34px rgba(12, 27, 38, .34);
    transform: perspective(1200px) rotateX(.5deg);
  }

  body[data-picture-phone-style="origami-stage"] {
    background-image: linear-gradient(to right, rgba(67, 204, 211, .26) 1px, transparent 1px), linear-gradient(to bottom, rgba(67, 204, 211, .26) 1px, transparent 1px), url("assets/reference-origami-white-paper.jpg");
    background-size: 20px 20px, 20px 20px, cover;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table {
    background-image: linear-gradient(to right, rgba(67, 204, 211, .21) 1px, transparent 1px), linear-gradient(to bottom, rgba(67, 204, 211, .21) 1px, transparent 1px), url("assets/reference-origami-white-paper.jpg") !important;
    background-position: center;
    background-size: 20px 20px, 20px 20px, cover !important;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand {
    box-shadow: 0 11px 0 var(--navy), 0 22px 34px rgba(20, 34, 96, .32), inset 0 0 0 2px rgba(81, 210, 213, .28);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-brand {
    display: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-header {
    justify-content: flex-end;
    min-height: 42px;
    padding: 0 8px;
    border: 0;
    background: transparent;
    box-shadow: none;
    filter: drop-shadow(2px 3px 3px rgba(20, 34, 96, .18));
    transform: none;
    clip-path: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-header::after {
    display: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-timer {
    padding: 7px 13px;
    border: 3px solid #fff;
    border-radius: 999px;
    background: var(--coral);
    box-shadow: inset 0 -3px 0 rgba(114, 15, 54, .2), 0 6px 0 var(--navy), 0 12px 16px rgba(20, 34, 96, .28);
    transform: rotate(1deg);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt {
    display: grid;
    grid-template-columns: minmax(76px, auto) minmax(0, 1fr);
    align-items: stretch;
    gap: 0;
    padding: 0;
    border: 4px solid var(--yellow);
    background-color: #fff;
    background-image: url("assets/reference-origami-tissue.jpg");
    background-size: 128px 128px;
    box-shadow: 0 7px 0 var(--navy), 0 14px 18px rgba(20, 34, 96, .28);
    filter: none;
    transform: rotate(-.5deg);
    clip-path: polygon(3% 0, 100% 3%, 98% 94%, 4% 100%, 0 50%);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt::after {
    display: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-label {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 9px;
    background: var(--yellow);
    color: var(--navy);
    font-size: .68rem;
    line-height: 1;
    text-align: center;
    clip-path: polygon(18% 0, 100% 4%, 92% 100%, 12% 96%, 0 50%);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-prompt {
    align-self: center;
    min-width: 0;
    padding: 7px 12px;
    border: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-input,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-entry-text {
    border: 4px solid var(--yellow) !important;
    background-image: linear-gradient(to right, rgba(75, 207, 215, .14) 1px, transparent 1px), linear-gradient(to bottom, rgba(75, 207, 215, .14) 1px, transparent 1px), url("assets/reference-origami-white-paper.jpg") !important;
    background-size: 20px 20px, 20px 20px, cover !important;
    box-shadow: inset 0 2px 0 rgba(255, 255, 255, .82), 0 7px 0 var(--navy), 0 14px 18px rgba(20, 34, 96, .23);
    clip-path: polygon(2% 0, 100% 2%, 98% 96%, 3% 100%, 0 50%);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-panel {
    padding: 6px 8px;
    background-image: linear-gradient(rgba(31, 199, 177, .9), rgba(18, 174, 169, .9)), url("assets/reference-origami-tissue.jpg");
    background-size: auto, 128px 128px;
    box-shadow: 0 7px 0 var(--navy), 0 13px 0 rgba(245, 50, 108, .5), 0 19px 20px rgba(20, 34, 96, .22);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-button {
    min-height: 38px;
    padding: 6px 16px;
    border: 3px solid #fff;
    border-radius: 999px;
    background-color: var(--teal);
    background-image: url("assets/notebook-doodles.svg"), linear-gradient(rgba(31, 199, 177, .92), rgba(18, 174, 169, .92));
    background-position: center;
    background-size: 190px 190px, auto;
    color: #fff;
    box-shadow: inset 0 -3px 0 rgba(9, 118, 124, .24), 0 7px 0 var(--navy), 0 14px 18px rgba(20, 34, 96, .32);
    transform: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-button:hover:not([disabled]) {
    transform: translateY(-2px);
    box-shadow: inset 0 -3px 0 rgba(9, 118, 124, .24), 0 9px 0 var(--navy), 0 17px 20px rgba(20, 34, 96, .34);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-button:active:not([disabled]) {
    transform: translateY(5px);
    box-shadow: inset 0 -2px 0 rgba(9, 118, 124, .2), 0 2px 0 var(--navy), 0 6px 9px rgba(20, 34, 96, .22);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table > .broken-picture-phone-title {
    text-shadow: 6px 7px 0 var(--teal), 11px 13px 0 var(--coral), 17px 19px 0 var(--navy), 0 28px 28px rgba(20, 34, 96, .28);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table::before {
    box-shadow: 0 7px 0 var(--navy), 0 14px 18px rgba(20, 34, 96, .3);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table-status {
    padding: 9px 18px;
    border: 4px solid var(--yellow);
    background-color: #fff;
    background-image: url("assets/reference-origami-tissue.jpg");
    background-size: 128px 128px;
    color: var(--navy) !important;
    text-shadow: none;
    box-shadow: inset 0 2px 0 rgba(255, 255, 255, .8), 0 8px 0 var(--navy), 0 16px 20px rgba(20, 34, 96, .28);
    clip-path: polygon(4% 0, 100% 3%, 97% 93%, 5% 100%, 0 50%);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-panel-title {
    background-image: linear-gradient(rgba(31, 199, 177, .94), rgba(15, 172, 166, .94)), url("assets/reference-origami-tissue.jpg");
    box-shadow: 0 7px 0 var(--navy), 0 14px 18px rgba(20, 34, 96, .28);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand {
    position: relative;
    padding: 22px;
    border: 8px solid var(--navy);
    background: #08143b !important;
    box-shadow: 0 15px 0 #08123a, 0 30px 52px rgba(5, 13, 46, .52);
    clip-path: none;
    isolation: isolate;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 7px 6px 8px 7px;
    background-color: var(--paper);
    background-image: linear-gradient(to right, rgba(67, 204, 211, .21) 1px, transparent 1px), linear-gradient(to bottom, rgba(67, 204, 211, .21) 1px, transparent 1px), url("assets/reference-origami-white-paper.jpg");
    background-position: center;
    background-size: 20px 20px, 20px 20px, cover;
    box-shadow: 0 9px 16px rgba(4, 12, 41, .32);
    clip-path: polygon(1% 0, 18% 1%, 32% 0, 49% 1%, 65% 0, 82% 1%, 99% 0, 100% 13%, 99% 28%, 100% 44%, 99% 61%, 100% 77%, 99% 100%, 81% 99%, 65% 100%, 47% 99%, 31% 100%, 15% 99%, 0 100%, 1% 83%, 0 68%, 1% 53%, 0 37%, 1% 20%);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand > * {
    position: relative;
    z-index: 1;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-timer {
    font-size: 1.12rem;
    box-shadow: inset 0 -3px 0 rgba(114, 15, 54, .2), 0 9px 0 var(--navy), 0 20px 28px rgba(5, 13, 46, .48);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt {
    grid-template-columns: minmax(104px, auto) minmax(0, 1fr);
    padding: 6px;
    border: 0;
    background-color: #fff;
    background-image: url("assets/reference-origami-white-paper.jpg");
    background-position: center;
    background-size: cover;
    box-shadow: 0 11px 0 rgba(7, 18, 57, .72), 0 25px 34px rgba(5, 13, 46, .48);
    clip-path: polygon(1% 2%, 99% 0, 100% 94%, 3% 100%);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-label,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-prompt {
    background-color: #747474 !important;
    background-image: linear-gradient(rgba(116, 116, 116, .92), rgba(102, 102, 102, .92)), url("assets/reference-origami-tissue.jpg") !important;
    background-size: auto, 128px 128px !important;
    color: #fff !important;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-label {
    padding: 8px 11px;
    font-size: .78rem;
    clip-path: polygon(4% 4%, 100% 0, 94% 100%, 0 94%);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-prompt {
    align-self: stretch;
    display: flex;
    align-items: center;
    padding: 8px 14px;
    font-size: 1.08rem;
    line-height: 1.08;
    clip-path: polygon(2% 0, 100% 4%, 98% 94%, 0 100%);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-label {
    font-size: .84rem;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-input,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-entry-text {
    font-size: 1.08rem;
    box-shadow: inset 0 2px 0 rgba(255, 255, 255, .82), 0 11px 0 rgba(7, 18, 57, .74), 0 24px 34px rgba(5, 13, 46, .4);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-canvas,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-preview,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-entry-image {
    box-shadow: 4px 6px 14px 3px rgba(0, 0, 0, .62);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-panel {
    box-shadow: 4px 6px 15px 3px rgba(0, 0, 0, .62);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-swatch {
    background-image: none !important;
    border: 2px solid var(--navy);
    box-shadow: 2px 3px 8px 1px rgba(0, 0, 0, .5);
    filter: none;
    transform: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-tool-button {
    border: 2px solid var(--navy);
    box-shadow: 2px 3px 8px 1px rgba(0, 0, 0, .5);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-button {
    min-height: 40px;
    font-size: 1.08rem;
    box-shadow: inset 0 -3px 0 rgba(9, 118, 124, .24), 0 11px 0 rgba(7, 18, 57, .82), 0 25px 34px rgba(5, 13, 46, .5);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-button:hover:not([disabled]) {
    box-shadow: inset 0 -3px 0 rgba(9, 118, 124, .24), 0 13px 0 rgba(7, 18, 57, .84), 0 29px 38px rgba(5, 13, 46, .52);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table > .broken-picture-phone-title {
    font-size: 4.15rem !important;
    text-shadow: 7px 8px 0 var(--teal), 14px 16px 0 var(--coral), 22px 25px 0 var(--navy), 0 40px 48px rgba(5, 13, 46, .5);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table::before {
    font-size: .94rem;
    box-shadow: 3px 4px 11px 3px rgba(0, 0, 0, .68);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table-status {
    padding: 11px 21px;
    font-size: 1.55rem !important;
    box-shadow: 3px 4px 12px 3px rgba(0, 0, 0, .7);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand {
    margin: 0;
    width: 100% !important;
    height: 100% !important;
    padding: 20px;
    border: 7px solid #07112f;
    background: #07112f !important;
    box-shadow: 4px 5px 15px 4px rgba(0, 0, 0, .68);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand::before {
    inset: 0;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-timer {
    padding: 8px 15px;
    font-size: 1.24rem;
    box-shadow: 3px 4px 11px 2px rgba(0, 0, 0, .7);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt {
    position: relative;
    grid-template-columns: minmax(106px, auto) minmax(0, 1fr);
    min-height: 64px;
    padding: 8px 11px 8px 8px;
    background-color: #fffef8;
    background-image: repeating-linear-gradient(to bottom, transparent 0, transparent 19px, rgba(73, 180, 205, .28) 20px, transparent 21px), url("assets/reference-origami-white-paper.jpg");
    background-position: 0 4px, center;
    background-size: auto, cover;
    box-shadow: 3px 4px 11px 3px rgba(0, 0, 0, .8);
    filter: drop-shadow(2px 3px 2px rgba(0, 0, 0, .48)) drop-shadow(6px 10px 8px rgba(0, 0, 0, .76));
    clip-path: polygon(1% 2%, 99% 0, 100% 94%, 3% 100%);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-label {
    position: relative;
    z-index: 2;
    align-self: center;
    overflow: visible;
    padding: 11px 25px 11px 14px;
    background-color: var(--coral) !important;
    background-image: linear-gradient(rgba(245, 50, 108, .88), rgba(231, 38, 94, .88)), url("assets/reference-origami-tissue.jpg") !important;
    background-size: auto, 96px 96px !important;
    color: #fff !important;
    font-size: .96rem;
    line-height: 1;
    text-shadow: 0 2px 0 rgba(20, 34, 96, .72);
    filter: drop-shadow(2px 3px 2px rgba(0, 0, 0, .52)) drop-shadow(5px 8px 6px rgba(0, 0, 0, .78));
    clip-path: polygon(5% 4%, 78% 0, 100% 50%, 78% 100%, 0 94%);
    transform: translateX(-2px) rotate(-.5deg);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-prompt {
    align-self: center;
    padding: 8px 12px;
    background: transparent !important;
    color: var(--navy) !important;
    font-size: 1.24rem;
    line-height: 1.08;
    text-shadow: none;
    clip-path: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-label {
    font-size: .96rem;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-input,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-entry-text {
    font-size: 1.22rem;
    box-shadow: 3px 4px 12px 3px rgba(0, 0, 0, .68);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-panel {
    gap: 10px;
    max-width: 258px;
    padding: 11px 13px 13px;
    background-color: var(--teal);
    background-image: linear-gradient(rgba(31, 199, 177, .82), rgba(31, 199, 177, .82)), url("assets/reference-origami-white-paper.jpg");
    background-position: center;
    background-size: auto, cover;
    box-shadow: 4px 6px 15px 3px rgba(0, 0, 0, .7);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-tools {
    gap: 9px;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-swatches,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-tool-buttons {
    gap: 7px;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-size {
    width: 100%;
    font-size: .92rem;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-button {
    min-height: 48px;
    padding: 10px 22px;
    background-color: var(--teal);
    background-image: url("assets/notebook-doodles.svg"), url("assets/notebook-doodles.svg"), linear-gradient(rgba(31, 199, 177, .76), rgba(31, 199, 177, .76)), url("assets/reference-origami-white-paper.jpg");
    background-position: center, 54px 38px, center, center;
    background-size: 112px 112px, 112px 112px, auto, cover;
    color: #fff;
    font-size: 1.26rem;
    box-shadow: 4px 6px 14px 3px rgba(0, 0, 0, .72);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-button:hover:not([disabled]) {
    box-shadow: 5px 7px 16px 3px rgba(0, 0, 0, .76);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-button:active:not([disabled]) {
    box-shadow: 2px 3px 9px 2px rgba(0, 0, 0, .68);
    transform: translateY(2px);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table-status {
    position: relative;
    isolation: isolate;
    border: 0;
    background: var(--yellow);
    filter: drop-shadow(2px 3px 2px rgba(0, 0, 0, .48)) drop-shadow(6px 10px 8px rgba(0, 0, 0, .76));
    transform: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table-status::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 4px;
    background-color: var(--teal);
    background-image: linear-gradient(rgba(31, 199, 177, .82), rgba(31, 199, 177, .82)), url("assets/reference-origami-white-paper.jpg");
    background-position: center;
    background-size: auto, cover;
    clip-path: polygon(3% 0, 96% 2%, 100% 50%, 96% 100%, 4% 98%, 0 50%);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-canvas-wrap {
    position: relative;
    isolation: isolate;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-canvas-wrap::after {
    content: "";
    position: absolute;
    z-index: 2;
    inset: 3px;
    background-image: url("assets/reference-origami-white-paper.jpg");
    background-position: center;
    background-size: cover;
    mix-blend-mode: multiply;
    opacity: .16;
    pointer-events: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-swatch-active,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-tool-button-active {
    box-shadow: 2px 3px 8px 1px rgba(0, 0, 0, .5);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-tool-button:active:not([disabled]),


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-swatch:active {
    box-shadow: 1px 2px 6px 1px rgba(0, 0, 0, .46);
    transform: translateY(1px);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-panel,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-panel-title {
    box-shadow: 3px 4px 12px 3px rgba(0, 0, 0, .68);
    filter: none;
    transform: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-panel-title::after {
    display: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt {
    isolation: isolate;
    background: transparent;
    box-shadow: none;
    filter: none;
    clip-path: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    background-color: #fffef8;
    background-image: repeating-linear-gradient(to bottom, transparent 0, transparent 19px, rgba(73, 180, 205, .28) 20px, transparent 21px), url("assets/reference-origami-white-paper.jpg");
    background-position: 0 4px, center;
    background-size: auto, cover;
    filter: none;
    clip-path: polygon(1% 2%, 99% 0, 100% 94%, 3% 100%);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-label {
    isolation: isolate;
    background: transparent !important;
    filter: none;
    clip-path: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-label::before,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-label::after {
    content: "";
    position: absolute;
    inset: 0;
    clip-path: polygon(5% 4%, 78% 0, 100% 50%, 78% 100%, 0 94%);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-label::before {
    z-index: -2;
    background: rgba(0, 0, 0, .65);
    filter: blur(13px);
    transform: translate(2px, 2px);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt .broken-picture-phone-label::after {
    z-index: -1;
    background-color: var(--coral);
    background-image: linear-gradient(rgba(245, 50, 108, .88), rgba(231, 38, 94, .88)), url("assets/reference-origami-tissue.jpg");
    background-size: auto, 96px 96px;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table-status {
    background: transparent;
    box-shadow: none;
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, .55));
    clip-path: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table-status::after {
    content: "";
    position: absolute;
    z-index: -2;
    inset: 0;
    background: var(--yellow);
    filter: none;
    clip-path: polygon(4% 0, 100% 3%, 97% 93%, 5% 100%, 0 50%);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt {
    filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, .7));
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand {
    box-shadow: 3px 3px 12px 2px rgba(0, 0, 0, .55);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-timer {
    box-shadow: 2px 3px 8px 1px rgba(20, 34, 96, .26);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] {
    gap: 6px;
    padding: 10px;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-header {
    min-height: 34px;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-timer {
    padding: 5px 10px;
    font-size: 1rem;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-drawing-prompt {
    grid-template-columns: minmax(72px, auto) minmax(0, 1fr);
    min-height: 0;
    padding: 4px;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-drawing-prompt .broken-picture-phone-label {
    padding: 6px 14px 6px 8px;
    font-size: .78rem;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-drawing-prompt .broken-picture-phone-prompt {
    max-height: 4.4rem;
    padding: 5px 8px;
    overflow-y: auto;
    font-size: 1rem;
    line-height: 1.1;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-layout="short"] .broken-picture-phone-drawing-surface {
    grid-template-areas: "canvas tools";
    grid-template-rows: minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr) minmax(145px, 38%);
    align-items: center;
    gap: 8px;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-layout="short"] .broken-picture-phone-canvas-wrap {
    align-self: center;
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin: 0;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-drawing-panel {
    gap: 5px;
    width: 100%;
    max-width: none;
    padding: 6px;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-drawing-tools,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-swatches,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-tool-buttons {
    gap: 4px;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-swatches,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-tool-buttons {
    grid-template-columns: repeat(5, minmax(22px, 1fr));
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-swatch,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-tool-button {
    height: 29px;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-size {
    font-size: .78rem;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-button {
    min-height: 40px;
    padding: 6px 14px;
    font-size: 1rem;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-input,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-entry-text,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-canvas,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-preview,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-entry-image {
    box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, .55);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-input {
    background-color: #fffef8 !important;
    background-image: repeating-linear-gradient(to bottom, transparent 0, transparent 24px, rgba(73, 180, 205, .2) 25px, transparent 26px), url("assets/reference-origami-white-paper.jpg") !important;
    background-position: 0 8px, center !important;
    background-size: auto, cover !important;
    box-shadow: 0 6px 0 rgba(20, 34, 96, .16), 3px 8px 14px rgba(20, 34, 96, .22) !important;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-input::placeholder {
    color: #68708a;
    opacity: .78;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-panel {
    box-shadow: none;
    filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, .52));
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-swatch,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-tool-button,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-swatch-active,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-tool-button-active {
    box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, .45);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-button,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-button:hover:not([disabled]) {
    box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, .55);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-button:active:not([disabled]) {
    box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, .48);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table::before {
    box-shadow: none;
    filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, .52));
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-panel,


  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-panel-title {
    box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, .52);
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table-results {
    gap: 10px !important;
    padding: 3% 5% !important;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-table-results .broken-picture-phone-panel {
    width: 72% !important;
    max-width: 46rem;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-canvas,
  .broken-picture-phone-canvas {
    border: 0 !important;
    box-shadow: none !important;
    outline: 0 !important;
    transform: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-button {
    color: var(--navy);
    font-size: 1.32rem;
    text-shadow: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-panel-title {
    color: var(--navy) !important;
    font-size: 1.65rem !important;
    line-height: 1.1;
  }

  .broken-picture-phone-tool-button img {
    display: block;
    width: 1.35rem;
    height: 1.35rem;
    pointer-events: none;
    user-select: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-size {
    color: var(--navy);
    font-size: .92rem;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-prompt {
    order: 1;
    filter: drop-shadow(2px 2px 2px rgba(20, 34, 96, .2));
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-drawing-surface {
    order: 2;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-controls {
    order: 3;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"][data-viewport-layout="regular"] .broken-picture-phone-drawing-surface {
    grid-template-rows: minmax(0, 1fr) auto;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"][data-viewport-layout="regular"] .broken-picture-phone-canvas-wrap,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-layout="short"] .broken-picture-phone-canvas-wrap {
    width: auto;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    margin: 0;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-drawing-prompt .broken-picture-phone-prompt {
    max-height: none;
    overflow: visible;
    font-size: 1.25rem;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-drawing-prompt .broken-picture-phone-label,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-timer {
    font-size: 1.25rem;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-size {
    font-size: 1.28rem;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"] .broken-picture-phone-button {
    font-size: 1.4rem;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-phase="writing"] .broken-picture-phone-input {
    flex: none;
    width: 100%;
    height: 11rem;
    min-height: 7rem;
    max-height: 11rem;
    font-size: 1.25rem;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-phase="writing"] > .broken-picture-phone-label,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-character-count,
  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-status-sent {
    font-size: 1.25rem;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-character-count {
    align-self: flex-end;
    margin: -.2rem .35rem 0 0;
    color: var(--muted);
    font-weight: 900;
    line-height: 1;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-status-sent {
    display: block;
    align-self: flex-end;
    min-height: 0;
    padding: 0 .35rem;
    border: 0;
    background: transparent;
    color: #3d7a16;
    box-shadow: none;
    font-weight: 900;
    letter-spacing: .04em;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-status-sent::before {
    content: none;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-input-sent {
    border-color: var(--green) !important;
    background-color: transparent !important;
    background-image: none !important;
    box-shadow: none !important;
    cursor: default;
    opacity: .62;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-input-sent + .broken-picture-phone-character-count {
    display: none !important;
  }

  body[data-picture-phone-style="origami-stage"] .broken-picture-phone-hand[data-viewport-compact="true"][data-phase="writing"] .broken-picture-phone-input {
    height: 9rem;
    min-height: 6rem;
    max-height: 9rem;
  }

  @keyframes brokenPicturePhoneReveal {
    from { opacity: 0; transform: translateY(12px) scale(.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`

export function applyPicturePhoneStyle() {
  document.body.setAttribute('data-picture-phone-style', 'origami-stage')
}
