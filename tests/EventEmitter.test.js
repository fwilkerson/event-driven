const test = require('tape');
const sinon = require('sinon');

const { EventEmitter } = require('../dist');

test('event emmitter', t => {
  const ee = EventEmitter();

  const handler = sinon.spy();

  const handlerRef = ee.on('test_event', handler);

  const arg = {};

  ee.emit('test_event', arg);

  t.ok(handler.called, 'handler was called');
  t.ok(handler.calledWith(arg), 'event arg was passed in');

  ee.emit('second_event');

  t.ok(handler.callCount === 1, 'events are only triggering their handlers');

  ee.remove('test_event', handlerRef);

  ee.emit('test_event');

  t.ok(handler.callCount === 1, 'handler was removed');

  t.end();
});
