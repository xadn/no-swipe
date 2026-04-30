# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`no-swipe` is a single-function npm package that prevents the browser's two-finger swipe-back/forward navigation gesture on trackpads. The entire library is `noSwipe.js` (~60 lines). Consumers attach it as a `wheel` event listener; it walks up the DOM from `e.target` and calls `e.preventDefault()` only when no ancestor in the wheel direction is actually scrollable.

The published package ships only `noSwipeJs` and `LICENSE_MIT` (see `files` in `package.json`). `index.html` is a demo page served from the `gh-pages` branch — it is not part of the npm artifact.

## Commands

- **Run tests (CI / one-shot):** `npm test` — runs Karma single-run in PhantomJS using `karma.conf.js`
- **Run tests (watch mode):** `./node_modules/.bin/karma start` — `singleRun: false` is the default in `karma.conf.js`, so this leaves the runner watching
- **Run in another browser:** `./node_modules/.bin/karma start --single-run --browsers Chrome` (Firefox/Chrome launchers are already in devDependencies)
- **No build / lint step exists** — the source is shipped as-is.

There is no test filter mechanism wired up; to run a single spec, temporarily change `it`/`describe` to `fit`/`fdescribe` in `noSwipeSpec.js` (Jasmine focused-spec syntax).

## Branch convention

The default branch is `gh-pages` (not `main`/`master`). Releases were historically tagged from this branch, and `index.html` is served from it as the demo site. Don't auto-rename or PR against a branch that doesn't exist.

## Architecture notes worth knowing before editing

- **Module export is wrapped in try/catch** (`noSwipe.js:64-66`) so the same file works as a CommonJS module *and* as a `<script>` tag that defines `noSwipe` as a global. Don't replace this with a bare `module.exports =` — it would break the demo page and any non-bundler consumer.
- **`computedStyle` is computed lazily** inside the loop and cached per-iteration. Keep that ordering: the cheap `scrollTop`/`scrollLeft`/`scrollHeight` checks gate the expensive `getComputedStyle` call, and this runs on every wheel event.
- **The function returns early (allowing native scroll) the moment it finds any scrollable ancestor in the wheel direction.** It only calls `preventDefault()` if it walks all the way to the document root without finding one. Tests in `noSwipeSpec.js` are organized around this contract — read them before changing the traversal logic.
- **Tests use a hand-rolled fake event** (`triggerWheelEvent` in `noSwipeSpec.js:146`), not real `WheelEvent` dispatch. Assertions check whether the spy `preventDefault` was called via the custom `toBePrevented` matcher.

## CI

`circle.yml` is fully commented out — there is no active CircleCI config. The README's CircleCI badge points at history. Publishing is manual (`npm version` / `npm publish`).
