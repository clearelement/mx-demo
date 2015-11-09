require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"FontFace":[function(require,module,exports){
exports.FontFace = (function() {
  var TEST, addFontFace, loadTestingFileError, missingArgumentError, removeTestLayer, testNewFace;

  TEST = {
    face: "monospace",
    text: "foo",
    time: .01,
    maxLoadAttempts: 50,
    hideErrorMessages: true
  };

  TEST.style = {
    width: "auto",
    fontSize: "150px",
    fontFamily: TEST.face
  };

  TEST.layer = new Layer({
    name: "FontFace Tester",
    width: 0,
    height: 1,
    maxX: -Screen.width,
    visible: false,
    html: TEST.text,
    style: TEST.style
  });

  function FontFace(options) {
    this.name = this.file = this.testLayer = this.isLoaded = this.loadFailed = this.loadAttempts = this.originalSize = this.hideErrors = null;
    if (options != null) {
      this.name = options.name || null;
      this.file = options.file || null;
    }
    if (!((this.name != null) && (this.file != null))) {
      return missingArgumentError();
    }
    this.testLayer = TEST.layer.copy();
    this.testLayer.style = TEST.style;
    this.testLayer.maxX = -Screen.width;
    this.testLayer.visible = true;
    this.isLoaded = false;
    this.loadFailed = false;
    this.loadAttempts = 0;
    this.hideErrors = options.hideErrors;
    return addFontFace(this.name, this.file, this);
  }

  addFontFace = function(name, file, object) {
    var faceCSS, styleTag;
    styleTag = document.createElement('style');
    faceCSS = document.createTextNode("@font-face { font-family: '" + name + "'; src: url('" + file + "') format('truetype'); }");
    styleTag.appendChild(faceCSS);
    document.head.appendChild(styleTag);
    return testNewFace(name, object);
  };

  removeTestLayer = function(object) {
    object.testLayer.destroy();
    return object.testLayer = null;
  };

  testNewFace = function(name, object) {
    var initialWidth, widthUpdate;
    initialWidth = object.testLayer._element.getBoundingClientRect().width;
    if (initialWidth === 0) {
      if (object.hideErrors === false || TEST.hideErrorMessages === false) {
        print("Load testing failed. Attempting again.");
      }
      return Utils.delay(TEST.time, function() {
        return testNewFace(name, object);
      });
    }
    object.loadAttempts++;
    if (object.originalSize === null) {
      object.originalSize = initialWidth;
      object.testLayer.style = {
        fontFamily: name + ", " + TEST.face
      };
    }
    widthUpdate = object.testLayer._element.getBoundingClientRect().width;
    if (object.originalSize === widthUpdate) {
      if (object.loadAttempts < TEST.maxLoadAttempts) {
        return Utils.delay(TEST.time, function() {
          return testNewFace(name, object);
        });
      }
      if (!object.hideErrors) {
        print("⚠️ Failed loading FontFace: " + name);
      }
      object.isLoaded = false;
      object.loadFailed = true;
      if (!object.hideErrors) {
        loadTestingFileError(object);
      }
      return;
    } else {
      if (!(object.hideErrors === false || TEST.hideErrorMessages)) {
        print("LOADED: " + name);
      }
      object.isLoaded = true;
      object.loadFailed = false;
    }
    removeTestLayer(object);
    return name;
  };

  missingArgumentError = function() {
    error(null);
    return console.error("Error: You must pass name & file properites when creating a new FontFace. \n\nExample: myFace = new FontFace name:\"Gotham\", file:\"gotham.ttf\" \n");
  };

  loadTestingFileError = function(object) {
    error(null);
    return console.error("Error: Couldn't detect the font: \"" + object.name + "\" and file: \"" + object.file + "\" was loaded.  \n\nEither the file couldn't be found or your browser doesn't support the file type that was provided. \n\nSuppress this message by adding \"hideErrors: true\" when creating a new FontFace. \n");
  };

  return FontFace;

})();


},{}],"SVGLayer":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.create = (function(superClass) {
  extend(create, superClass);

  function create(options) {
    var cName, d, domPath, footer, header, path, pathLength, svgPath, t;
    if (options == null) {
      options = {};
    }
    this.animatePath = bind(this.animatePath, this);
    options.strokeWidth;
    options.width = options.width + options.strokeWidth;
    options.height = options.height + options.strokeWidth;
    options.path;
    create.__super__.constructor.call(this, options);
    d = new Date();
    t = d.getTime();
    cName = "c" + t;
    header = "<svg class='" + cName + "' x='0px' y='0px' width='" + options.width + "' height='" + options.height + "' viewBox='-" + (options.strokeWidth / 2) + " -" + (options.strokeWidth / 2) + " " + (options.width + options.strokeWidth / 2) + " " + (options.height + options.strokeWidth / 2) + "'>";
    path = options.path;
    footer = "</svg>";
    svgPath = new Layer({
      html: header + path + footer,
      width: options.width,
      height: options.height,
      backgroundColor: "transparent"
    });
    domPath = document.querySelector('.' + cName + ' path');
    pathLength = domPath.getTotalLength();
    svgPath.destroy();
    this.html = header + path + footer;
    this.backgroundColor = "transparent";
    this.width = options.width;
    this.height = options.height;
    this.perspective = 0;
    this.direction = "forward";
    this.style = {
      "fill": "transparent",
      "stroke": "#32A2E6",
      "stroke-linecap": "round",
      "stroke-width": options.strokeWidth,
      "stroke-dasharray": pathLength,
      "stroke-dashoffset": 0
    };
    this.pathLength = pathLength;
    this.states.add({
      forward: {
        perspective: 1
      }
    });
    this.states.animationOptions = {
      curve: "ease-out",
      time: 1
    };
    this.on("change:perspective", function() {
      var dashOffset;
      if (this.direction === "forward") {
        dashOffset = Utils.modulate(this.perspective, [0, 1], [pathLength, 0]);
        return this.style['stroke-dashoffset'] = dashOffset;
      } else if (this.direction === "backward") {
        dashOffset = Utils.modulate(this.perspective, [0, 1], [pathLength, pathLength * 2]);
        return this.style['stroke-dashoffset'] = dashOffset;
      }
    });
  }

  create.prototype.animatePath = function(options) {
    if (options == null) {
      options = {};
    }
    if (options.direction == null) {
      options.direction = "forward";
    }
    if (options.curve == null) {
      options.curve = "ease-out";
    }
    if (options.time == null) {
      options.time = 1;
    }
    this.states.animationOptions = {
      curve: options.curve,
      time: options.time
    };
    this.direction = options.direction;
    return this.states.next();
  };

  return create;

})(Layer);


},{}],"TextLayer":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (function(superClass) {
  extend(exports, superClass);

  function exports(options) {
    if (options == null) {
      options = {};
    }
    this.doAutoSize = false;
    this.doAutoSizeHeight = false;
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "hsla(60, 90%, 47%, .4)" : "transparent";
    }
    if (options.color == null) {
      options.color = "red";
    }
    if (options.lineHeight == null) {
      options.lineHeight = 1.25;
    }
    if (options.fontFamily == null) {
      options.fontFamily = "Helvetica";
    }
    if (options.fontSize == null) {
      options.fontSize = 20;
    }
    if (options.text == null) {
      options.text = "Use layer.text to add text";
    }
    exports.__super__.constructor.call(this, options);
    this.style.whiteSpace = "pre-line";
  }

  exports.prototype.setStyle = function(property, value, pxSuffix) {
    if (pxSuffix == null) {
      pxSuffix = false;
    }
    this.style[property] = pxSuffix ? value + "px" : value;
    this.emit("change:" + property, value);
    if (this.doAutoSize) {
      return this.calcSize();
    }
  };

  exports.prototype.calcSize = function() {
    var constraints, size, sizeAffectingStyles;
    sizeAffectingStyles = {
      lineHeight: this.style["line-height"],
      fontSize: this.style["font-size"],
      fontWeight: this.style["font-weight"],
      paddingTop: this.style["padding-top"],
      paddingRight: this.style["padding-right"],
      paddingBottom: this.style["padding-bottom"],
      paddingLeft: this.style["padding-left"],
      textTransform: this.style["text-transform"],
      borderWidth: this.style["border-width"],
      letterSpacing: this.style["letter-spacing"],
      fontFamily: this.style["font-family"],
      fontStyle: this.style["font-style"],
      fontVariant: this.style["font-variant"]
    };
    constraints = {};
    if (this.doAutoSizeHeight) {
      constraints.width = this.width;
    }
    size = Utils.textSize(this.text, sizeAffectingStyles, constraints);
    if (this.style.textAlign === "right") {
      this.width = size.width;
      this.x = this.x - this.width;
    } else {
      this.width = size.width;
    }
    return this.height = size.height;
  };

  exports.define("autoSize", {
    get: function() {
      return this.doAutoSize;
    },
    set: function(value) {
      this.doAutoSize = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  exports.define("autoSizeHeight", {
    set: function(value) {
      this.doAutoSize = value;
      this.doAutoSizeHeight = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  exports.define("contentEditable", {
    set: function(boolean) {
      this._element.contentEditable = boolean;
      this.ignoreEvents = !boolean;
      return this.on("input", function() {
        if (this.doAutoSize) {
          return this.calcSize();
        }
      });
    }
  });

  exports.define("text", {
    get: function() {
      return this._element.textContent;
    },
    set: function(value) {
      this._element.textContent = value;
      this.emit("change:text", value);
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  exports.define("fontFamily", {
    get: function() {
      return this.style.fontFamily;
    },
    set: function(value) {
      return this.setStyle("fontFamily", value);
    }
  });

  exports.define("fontSize", {
    get: function() {
      return this.style.fontSize.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("fontSize", value, true);
    }
  });

  exports.define("lineHeight", {
    get: function() {
      return this.style.lineHeight;
    },
    set: function(value) {
      return this.setStyle("lineHeight", value);
    }
  });

  exports.define("fontWeight", {
    get: function() {
      return this.style.fontWeight;
    },
    set: function(value) {
      return this.setStyle("fontWeight", value);
    }
  });

  exports.define("fontStyle", {
    get: function() {
      return this.style.fontStyle;
    },
    set: function(value) {
      return this.setStyle("fontStyle", value);
    }
  });

  exports.define("fontVariant", {
    get: function() {
      return this.style.fontVariant;
    },
    set: function(value) {
      return this.setStyle("fontVariant", value);
    }
  });

  exports.define("padding", {
    set: function(value) {
      this.setStyle("paddingTop", value, true);
      this.setStyle("paddingRight", value, true);
      this.setStyle("paddingBottom", value, true);
      return this.setStyle("paddingLeft", value, true);
    }
  });

  exports.define("paddingTop", {
    get: function() {
      return this.style.paddingTop.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingTop", value, true);
    }
  });

  exports.define("paddingRight", {
    get: function() {
      return this.style.paddingRight.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingRight", value, true);
    }
  });

  exports.define("paddingBottom", {
    get: function() {
      return this.style.paddingBottom.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingBottom", value, true);
    }
  });

  exports.define("paddingLeft", {
    get: function() {
      return this.style.paddingLeft.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingLeft", value, true);
    }
  });

  exports.define("textAlign", {
    set: function(value) {
      return this.setStyle("textAlign", value);
    }
  });

  exports.define("textTransform", {
    get: function() {
      return this.style.textTransform;
    },
    set: function(value) {
      return this.setStyle("textTransform", value);
    }
  });

  exports.define("letterSpacing", {
    get: function() {
      return this.style.letterSpacing.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("letterSpacing", value, true);
    }
  });

  exports.define("length", {
    get: function() {
      return this.text.length;
    }
  });

  return exports;

})(Layer);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGF2ZWNyb3cvQm94IFN5bmMvTVggUHJvZHVjdCBEZXNpZ24vQ3VzdG9tL01vbmV5R3VpZGUgUHJvL1Byb3RvdHlwZS9tb25leUd1aWRlUHJvLmZyYW1lci9tb2R1bGVzL0ZvbnRGYWNlLmNvZmZlZSIsIi9Vc2Vycy9kYXZlY3Jvdy9Cb3ggU3luYy9NWCBQcm9kdWN0IERlc2lnbi9DdXN0b20vTW9uZXlHdWlkZSBQcm8vUHJvdG90eXBlL21vbmV5R3VpZGVQcm8uZnJhbWVyL21vZHVsZXMvU1ZHTGF5ZXIuY29mZmVlIiwiL1VzZXJzL2RhdmVjcm93L0JveCBTeW5jL01YIFByb2R1Y3QgRGVzaWduL0N1c3RvbS9Nb25leUd1aWRlIFByby9Qcm90b3R5cGUvbW9uZXlHdWlkZVByby5mcmFtZXIvbW9kdWxlcy9UZXh0TGF5ZXIuY29mZmVlIiwiL1VzZXJzL2RhdmVjcm93L0JveCBTeW5jL01YIFByb2R1Y3QgRGVzaWduL0N1c3RvbS9Nb25leUd1aWRlIFByby9Qcm90b3R5cGUvbW9uZXlHdWlkZVByby5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNvQk0sT0FBTyxDQUFDO0FBRWIsTUFBQTs7RUFBQSxJQUFBLEdBQ0M7SUFBQSxJQUFBLEVBQU0sV0FBTjtJQUNBLElBQUEsRUFBTSxLQUROO0lBRUEsSUFBQSxFQUFNLEdBRk47SUFHQSxlQUFBLEVBQWlCLEVBSGpCO0lBSUEsaUJBQUEsRUFBbUIsSUFKbkI7OztFQU1ELElBQUksQ0FBQyxLQUFMLEdBQ0M7SUFBQSxLQUFBLEVBQU8sTUFBUDtJQUNBLFFBQUEsRUFBVSxPQURWO0lBRUEsVUFBQSxFQUFZLElBQUksQ0FBQyxJQUZqQjs7O0VBSUQsSUFBSSxDQUFDLEtBQUwsR0FBaUIsSUFBQSxLQUFBLENBQ2hCO0lBQUEs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dW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgQ3JlYXRlZCBieSBKb3JkYW4gUm9iZXJ0IERvYnNvbiBvbiAwNSBPY3RvYmVyIDIwMTVcbiMgXG4jIFVzZSB0byBhZGQgZm9udCBmaWxlcyBhbmQgcmVmZXJlbmNlIHRoZW0gaW4geW91ciBDU1Mgc3R5bGUgc2V0dGluZ3MuXG4jXG4jIFRvIEdldCBTdGFydGVkLi4uXG4jXG4jIDEuIFBsYWNlIHRoZSBGb250RmFjZS5jb2ZmZWUgZmlsZSBpbiBGcmFtZXIgU3R1ZGlvIG1vZHVsZXMgZGlyZWN0b3J5XG4jXG4jIDIuIEluIHlvdXIgcHJvamVjdCBpbmNsdWRlOlxuIyAgICAge0ZvbnRGYWNlfSA9IHJlcXVpcmUgXCJGb250RmFjZVwiXG4jXG4jIDMuIFRvIGFkZCBhIGZvbnQgZmFjZTogXG4jICAgICBnb3RoYW0gPSBuZXcgRm9udEZhY2UgbmFtZTogXCJHb3RoYW1cIiwgZmlsZTogXCJHb3RoYW0udHRmXCJcbiMgXG4jIDQuIEl0IGNoZWNrcyB0aGF0IHRoZSBmb250IHdhcyBsb2FkZWQuIEVycm9ycyBjYW4gYmUgc3VwcHJlc3NlZCBsaWtlIHNvLi4uXG4jICAgIGdvdGhhbSA9IG5ldyBGb250RmFjZSBuYW1lOiBcIkdvdGhhbVwiLCBmaWxlOiBcIkdvdGhhbS50dGZcIiwgaGlkZUVycm9yczogdHJ1ZSBcbiNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmNsYXNzIGV4cG9ydHMuRm9udEZhY2VcblxuXHRURVNUID1cblx0XHRmYWNlOiBcIm1vbm9zcGFjZVwiXG5cdFx0dGV4dDogXCJmb29cIlxuXHRcdHRpbWU6IC4wMVxuXHRcdG1heExvYWRBdHRlbXB0czogNTBcblx0XHRoaWRlRXJyb3JNZXNzYWdlczogdHJ1ZVxuXHRcdFxuXHRURVNULnN0eWxlID0gXG5cdFx0d2lkdGg6IFwiYXV0b1wiXG5cdFx0Zm9udFNpemU6IFwiMTUwcHhcIlxuXHRcdGZvbnRGYW1pbHk6IFRFU1QuZmFjZVxuXHRcdFxuXHRURVNULmxheWVyID0gbmV3IExheWVyXG5cdFx0bmFtZTpcIkZvbnRGYWNlIFRlc3RlclwiXG5cdFx0d2lkdGg6IDBcblx0XHRoZWlnaHQ6IDFcblx0XHRtYXhYOiAtKFNjcmVlbi53aWR0aClcblx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdGh0bWw6IFRFU1QudGV4dFxuXHRcdHN0eWxlOiBURVNULnN0eWxlXG5cdFx0XG5cdFxuXHQjIFNFVFVQIEZPUiBFVkVSWSBJTlNUQU5DRVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cdFxuXHRcdEBuYW1lID0gQGZpbGUgPSBAdGVzdExheWVyID0gQGlzTG9hZGVkID0gQGxvYWRGYWlsZWQgPSBAbG9hZEF0dGVtcHRzID0gQG9yaWdpbmFsU2l6ZSA9IEBoaWRlRXJyb3JzID0gIG51bGxcblx0XHRcblx0XHRpZiBvcHRpb25zP1xuXHRcdFx0QG5hbWUgPSBvcHRpb25zLm5hbWUgfHwgbnVsbFxuXHRcdFx0QGZpbGUgPSBvcHRpb25zLmZpbGUgfHwgbnVsbFxuXHRcdFxuXHRcdHJldHVybiBtaXNzaW5nQXJndW1lbnRFcnJvcigpIHVubGVzcyBAbmFtZT8gYW5kIEBmaWxlP1xuXHRcdFxuXHRcdEB0ZXN0TGF5ZXIgICAgICAgICA9IFRFU1QubGF5ZXIuY29weSgpXG5cdFx0QHRlc3RMYXllci5zdHlsZSAgID0gVEVTVC5zdHlsZVxuXHRcdEB0ZXN0TGF5ZXIubWF4WCAgICA9IC0oU2NyZWVuLndpZHRoKVxuXHRcdEB0ZXN0TGF5ZXIudmlzaWJsZSA9IHRydWVcblx0XHRcblx0XHRAaXNMb2FkZWQgICAgID0gZmFsc2Vcblx0XHRAbG9hZEZhaWxlZCAgID0gZmFsc2Vcblx0XHRAbG9hZEF0dGVtcHRzID0gMFxuXHRcdEBoaWRlRXJyb3JzICAgPSBvcHRpb25zLmhpZGVFcnJvcnNcblxuXHRcdHJldHVybiBhZGRGb250RmFjZSBAbmFtZSwgQGZpbGUsIEBcblx0XHRcblx0IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cdCMgUHJpdmF0ZSBIZWxwZXIgTWV0aG9kcyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXHRcdFxuXHRhZGRGb250RmFjZSA9IChuYW1lLCBmaWxlLCBvYmplY3QpIC0+XG5cdFx0IyBDcmVhdGUgb3VyIEVsZW1lbnQgJiBOb2RlXG5cdFx0c3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdzdHlsZSdcblx0XHRmYWNlQ1NTICA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlIFwiQGZvbnQtZmFjZSB7IGZvbnQtZmFtaWx5OiAnI3tuYW1lfSc7IHNyYzogdXJsKCcje2ZpbGV9JykgZm9ybWF0KCd0cnVldHlwZScpOyB9XCJcblx0XHQjIEFkZCB0aGUgRWxlbWVudCAmIE5vZGUgdG8gdGhlIGRvY3VtZW50XG5cdFx0c3R5bGVUYWcuYXBwZW5kQ2hpbGQgZmFjZUNTU1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQgc3R5bGVUYWdcblx0XHQjIFRlc3Qgb3V0IHRoZSBGYXN0IHRvIHNlZSBpZiBpdCBjaGFuZ2VkXG5cdFx0dGVzdE5ld0ZhY2UgbmFtZSwgb2JqZWN0XG5cdFx0XG5cdCMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXHRcdFxuXHRyZW1vdmVUZXN0TGF5ZXIgPSAob2JqZWN0KSAtPlxuXHRcdG9iamVjdC50ZXN0TGF5ZXIuZGVzdHJveSgpXG5cdFx0b2JqZWN0LnRlc3RMYXllciA9IG51bGxcblx0XHRcblx0IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cdFx0XG5cdHRlc3ROZXdGYWNlID0gKG5hbWUsIG9iamVjdCkgLT5cblx0XHRcblx0XHRpbml0aWFsV2lkdGggPSBvYmplY3QudGVzdExheWVyLl9lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG5cdFx0XG5cdFx0IyBDaGVjayB0byBzZWUgaWYgaXQncyByZWFkeSB5ZXRcblx0XHRpZiBpbml0aWFsV2lkdGggaXMgMFxuXHRcdFx0aWYgb2JqZWN0LmhpZGVFcnJvcnMgaXMgZmFsc2Ugb3IgVEVTVC5oaWRlRXJyb3JNZXNzYWdlcyBpcyBmYWxzZVxuXHRcdFx0XHRwcmludCBcIkxvYWQgdGVzdGluZyBmYWlsZWQuIEF0dGVtcHRpbmcgYWdhaW4uXCJcblx0XHRcdHJldHVybiBVdGlscy5kZWxheSBURVNULnRpbWUsIC0+IHRlc3ROZXdGYWNlIG5hbWUsIG9iamVjdFxuXHRcdFxuXHRcdG9iamVjdC5sb2FkQXR0ZW1wdHMrK1xuXHRcdFxuXHRcdGlmIG9iamVjdC5vcmlnaW5hbFNpemUgaXMgbnVsbFxuXHRcdFx0b2JqZWN0Lm9yaWdpbmFsU2l6ZSA9IGluaXRpYWxXaWR0aFxuXHRcdFx0b2JqZWN0LnRlc3RMYXllci5zdHlsZSA9IGZvbnRGYW1pbHk6IFwiI3tuYW1lfSwgI3tURVNULmZhY2V9XCJcblx0XHRcblx0XHR3aWR0aFVwZGF0ZSA9IG9iamVjdC50ZXN0TGF5ZXIuX2VsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcblxuXHRcdGlmIG9iamVjdC5vcmlnaW5hbFNpemUgaXMgd2lkdGhVcGRhdGVcblx0XHRcdCMgSWYgd2UgY2FuIGF0dGVtcHQgdG8gY2hlY2sgYWdhaW4uLi4gRG8gaXRcblx0XHRcdGlmIG9iamVjdC5sb2FkQXR0ZW1wdHMgPCBURVNULm1heExvYWRBdHRlbXB0c1xuXHRcdFx0XHRyZXR1cm4gVXRpbHMuZGVsYXkgVEVTVC50aW1lLCAtPiB0ZXN0TmV3RmFjZSBuYW1lLCBvYmplY3Rcblx0XHRcdFx0XG5cdFx0XHRwcmludCBcIuKaoO+4jyBGYWlsZWQgbG9hZGluZyBGb250RmFjZTogI3tuYW1lfVwiIHVubGVzcyBvYmplY3QuaGlkZUVycm9yc1xuXHRcdFx0b2JqZWN0LmlzTG9hZGVkICAgPSBmYWxzZVxuXHRcdFx0b2JqZWN0LmxvYWRGYWlsZWQgPSB0cnVlXG5cdFx0XHRsb2FkVGVzdGluZ0ZpbGVFcnJvciBvYmplY3QgdW5sZXNzIG9iamVjdC5oaWRlRXJyb3JzXG5cdFx0XHRyZXR1cm5cblx0XHRcdFxuXHRcdGVsc2Vcblx0XHRcdHByaW50IFwiTE9BREVEOiAje25hbWV9XCIgdW5sZXNzIG9iamVjdC5oaWRlRXJyb3JzIGlzIGZhbHNlIG9yIFRFU1QuaGlkZUVycm9yTWVzc2FnZXNcblx0XHRcdG9iamVjdC5pc0xvYWRlZCAgID0gdHJ1ZVxuXHRcdFx0b2JqZWN0LmxvYWRGYWlsZWQgPSBmYWxzZVxuXG5cdFx0cmVtb3ZlVGVzdExheWVyIG9iamVjdFxuXHRcdHJldHVybiBuYW1lXG5cblx0IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cdCMgRXJyb3IgSGFuZGxlciBNZXRob2RzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5cdG1pc3NpbmdBcmd1bWVudEVycm9yID0gLT5cblx0XHRlcnJvciBudWxsXG5cdFx0Y29uc29sZS5lcnJvciBcIlwiXCJcblx0XHRcdEVycm9yOiBZb3UgbXVzdCBwYXNzIG5hbWUgJiBmaWxlIHByb3Blcml0ZXMgd2hlbiBjcmVhdGluZyBhIG5ldyBGb250RmFjZS4gXFxuXG5cdFx0XHRFeGFtcGxlOiBteUZhY2UgPSBuZXcgRm9udEZhY2UgbmFtZTpcXFwiR290aGFtXFxcIiwgZmlsZTpcXFwiZ290aGFtLnR0ZlxcXCIgXFxuXCJcIlwiXG5cdFx0XHRcblx0bG9hZFRlc3RpbmdGaWxlRXJyb3IgPSAob2JqZWN0KSAtPlxuXHRcdGVycm9yIG51bGxcblx0XHRjb25zb2xlLmVycm9yIFwiXCJcIlxuXHRcdFx0RXJyb3I6IENvdWxkbid0IGRldGVjdCB0aGUgZm9udDogXFxcIiN7b2JqZWN0Lm5hbWV9XFxcIiBhbmQgZmlsZTogXFxcIiN7b2JqZWN0LmZpbGV9XFxcIiB3YXMgbG9hZGVkLiAgXFxuXG5cdFx0XHRFaXRoZXIgdGhlIGZpbGUgY291bGRuJ3QgYmUgZm91bmQgb3IgeW91ciBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCB0aGUgZmlsZSB0eXBlIHRoYXQgd2FzIHByb3ZpZGVkLiBcXG5cblx0XHRcdFN1cHByZXNzIHRoaXMgbWVzc2FnZSBieSBhZGRpbmcgXFxcImhpZGVFcnJvcnM6IHRydWVcXFwiIHdoZW4gY3JlYXRpbmcgYSBuZXcgRm9udEZhY2UuIFxcblwiXCJcIlxuIiwiY2xhc3MgZXhwb3J0cy5jcmVhdGUgZXh0ZW5kcyBMYXllclxuXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMuc3Ryb2tlV2lkdGhcblx0XHRvcHRpb25zLndpZHRoID0gb3B0aW9ucy53aWR0aCArIG9wdGlvbnMuc3Ryb2tlV2lkdGhcblx0XHRvcHRpb25zLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0ICsgb3B0aW9ucy5zdHJva2VXaWR0aFxuXHRcdG9wdGlvbnMucGF0aFxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdCNIVE1MIGZvciB0aGUgU1ZHIERPTSBlbGVtZW50LCBuZWVkIHVuaXF1ZSBjbGFzcyBuYW1lc1xuXHRcdGQgPSBuZXcgRGF0ZSgpXG5cdFx0dCA9IGQuZ2V0VGltZSgpXG5cdFx0Y05hbWUgPSBcImNcIiArIHRcblx0XHRoZWFkZXIgPSBcIjxzdmcgY2xhc3M9JyN7Y05hbWV9JyB4PScwcHgnIHk9JzBweCcgd2lkdGg9JyN7b3B0aW9ucy53aWR0aH0nIGhlaWdodD0nI3tvcHRpb25zLmhlaWdodH0nIHZpZXdCb3g9Jy0je29wdGlvbnMuc3Ryb2tlV2lkdGgvMn0gLSN7b3B0aW9ucy5zdHJva2VXaWR0aC8yfSAje29wdGlvbnMud2lkdGggKyBvcHRpb25zLnN0cm9rZVdpZHRoLzJ9ICN7b3B0aW9ucy5oZWlnaHQgKyBvcHRpb25zLnN0cm9rZVdpZHRoLzJ9Jz5cIlxuXHRcdHBhdGggPSBvcHRpb25zLnBhdGhcblx0XHRmb290ZXIgPSBcIjwvc3ZnPlwiXG5cblx0XHQjSGFjayB0byBnZXQgcGF0aExlbmd0aCBiZWZvcmUgY29uc3RydWN0aW9uXG5cdFx0c3ZnUGF0aCA9IG5ldyBMYXllclxuXHRcdFx0aHRtbCA6IGhlYWRlciArIHBhdGggKyBmb290ZXJcblx0XHRcdHdpZHRoIDogb3B0aW9ucy53aWR0aFxuXHRcdFx0aGVpZ2h0IDogb3B0aW9ucy5oZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0ZG9tUGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nK2NOYW1lKycgcGF0aCcpXG5cdFx0cGF0aExlbmd0aCA9IGRvbVBhdGguZ2V0VG90YWxMZW5ndGgoKVxuXHRcdHN2Z1BhdGguZGVzdHJveSgpXG5cblx0XHRAaHRtbCA9IGhlYWRlciArIHBhdGggKyBmb290ZXJcblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0QHdpZHRoID0gb3B0aW9ucy53aWR0aFxuXHRcdEBoZWlnaHQgPSBvcHRpb25zLmhlaWdodFxuXHRcdEBwZXJzcGVjdGl2ZSA9IDBcblx0XHRAZGlyZWN0aW9uID0gXCJmb3J3YXJkXCJcblx0XHRAc3R5bGUgPSB7XCJmaWxsXCI6XCJ0cmFuc3BhcmVudFwiO1wic3Ryb2tlXCI6XCIjMzJBMkU2XCI7XCJzdHJva2UtbGluZWNhcFwiOlwicm91bmRcIjtcInN0cm9rZS13aWR0aFwiOm9wdGlvbnMuc3Ryb2tlV2lkdGg7XCJzdHJva2UtZGFzaGFycmF5XCI6cGF0aExlbmd0aDtcInN0cm9rZS1kYXNob2Zmc2V0XCI6MH1cblx0XHRAcGF0aExlbmd0aCA9IHBhdGhMZW5ndGhcblxuXHRcdCNBbmltYXRpb24gTWFnaWNcblx0XHRAc3RhdGVzLmFkZFxuXHRcdFx0Zm9yd2FyZDpcblx0XHRcdFx0cGVyc3BlY3RpdmU6IDFcblx0XHRAc3RhdGVzLmFuaW1hdGlvbk9wdGlvbnMgPSBcblx0XHRcdGN1cnZlOlwiZWFzZS1vdXRcIlxuXHRcdFx0dGltZTogMVxuXHRcdEAub24gXCJjaGFuZ2U6cGVyc3BlY3RpdmVcIiwgLT5cblx0XHRcdGlmIEBkaXJlY3Rpb24gPT0gXCJmb3J3YXJkXCJcblx0XHRcdFx0ZGFzaE9mZnNldCA9IFV0aWxzLm1vZHVsYXRlKEAucGVyc3BlY3RpdmUsIFswLCAxXSwgW3BhdGhMZW5ndGgsIDBdKVxuXHRcdFx0XHRALnN0eWxlWydzdHJva2UtZGFzaG9mZnNldCddID0gZGFzaE9mZnNldFxuXHRcdFx0ZWxzZSBpZiBAZGlyZWN0aW9uID09IFwiYmFja3dhcmRcIlxuXHRcdFx0XHRkYXNoT2Zmc2V0ID0gVXRpbHMubW9kdWxhdGUoQC5wZXJzcGVjdGl2ZSwgWzAsIDFdLCBbcGF0aExlbmd0aCwgcGF0aExlbmd0aCoyXSlcblx0XHRcdFx0QC5zdHlsZVsnc3Ryb2tlLWRhc2hvZmZzZXQnXSA9IGRhc2hPZmZzZXRcblxuXHRhbmltYXRlUGF0aDogKG9wdGlvbnM9e30pID0+XG5cdFx0b3B0aW9ucy5kaXJlY3Rpb24gPz0gXCJmb3J3YXJkXCJcblx0XHRvcHRpb25zLmN1cnZlID89IFwiZWFzZS1vdXRcIlxuXHRcdG9wdGlvbnMudGltZSA/PSAxXG5cdFx0QHN0YXRlcy5hbmltYXRpb25PcHRpb25zID0gXG5cdFx0XHRjdXJ2ZTogb3B0aW9ucy5jdXJ2ZVxuXHRcdFx0dGltZTogb3B0aW9ucy50aW1lXG5cdFx0QGRpcmVjdGlvbiA9IG9wdGlvbnMuZGlyZWN0aW9uXG5cdFx0QHN0YXRlcy5uZXh0KClcbiIsImNsYXNzIG1vZHVsZS5leHBvcnRzIGV4dGVuZHMgTGF5ZXJcblx0XHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zPXt9KSAtPlxuXHRcdEBkb0F1dG9TaXplID0gZmFsc2Vcblx0XHRAZG9BdXRvU2l6ZUhlaWdodCA9IGZhbHNlXG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPz0gaWYgb3B0aW9ucy5zZXR1cCB0aGVuIFwiaHNsYSg2MCwgOTAlLCA0NyUsIC40KVwiIGVsc2UgXCJ0cmFuc3BhcmVudFwiXG5cdFx0b3B0aW9ucy5jb2xvciA/PSBcInJlZFwiXG5cdFx0b3B0aW9ucy5saW5lSGVpZ2h0ID89IDEuMjVcblx0XHRvcHRpb25zLmZvbnRGYW1pbHkgPz0gXCJIZWx2ZXRpY2FcIlxuXHRcdG9wdGlvbnMuZm9udFNpemUgPz0gMjBcblx0XHRvcHRpb25zLnRleHQgPz0gXCJVc2UgbGF5ZXIudGV4dCB0byBhZGQgdGV4dFwiXG5cdFx0c3VwZXIgb3B0aW9uc1xuXHRcdEBzdHlsZS53aGl0ZVNwYWNlID0gXCJwcmUtbGluZVwiICMgYWxsb3cgXFxuIGluIC50ZXh0XG5cdFx0XG5cdHNldFN0eWxlOiAocHJvcGVydHksIHZhbHVlLCBweFN1ZmZpeCA9IGZhbHNlKSAtPlxuXHRcdEBzdHlsZVtwcm9wZXJ0eV0gPSBpZiBweFN1ZmZpeCB0aGVuIHZhbHVlK1wicHhcIiBlbHNlIHZhbHVlXG5cdFx0QGVtaXQoXCJjaGFuZ2U6I3twcm9wZXJ0eX1cIiwgdmFsdWUpXG5cdFx0aWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuXHRcdFxuXHRjYWxjU2l6ZTogLT5cblx0XHRzaXplQWZmZWN0aW5nU3R5bGVzID1cblx0XHRcdGxpbmVIZWlnaHQ6IEBzdHlsZVtcImxpbmUtaGVpZ2h0XCJdXG5cdFx0XHRmb250U2l6ZTogQHN0eWxlW1wiZm9udC1zaXplXCJdXG5cdFx0XHRmb250V2VpZ2h0OiBAc3R5bGVbXCJmb250LXdlaWdodFwiXVxuXHRcdFx0cGFkZGluZ1RvcDogQHN0eWxlW1wicGFkZGluZy10b3BcIl1cblx0XHRcdHBhZGRpbmdSaWdodDogQHN0eWxlW1wicGFkZGluZy1yaWdodFwiXVxuXHRcdFx0cGFkZGluZ0JvdHRvbTogQHN0eWxlW1wicGFkZGluZy1ib3R0b21cIl1cblx0XHRcdHBhZGRpbmdMZWZ0OiBAc3R5bGVbXCJwYWRkaW5nLWxlZnRcIl1cblx0XHRcdHRleHRUcmFuc2Zvcm06IEBzdHlsZVtcInRleHQtdHJhbnNmb3JtXCJdXG5cdFx0XHRib3JkZXJXaWR0aDogQHN0eWxlW1wiYm9yZGVyLXdpZHRoXCJdXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiBAc3R5bGVbXCJsZXR0ZXItc3BhY2luZ1wiXVxuXHRcdFx0Zm9udEZhbWlseTogQHN0eWxlW1wiZm9udC1mYW1pbHlcIl1cblx0XHRcdGZvbnRTdHlsZTogQHN0eWxlW1wiZm9udC1zdHlsZVwiXVxuXHRcdFx0Zm9udFZhcmlhbnQ6IEBzdHlsZVtcImZvbnQtdmFyaWFudFwiXVxuXHRcdGNvbnN0cmFpbnRzID0ge31cblx0XHRpZiBAZG9BdXRvU2l6ZUhlaWdodCB0aGVuIGNvbnN0cmFpbnRzLndpZHRoID0gQHdpZHRoXG5cdFx0c2l6ZSA9IFV0aWxzLnRleHRTaXplIEB0ZXh0LCBzaXplQWZmZWN0aW5nU3R5bGVzLCBjb25zdHJhaW50c1xuXHRcdGlmIEBzdHlsZS50ZXh0QWxpZ24gaXMgXCJyaWdodFwiXG5cdFx0XHRAd2lkdGggPSBzaXplLndpZHRoXG5cdFx0XHRAeCA9IEB4LUB3aWR0aFxuXHRcdGVsc2Vcblx0XHRcdEB3aWR0aCA9IHNpemUud2lkdGhcblx0XHRAaGVpZ2h0ID0gc2l6ZS5oZWlnaHRcblxuXHRAZGVmaW5lIFwiYXV0b1NpemVcIixcblx0XHRnZXQ6IC0+IEBkb0F1dG9TaXplXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QGRvQXV0b1NpemUgPSB2YWx1ZVxuXHRcdFx0aWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuXHRAZGVmaW5lIFwiYXV0b1NpemVIZWlnaHRcIixcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAZG9BdXRvU2l6ZSA9IHZhbHVlXG5cdFx0XHRAZG9BdXRvU2l6ZUhlaWdodCA9IHZhbHVlXG5cdFx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdEBkZWZpbmUgXCJjb250ZW50RWRpdGFibGVcIixcblx0XHRzZXQ6IChib29sZWFuKSAtPlxuXHRcdFx0QF9lbGVtZW50LmNvbnRlbnRFZGl0YWJsZSA9IGJvb2xlYW5cblx0XHRcdEBpZ25vcmVFdmVudHMgPSAhYm9vbGVhblxuXHRcdFx0QG9uIFwiaW5wdXRcIiwgLT4gQGNhbGNTaXplKCkgaWYgQGRvQXV0b1NpemVcblx0QGRlZmluZSBcInRleHRcIixcblx0XHRnZXQ6IC0+IEBfZWxlbWVudC50ZXh0Q29udGVudFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QF9lbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWVcblx0XHRcdEBlbWl0KFwiY2hhbmdlOnRleHRcIiwgdmFsdWUpXG5cdFx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdEBkZWZpbmUgXCJmb250RmFtaWx5XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRGYW1pbHlcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udEZhbWlseVwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImZvbnRTaXplXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRTaXplLnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRTaXplXCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwibGluZUhlaWdodFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5saW5lSGVpZ2h0IFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJsaW5lSGVpZ2h0XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwiZm9udFdlaWdodFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250V2VpZ2h0IFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250V2VpZ2h0XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwiZm9udFN0eWxlXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRTdHlsZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250U3R5bGVcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250VmFyaWFudFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250VmFyaWFudFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250VmFyaWFudFwiLCB2YWx1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdcIixcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nVG9wXCIsIHZhbHVlLCB0cnVlKVxuXHRcdFx0QHNldFN0eWxlKFwicGFkZGluZ1JpZ2h0XCIsIHZhbHVlLCB0cnVlKVxuXHRcdFx0QHNldFN0eWxlKFwicGFkZGluZ0JvdHRvbVwiLCB2YWx1ZSwgdHJ1ZSlcblx0XHRcdEBzZXRTdHlsZShcInBhZGRpbmdMZWZ0XCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ1RvcFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nVG9wLnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdUb3BcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nUmlnaHRcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUucGFkZGluZ1JpZ2h0LnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdSaWdodFwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdCb3R0b21cIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUucGFkZGluZ0JvdHRvbS5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nQm90dG9tXCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ0xlZnRcIixcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nTGVmdC5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nTGVmdFwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInRleHRBbGlnblwiLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJ0ZXh0QWxpZ25cIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJ0ZXh0VHJhbnNmb3JtXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLnRleHRUcmFuc2Zvcm0gXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInRleHRUcmFuc2Zvcm1cIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJsZXR0ZXJTcGFjaW5nXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmxldHRlclNwYWNpbmcucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwibGV0dGVyU3BhY2luZ1wiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcImxlbmd0aFwiLCBcblx0XHRnZXQ6IC0+IEB0ZXh0Lmxlbmd0aFxuIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSJdfQ==
