var capitaliseFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var getMethodName = function(collection, relativeName) {
  return collection._name + "/" + relativeName;
};

var createAutoFormWrapper = function (collection, name) {
  var collectionName = collection._name;
  var baseName = collectionName + capitaliseFirstLetter(name);
  var autoFormName = baseName + "AutoForm";
  var formName = baseName + "Form";
  var methodName = getMethodName(collection, name);
  var schema = collection.simpleSchema();

  Template.__checkName(autoFormName);
  Template[autoFormName] = new Template("Template." + autoFormName, function() {
    var view = this;
    return Blaze._TemplateWith(function() {
      return {
        schema: Spacebars.call(schema),
        id: Spacebars.call(autoFormName),
        type: Spacebars.call("method"),
        meteormethod: Spacebars.call(methodName),
        doc: Spacebars.call(view.lookup("doc"))
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("autoForm"), function() {
        return Spacebars.include(view.lookupTemplate(formName));
      });
    });
  });
};

Mongo.Collection.prototype.forms = function(methods) {
  var self = this;
  var collectionName = self._name;
  var newMethods = {};
  _.each(methods, function(method, methodName) {
    var baseName = collectionName + capitaliseFirstLetter(methodName);
    var newName = getMethodName(self, methodName);
    var newMethod = function(/* arguments */) {
      self.method = this;
      method.apply(self, arguments);
    };
    newMethods[newName] = newMethod;

    if (Meteor.isClient && _.has(Template, baseName + "Form")) {
      createAutoFormWrapper(self, methodName);
    }
  });
  Meteor.methods(newMethods);
};

Mongo.Collection.prototype.call = function(methodName /*, arguments*/) {
  var self = this;
  var methodName = getMethodName(self, methodName);
  var args = _.toArray(arguments).slice(1);
  Meteor.apply(methodName, args);
};
