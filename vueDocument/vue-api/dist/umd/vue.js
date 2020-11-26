(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    function proxyData(vm, target, key) {
      Object.defineProperty(vm, key, {
        get: function get() {
          return vm[target][key];
        },
        set: function set(newVal) {
          vm[target][key] = newVal;
        }
      });
    }

    function _typeof(obj) {
      "@babel/helpers - typeof";

      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _iterableToArrayLimit(arr, i) {
      if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function defineReactiveData(data, key, value) {
      observe(value);
      Object.defineProperty(data, key, {
        get: function get() {
          return value;
        },
        set: function set(newValue) {
          if (newValue === value) return;
          observe(newVal);
          value = newVal;
        }
      });
    }

    function observeArr(array) {
      for (var i = 0; i < array.length; i++) {
        observe(array[i]);
      }
    }

    var ARR_METHODS = ['push', 'pop', 'splice', 'shift', 'unshift', 'sort', 'reverse'];

    var originArrMethods = Array.prototype;
    var arrMethods = Object.create(originArrMethods);
    ARR_METHODS.map(function (m) {
      arrMethods[m] = function () {
        var args = Array.prototype.slice.call(arguments);
        var rt = originArrMethods[m].apply(this, args);
        var newArr;

        switch (m) {
          case 'push':
          case 'unshift':
            newArr = args;
            break;

          case 'splice':
            newArr = args[2].slice(2);
            break;
        }

        newArr && observeArr(newArr);
        return rt;
      };
    });

    function Observer(data) {
      if (Array.isArray(data)) {
        // 处理数组
        data.__proto__ = arrMethods;
        observeArr(data);
      } else {
        this.walk(data);
      }
    }

    Observer.prototype.walk = function (data) {
      var keys = Object.keys(data);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = data[key];
        defineReactiveData(data, key, value);
      }
    };

    function observe(data) {
      if (_typeof(data) !== 'object' || data === null) return;
      return new Observer(data);
    }

    function initState(vm) {
      var options = vm.$options;

      if (options.data) {
        initData(vm);
      }
    }

    function initData(vm) {
      var data = vm.$options.data;
      data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};

      for (var key in data) {
        proxyData(vm, '_data', key);
      }

      observe(vm._data);
    }

    var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
    var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
    var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z".concat(unicodeRegExp.source, "]*");
    var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
    var startTagOpen = new RegExp("^<".concat(qnameCapture));
    var startTagClose = /^\s*(\/?)>/;
    var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));

    function parseHtmlToAst(html) {
      var root,
          currentParent,
          stack = [];

      while (html) {
        var text = void 0;
        var textEnd = html.indexOf('<');

        if (textEnd === 0) {
          var startTagMatch = parseStartTag();

          if (startTagMatch) {
            start(startTagMatch.tagName, startTagMatch.attrs);
            continue;
          }

          var endTagMatch = html.match(endTag);

          if (endTagMatch) {
            advance(endTagMatch[0].length);
            end(endTagMatch[1]);
            continue;
          }
        }

        if (textEnd > 0) {
          text = html.substring(0, textEnd);
        }

        if (text) {
          advance(text.length);
          chars(text);
        }

        break;
      }

      function parseStartTag() {
        var start = html.match(startTagOpen);
        var end, attr;

        if (start) {
          var match = {
            tagName: start[1],
            attrs: []
          };
          advance(start[0].length);

          while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            match.attrs.push({
              name: attr[1],
              value: attr[3] || attr[4] || attr[5]
            });
            advance(attr[0].length);
          }

          if (end) {
            advance(end[0].length);
            return match;
          }
        }
      }

      function advance(n) {
        html = html.substring(n);
      }

      function start(tagName, attrs) {
        var element = createASTElement(tagName, attrs);

        if (!root) {
          root = element;
        }

        currentParent = element;
        stack.push(element);
      }

      function end(tagName) {
        var element = stack.pop();
        currentParent = stack[stack.length - 1];

        if (currentParent) {
          element.parent = currentParent;
          currentParent.children.push(element);
        }
      }

      function chars(text) {
        text = text.trim();

        if (text.length > 0) {
          currentParent.children.push({
            type: 3,
            text: text
          });
        }
      }

      function createASTElement(tagName, attrs) {
        return {
          tag: tagName,
          type: 1,
          children: [],
          attrs: attrs,
          parent: parent
        };
      }

      return root;
    }

    var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

    function formatProps(attrs) {
      var attrStr = '';

      for (var i = 0; i < attrs.length; i++) {
        var attr = attrs[i];

        if (attr.name === 'style') {
          (function () {
            var styleAttrs = {};
            attr.value.split(';').map(function (styleAttr) {
              var _styleAttr$split = styleAttr.split(':'),
                  _styleAttr$split2 = _slicedToArray(_styleAttr$split, 2),
                  key = _styleAttr$split2[0],
                  value = _styleAttr$split2[1];

              styleAttrs[key] = value;
            });
            attr.value = styleAttrs;
          })();
        }

        attrStr += "".concat(attr.name, ": ").concat(JSON.stringify(attr.value), ",");
        return "{".concat(attrStr.slice(0, -1), "}");
      }
    }

    function getChildren(el) {
      var children = el.children;

      if (children) {
        return children.map(function (c) {
          return generateChild(c);
        }).join(',');
      }
    }

    function generateChild(node) {
      if (node.type === 1) {
        return generate(node);
      } else if (node.type === 3) {
        var text = node.text;

        if (!text.match(defaultTagRE)) {
          // 纯文本的处理
          return "_v(".concat(JSON.stringify(text), ")");
        }

        var match;
        var index;
        var lastIndex = defaultTagRE.lastIndex = 0;
        var textArr = [];

        while (match = defaultTagRE.exec(text)) {
          index = match.index;

          if (index > lastIndex) {
            textArr.push(JSON.stringify(text.slice(lastIndex, index)));
          }

          textArr.push("_s(".concat(match[1].trim(), ")"));
          lastIndex = index + match[0].length;
        }

        if (lastIndex < text.length) {
          textArr.push(JSON.stringify(text.slice(lastIndex)));
        }

        return "_v(".concat(textArr.join('+'), ")");
      }
    }

    function generate(el) {
      var children = getChildren(el);
      var code = "_c('".concat(el.tag, "', ").concat(el.attrs.length > 0 ? "".concat(formatProps(el.attrs)) : undefined, ")").concat(children ? ",".concat(children) : '');
      return code;
    }

    function compileToRenderFunction(html) {
      var ast = parseHtmlToAst(html);
      var code = generate(ast);
      var render = new Function("\n        with(this) {return ".concat(code, "}\n    "));
      return render;
    }

    function patch(oldNode, vNode) {
      var el = createElement(vNode);
      var parentElement = oldNode.parentNode;
      parentElement.insertBefore(el, oldNode.nextSibling);
      parentElement.removeChild(oldNode);
    }

    function createElement(vnode) {
      var tag = vnode.tag,
          props = vnode.props,
          children = vnode.children,
          text = vnode.text;

      if (typeof tag === 'string') {
        vnode.el = document.createElement(tag);
        updateProps(vnode);
        children.map(function (child) {
          vnode.el.appendChild(createElement(child));
        });
      } else {
        vnode.el = document.createTextNode(text);
      }

      return vnode.el;
    }

    function updateProps(vnode) {
      var el = vnode.el;
      var newProps = vnode.props || {};

      for (var key in newProps) {
        if (key === 'style') {
          for (var sKey in newProps.style) {
            el.style[sKey] = newProps.style[sKey];
          }
        } else if (key === 'class') {
          el.className = el["class"];
        } else {
          el.setAttribute(key, newProps[key]);
        }
      }
    }

    function mountComponent(vm) {
      vm._update(vm._render());
    }

    function lifecycleMixin(Vue) {
      Vue.prototype._update = function (vNode) {
        var vm = this;
        patch(vm.$el, vNode);
      };
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        var vm = this;
        vm.$options = options;
        initState(vm);

        if (vm.$options.el) {
          vm.$mount(vm.$options.el);
        }
      };

      Vue.prototype.$mount = function (el) {
        var vm = this;
        var options = vm.$options;
        el = document.querySelector(el);
        vm.$el = el;

        if (!options.render) {
          var template = options.template;

          if (!template && el) {
            template = el.outerHTML;
          }

          var render = compileToRenderFunction(template);
          options.render = render;
        }

        mountComponent(vm);
      };
    }

    function createElement$1(tags, attrs) {
      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }

      return vnode(tags, attrs, children);
    }

    function createTextVnode(text) {
      return vnode(undefined, undefined, undefined, text);
    }

    function vnode(tag, props, children, text) {
      return {
        tag: tag,
        props: props,
        children: children,
        text: text
      };
    }

    function renderMixin(Vue) {
      Vue.prototype._c = function () {
        return createElement$1.apply(void 0, arguments);
      };

      Vue.prototype._s = function (value) {
        if (!value) return;
        return _typeof(value) === 'object' ? JSON.stringify(value) : value;
      };

      Vue.prototype._v = function (text) {
        return createTextVnode(text);
      };

      Vue.prototype._render = function () {
        var vm = this;
        var render = vm.$options.render;
        var vNode = render.call(vm);
        console.log(vNode);
        return vNode;
      };
    }

    function Vue(options) {
      this._init(options);
    }

    initMixin(Vue);
    lifecycleMixin(Vue);
    renderMixin(Vue);

    return Vue;

})));
//# sourceMappingURL=vue.js.map
