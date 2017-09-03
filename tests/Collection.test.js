const test = require('tape');
const sinon = require('sinon');

const { Collection } = require('../dist');

test('observable collection', t => {
  const init = ['one'];
  const collection = Collection(init);

  t.deepEqual(init, collection.toList(), 'collection was initialized');
  t.notOk(init === collection.toList(), 'toList returns a clone');

  const dispose = collection.onCollectionChanged(e => {
    t.ok(e, 'onCollectionChanged was called with event param');
  });

  collection.add('two');

  dispose();

  t.equal(collection.toList().length, 2, 'value was added to the collection');

  collection.onCollectionChanged(e => {
    t.ok(e, `${e.type} - old: ${e.old.length}, new: ${e.new.length}`);
  });

  collection.remove('one');

  t.deepEqual(
    collection.toList(),
    ['two'],
    'value was removed from the collection'
  );

  const spy = sinon.spy();
  collection.onCollectionChanged(spy);

  const secondCollection = Collection();

  const secondSpy = sinon.spy();
  secondCollection.onCollectionChanged(secondSpy);

  secondCollection.add({ name: 'test' });

  t.ok(
    spy.callCount === 0 && secondSpy.callCount === 1,
    'collection changed events are per collection'
  );

  t.deepEqual(
    secondCollection.toList()[0],
    { name: 'test' },
    'can add complex types'
  );

  secondCollection.remove({ name: 'test' });

  t.ok(secondCollection.toList().length === 0, 'can remove complex types');

  t.end();
});
