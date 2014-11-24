# Collection forms

XXX Still an experiment — but it's working.

```javascript
var myCollection = new Mongo.Collection("collection");
Mongo.Collection.forms({
  updateName: function(doc) {
    this.update(doc.id, {$set: doc.name});
  },
  star: function(docId) {
    this.update(docId, {$addToSet: {staredBy: Meteor.userId()}})
  }
});
```

```html
<template name="myCollectionUpdateNameForm">
</template>
<template name="myCollectionStarForm">
</template>
```

This will create an AutoForm wrapper for the two forms defined above and link
the form with the method.
