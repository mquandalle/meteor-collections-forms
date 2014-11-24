Package.describe({
  summary: "Define forms methods on your collections",
  version: "0.0.1",
  name: "mquandalle:collection-forms"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');
  api.use('meteor');
  api.use('underscore');
  api.use('mongo');
  api.use('aldeed:autoform@4.0.0');
  api.addFiles('collection-forms.js');
});
