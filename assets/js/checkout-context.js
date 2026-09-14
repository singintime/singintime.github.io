// Tailors the checkout /success/ and /return/ pages to the plugin named in
// ?plugin=<slug>. Polar only substitutes {CHECKOUT_ID} into redirect URLs, so
// each plugin's Checkout Link carries its slug statically:
//   Success URL  https://singintime.github.io/success/?plugin=loko&checkout_id={CHECKOUT_ID}
//   Return URL   https://singintime.github.io/return/?plugin=loko
// Unknown or missing slugs keep the generic copy.
// `pricing` picks which [data-pricing] variant of the copy is shown.
(function () {
  var PLUGINS = {
    duono: { name: 'Duono', pricing: 'pwyw' },
    loko: { name: 'Loko', pricing: 'paid' },
    chambro: { name: 'Chambro', pricing: 'paid' }
  };

  var slug = new URLSearchParams(location.search).get('plugin');
  var plugin = slug && Object.prototype.hasOwnProperty.call(PLUGINS, slug) && PLUGINS[slug];
  if (!plugin) return;

  document.querySelectorAll('[data-pricing]').forEach(function (el) {
    el.hidden = el.getAttribute('data-pricing') !== plugin.pricing;
  });

  document.title = document.title.replace(' · ', ' — ' + plugin.name + ' · ');

  document.querySelectorAll('[data-plugin-name]').forEach(function (el) {
    el.textContent = plugin.name;
  });
  document.querySelectorAll('[data-plugin-for]').forEach(function (el) {
    el.textContent = ' for ' + plugin.name;
  });

  var back = document.querySelector('[data-plugin-back]');
  if (back) {
    var all = back.cloneNode(false);
    all.removeAttribute('data-plugin-back');
    all.className = 'btn btn-ghost';
    all.textContent = 'All plugins';
    back.href = '/plugins/' + slug + '/';
    back.textContent = 'Back to ' + plugin.name;
    back.after(all);
  }
})();
