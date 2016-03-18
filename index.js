var parser = require('html-parser');

module.exports = {
    parse: parse,
    getOuterHTML: getOuterHTML,
    getInnerHTML: getInnerHTML
};

/**
 * @param {String} html
 * @param {Object} [options]
 * @returns {{type: string, children: Array}}
 */
function parse(html, options) {
    options = options || {};

    var body = {
        type: 'document',
        children: []
    };

    var current = body;

    parser.parse(html, {
        docType: function (value) {
            open({
                type: 'doctype',
                closed: true,
                data: value
            });
        },
        openElement: function(name) {
            open({
                type: 'tag',
                closed: false,
                name: name
            });
        },
        text: function (value) {
            open({
                type: 'text',
                closed: true,
                data: value
            });
        },
        comment: function(value) {
            open({
                type: 'comment',
                closed: true,
                data: value
            });
        },
        closeOpenedElement: function(name, token) {
            current.closed = current.unary = token === '/>';
        },
        closeElement: function() {
            if (current.closed) {
                current.parent.closed = true;
                current = current.parent;
            }
            else {
                current.closed = true;
            }
        },
        attribute: function(name, value) {
            current.attr[name] = value;
        }
    }, options.regex);

    return body;

    function open(tag) {
        tag.attr = {};
        tag.children = [];
        tag.prev = tag.next = null;

        if (current.closed) {
            tag.prev = current;
            tag.parent = current.parent;
            current.next = tag;
            current.parent.children.push(tag);
            current = tag;
        }
        else {
            tag.parent = current;
            tag.prev = null;
            current.children.push(tag);
            current = tag;
        }
    }
}

var hasDoubleQuot = /"/;

function getOuterHTML(node) {
    switch (node.type) {
    case 'doctype':
        return '<!DOCTYPE ' + node.data + '>';

    case 'comment':
        return '<!--' + node.data + '-->';

    case 'text':
        return node.data;

    case 'tag':
        var ret = "<" + node.name;

        for (var attr in node.attr) {
            if (!node.attr.hasOwnProperty(attr)) continue;

            var quot = hasDoubleQuot.test(node.attr[attr]) ? "'" : '"';

            ret += " " + attr + '=' + quot + node.attr[attr] + quot;
        }

        return ret + (node.unary ? "/>" : ">" + getInnerHTML(node) + "</" + node.name + ">");

    default:
        if (node.children) {
            return getInnerHTML(node);
        }
    }
}

function getInnerHTML(node) {
    return node.children.length ? node.children.map(getOuterHTML).join("") : "";
}