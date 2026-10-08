# Ending animation preview

For DecoDoodle visual changes, run `npm run dev` and use the
[all game screens preview](http://localhost:3142/dev/game-states.html) to check
the live TV and phone layouts, including mobile sizing. Use its reset buttons to
restore sample states while iterating. The paper comparison and Snipperclips
library below are available when changing the UI design.

Run `npm run dev` from `games/decodoodle`, then open
[the ending preview](http://localhost:3142/dev/ending.html).

It automatically plays a sample round with four players through the normal
platform messages, using colorful PNG drawings, and starts the real table ending
animation. No phones or manual submissions are needed. Choose 2–8 players to
try different timeline lengths. The animation loops; **Replay from start** resets
the round and reloads the current table bundle.

Use **Phase** to pause the sample at writing, drawing, or guessing. Expand
**Player screen** to try the actual player controls; submissions update the table
through the normal SDK. Guessing requires at least three players, so that preview
automatically increases a two-player selection to three.

Edit `src/table.js` for reveal timing and rendering, or `src/visual-styles.js`
for animation styles. Edit the samples in `dev/ending.js` for names and text.
Refresh after a source change if the dev server has not already reloaded the page.
The preview is served only by the dev server and is excluded from `dist/`.

## Paper UI comparison

Open [the paper workshop](http://localhost:3142/dev/ui-comparison.html) to compare
nine groups of current and proposed elements. Choose individual variants or use
the bulk buttons. Choices are saved in this browser and shown at the bottom;
they do not change the production game. `current-ui.css` freezes the original
styles for a stable comparison. `paper-ui.css` defines the proposed layered
components, clipping only the backing and leaving the inset top sheet intact.

The [Snipperclips design library](http://localhost:3142/dev/snipperclips-gallery.html)
contains twelve distinct HTML/CSS reference studies with source screenshot links,
plus graph-paper and ruled-paper versions of the two preferred treatments.
Each design has an ID and an optional assignment note saved locally. These notes
are a design map for review; they do not apply styles to the game automatically.

## All game screens

Open [the live screen test](http://localhost:3142/dev/game-states.html) to see TV and phone pairs for connecting, waiting for players, writing, prompt sent, drawing, drawing sent, guessing, guess sent, and results. Each pair runs the actual bundles and builds its sample through public platform messages. Phone controls work normally. Reset a pair to restore its initial state; active examples reset after 90 seconds before the round timer expires. Results play normally and expose Restart Game once the reveal finishes.
