# Event Driven

Helper functions for writing event driven systems.


## EventEmitter

Subscribe to and publish events.

#### on(eventName, handler) 

Subscribe an event handler




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| eventName | string | The name of the event | &nbsp; |
| handler | Function | The function to be executed when the event is emitted | &nbsp; |




##### Returns


- `Function`  Returns the handler for easy unsubscription



#### remove(eventName, handler) 

Unsubscribe an event handler




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| eventName | string | The name of the event | &nbsp; |
| handler | Function | The handler to be removed | &nbsp; |




##### Returns


- `Void`



#### emit(eventName, event) 

Publish an event




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| eventName | string | The name of the event | &nbsp; |
| event | Object | The parameter to pass to the event handlers | &nbsp; |




##### Returns


- `Void`


## Collection

A list that can have a handler(s) invoked any time the list is modified.




#### Collection(init) 

The collection constructor with an optional initial value parameter




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| init | Array<T> | An array to initialize the collection with | &nbsp; |




##### Returns


- `Collection<T>`  Returns the new collection



#### onCollectionChanged(handler) 

Subscribe an event handler to be called whenever the collection is modified




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| handler | Function | The collection changed handler | &nbsp; |




##### Returns


- `Function`  Returns a function that when executed will remove the collection changed handler



#### add(value) 

Add a value to the collection




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | T | The value to be added to the collection | &nbsp; |




##### Returns


- `Void`



#### remove(value) 

Remove the value from the collection




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | T | The value to be removed from the collection | &nbsp; |




##### Returns


- `Void`



#### toList() 

Returns a copy of the list in the form of an array






##### Returns


- `Array<T>`  A copy of the collection
