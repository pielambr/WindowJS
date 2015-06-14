/**
 * Created by Pieterjan Lambrecht on 12/06/15.
 */

function WindowJS (options) {
    var that = this;
    if(options) {
        // Get a reference to body DOM element
        this.body = document.getElementsByTagName("body")[0];
        // Create outer window div
        this._window = this.createElement("article", "windowjs-window");
        this._window.style.position = "absolute";
        if("title" in options || "close_button" in options) {
            this._header = this.createElement("header", "windowjs-header");
            this.addToWindow(this._header);
        }
        // Add title div
        if("title" in options) {
            this._title = this.createElement("div", "windowjs-title", options.title);
            this.addToHeader(this._title);
        }
        // Add a close button and make closeable
        if("close_button" in options) {
            this._close = this.createElement("div", "windowjs-close", options.close_button);
            this._close.onclick = function() {
                that.close();
            }
            this.addToHeader(this._close);
        }
        // Make draggable if necessary
        if("draggable" in options && options.draggable === true) {
            this.draggable = options.draggable;
            this.attachDrag();
        }
        // Attach an id to the window
        if("id" in options) {
            this._id = options.id;
        } else {
            this._id = "windowjs-" + (document.getElementsByClassName("windowjs-window").length + 1);
        }
        this._window.id = this._id;
        // Add some main content to the window
        if("content" in options){
            this._body = this.createElement("main", "windowjs-body", options.content);
            this.addToWindow(this._body);
        }
        // Add a parent div for our window
        if("parent" in options) {
            this.parent = options.parent;
        } else {
            this.parent = this.body;
        }
    } else {
        // We need options to do something
        throw "No options provided, skipping creation of window";
    }
}

WindowJS.prototype.createElement = function(tag, className, html) {
    var el = document.createElement(tag);
    if(className) {
        el.className = className;
    }
    if(html) {
        el.innerHTML = html;
    }
    return el;
};

// Add a DOM element to our window
WindowJS.prototype.addToWindow = function(el) {
    this._window.appendChild(el);
};

WindowJS.prototype.addToHeader = function(el) {
    this._header.appendChild(el);
};

// Remove the window from the DOM
WindowJS.prototype.close = function() {
    this._window.parentNode.removeChild(this._window);
};

// Add the window to the DOM
WindowJS.prototype.show = function() {
    if(this.parent) {
        this.parent.appendChild(this._window);
    } else {
        throw "WindowJS instance has no valid parent div";
    }
};

// Add drag functionality, attached to the title div
WindowJS.prototype.attachDrag = function() {
    var that = this;
    this._window.ondragstart = function() {
        return false;
    };
    this._title.onmousedown = function() {
        document.onmousemove = function(ev) {
            var pos = that._title.getBoundingClientRect();
            var x = (ev.clientX - that._title.clientHeight/2)+"px";
            var y = (ev.clientY - that._title.clientWidth/2)+"px";
            that._window.style.left = x;
            that._window.style.top = y;
        }
    };
    this._title.onmouseup = function() {
        document.onmousemove = null;
    };
};