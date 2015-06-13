# WindowJS
Simple library for draggable and closeable windows

## Instantiation
A new window is easily made, after including the library;
```javascript
var w = new WindowJS(options);
```

## Options
Options are passed as an associative array to our WindowJS constructor.
These are the options available to the window constructor
* title: adds a title to our window. This can be HTML (type: string)
* draggable: defines whether the window is draggable (type: boolean)
* close_button: defines whether or not the window is closeable.
Here you can pass a string or an HTML string, with the representation of your close button
* id: adds an id to the window div, otherwise a unique one gets generated
* content: main content of the window, this will usually be an HTML string
* parent: the parent div where the window should be appended into

## Showing the window
You can call the show method on the window;
```javascript
w.show();
```
This adds the window to the DOM structure

## Hiding the window
This removes the window;
```javascript
w.close();
```
This also removes the window from the DOM