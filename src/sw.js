import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

export default function swCustom(params) {
  if (params.debug) {
    console.log('[Docusaurus-PWA][SW]: running swCustom code', params);
  }
  // Cache responses from external resources
  registerRoute(
    (context) =>
      [
        /jasonzhuang\.com\/img/,
      ].some((regex) => context.url.href.match(regex)),
    new StaleWhileRevalidate(),
  );
}