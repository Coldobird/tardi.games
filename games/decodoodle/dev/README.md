# Ending animation preview

Run `npm run dev` from `games/decodoodle`, then open
[the ending preview](http://localhost:3142/dev/ending.html).

It automatically plays a sample round with four players through the normal
platform messages, using colorful PNG drawings, and starts the real table ending
animation. No phones or manual submissions are needed. Choose 2–8 players to
try different timeline lengths. The animation loops; **Replay from start** resets
the round and reloads the current table bundle.

Edit `src/table.js` for reveal timing and rendering, or `src/visual-styles.js`
for animation styles. Edit the samples in `dev/ending.js` for names and text.
Refresh after a source change if the dev server has not already reloaded the page.
The preview is served only by the dev server and is excluded from `dist/`.
