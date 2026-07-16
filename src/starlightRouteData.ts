import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

// Drop the "On this page" table of contents on every route.
//
// These docs deliberately give the full page width to the content — especially
// the wide flowchart / sequence diagrams — rather than reserving a right-hand
// column for a ToC. Clearing `toc` at the route-data level (rather than only
// swapping the ToC component for an empty one) also removes Starlight's
// `data-has-toc` marker, so the layout no longer reserves — and then leaves
// blank — the old ToC column on the right. The freed width is handed to the
// content in src/styles/custom.css.
export const onRequest = defineRouteMiddleware((context) => {
  context.locals.starlightRoute.toc = undefined;
});
