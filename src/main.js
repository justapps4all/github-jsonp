(function() {

    // Baseline setup
    // --------------

    // Establish the root object, `window` (`self`) in the browser, `global`
    // on the server, or `this` in some virtual machines. We use `self`
    // instead of `window` for `WebWorker` support.
    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this;

    // Naked function reference for surrogate-prototype-swapping.
    var Ctor = function(){};

    // Create a safe reference to the Underscore object for use below.
    var GitHubJsonP = function(obj) {
        if (obj instanceof GitHubJsonP) return obj;
        if (!(this instanceof GitHubJsonP)) return new GitHubJsonP(obj);
        this._wrapped = obj;
    };

    // Export the Underscore object for **Node.js**, with
    // backwards-compatibility for their old module API. If we're in
    // the browser, add `GitHubJsonP` as a global object.
    // (`nodeType` is checked to ensure that `module`
    // and `exports` are not HTML elements.)
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = GitHubJsonP;
        }
        exports.GitHubJsonP = GitHubJsonP;
    } else {
        root.GitHubJsonP = GitHubJsonP;
    }

    // Current version.
    GitHubJsonP.VERSION = '0.1.0';


    GitHubJsonP.noConflict = function() {
        return GitHubJsonP;
    }



    // AMD registration happens at the end for compatibility with AMD loaders
    // that may not enforce next-turn semantics on modules. Even though general
    // practice for AMD registration is to be anonymous, underscore registers
    // as a named module because, like jQuery, it is a base library that is
    // popular enough to be bundled in a third party lib, but not be part of
    // an AMD load request. Those cases could generate an error when an
    // anonymous define() is called outside of a loader request.
    if (typeof define == 'function' && define.amd) {
        define('GitHubJsonP', [], function() {
            return GitHubJsonP;
        });
    }


}).call(this);
