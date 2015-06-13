/**
 * Created by Pieterjan Lambrecht on 12/06/15.
 */


function WindowJS (options) {
    var that = this;
    if(options) {
        this.body = document.getElementsByTagName("body")[0];
        this._window = document.createElement("div");
        this._window.className = "windowjs-window";
        this._window.style.position = "absolute";
        if("title" in options) {
            this._title = document.createElement("div");
            this._title.className = "windowjs-title";
            this.title = document.createTextNode(options.title);
            this._title.appendChild(this.title);
            this._window.appendChild(this._title);
        }
        if("closeable" in options) {
            this._close = document.createElement("div");
            this._close.className = "windowjs-close";
            this.closeable = options.closeable;
            if("close_button" in options) {
                this._close.innerHTML = options.close_button;
            } else {
                this.close_button = document.createElement("span");
                this.close_button.appendChild(document.createTextNode("x"));
                this._close.appendChild(this.close_button);
            }
            this._close.onclick = function() {
                that.close();
            }
            this._window.appendChild(this._close);
        }
        if("draggable" in options) {
            this.draggable = options.draggable;
            this.attachDrag();
        }
        if("id" in options) {
            this._id = options.id;
        } else {
            this._id = "windowjs-" + (document.getElementsByClassName("windowjs-window").length + 1);
        }
        this._window.id = this._id;
        if("content" in options){
            this._body = document.createElement("div");
            this._body.className = "windowjs-body";
            this._body.innerHTML = options.content;
            this._window.appendChild(this._body);
        }
    } else {
        console.error("No options provided, skipping creation of window");
    }
}

WindowJS.prototype.close = function() {
    this._window.parentNode.removeChild(this._window);
}

WindowJS.prototype.show = function() {
    this.body.appendChild(this._window);
}

WindowJS.prototype.attachDrag = function() {
    var that = this;
    this._window.ondragstart = function() {
        return false;
    }
    this._title.onmousedown = function() {
        document.onmousemove = function(ev) {
            var pos = that._title.getBoundingClientRect();
            var x = (ev.clientX - that._title.clientHeight/2)+"px";
            var y = (ev.clientY - that._title.clientWidth/2)+"px";
            that._window.style.left = x;
            that._window.style.top = y;
        }
    }
    this._title.onmouseup = function() {
        document.onmousemove = null;
    }
}