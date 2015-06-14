/**
 * Created by Pieterjan Lambrecht on 12/06/15.
 */

function WindowJS (options) {
    var that = this;
    if(options) {
        // Get a reference to body DOM element
        this.body = document.getElementsByTagName("body")[0];
        // Create outer window div
        this._window = this._createElement("article", "windowjs-window");
        this._window.style.position = "absolute";
        if("title" in options || "close_button" in options) {
            this._header = this._createElement("header", "windowjs-header");
            this._addToWindow(this._header);
        }
        // Add title div
        if("title" in options) {
            this._title = this._createElement("div", "windowjs-title", options.title);
            this._addToHeader(this._title);
        }
        // Add a close button and make closeable
        if("close_button" in options) {
            this._close = this._createElement("div", "windowjs-close", options.close_button);
            this._close.onclick = function() {
                that.close();
            };
            this._addToHeader(this._close);
        }
        // Make draggable if necessary
        if("draggable" in options && options.draggable === true) {
            this.draggable = options.draggable;
            this._attachDrag();
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
            this._body = this._createElement("main", "windowjs-body", options.content);
            this._addToWindow(this._body);
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

WindowJS.prototype._createElement = function(tag, className, html) {
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
WindowJS.prototype._addToWindow = function(el) {
    this._window.appendChild(el);
};

WindowJS.prototype._addToHeader = function(el) {
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
WindowJS.prototype._attachDrag = function() {
    var that = this;
    this._window.ondragstart = function() {
        return false;
    };
    this._title.onmousedown = function() {
        document.onmousemove = function(ev) {
            var x = (ev.clientX - that._title.clientHeight/2)+"px";
            var y = (ev.clientY - that._title.clientWidth/2)+"px";
            that._setPosition({top: x, left: y});
        };
    };
    this._title.onmouseup = function() {
        document.onmousemove = null;
    };
};

WindowJS.prototype._setPosition = function(position) {
    if("left" in position){
        this._window.style.left = position.left;
    }
    if("top" in position) {
        this._window.style.top = position.top;
    }
    if("bottom" in position) {
        this._window.style.bottom = position.bottom;
    }
    if("right" in position) {
        this._window.style.right = position.right;
    }
};

// Get height of window, including off screen pixels
WindowJS.prototype._getHeight = function() {
  return this._window.scrollHeight;
};

// Get width of window, including off screen pixels
WindowJS.prototype._getWidth = function() {
    return this._window.scrollWidth;
};

WindowJS.prototype._getPosition = function() {
    var pos = this._window.getBoundingClientRect();
    return {
        top: pos.top,
        left: pos.left,
        bottom: pos.bottom,
        right: pos.right
    };
};

WindowJS.prototype.below = function(other, spacing) {
    var top = other._getPosition().bottom + spacing;
    var left = other._getPosition().left;
    this._setPosition({top: top, left: left});
};

WindowJS.prototype.above = function(other, spacing) {
    var bottom = other._getPosition().top + spacing;
    var left = other._getPosition().left;
    this._setPosition({bottom: bottom, left: left});
};

WindowJS.prototype.leftOf = function(other, spacing) {
    var right = other._getPosition().left + spacing;
    var top = other._getPosition().top;
    this._setPosition({top: top, right: right});
};

WindowJS.prototype.rightOf = function(other, spacing) {
    var left = other._getPosition().right + spacing;
    var top = other._getPosition().top;
    this._setPosition({left: left, top: top});
};