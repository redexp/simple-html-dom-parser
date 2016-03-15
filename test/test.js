var test = require('tape'),
    parse = require('../index').parse,
    toHtml = require('../index').getOuterHTML,
    fs = require('fs');

test('Parse html to dom', function (t) {
    var node = parse(fs.readFileSync(__dirname + '/in.html').toString());

    var model = require('./out');

    compare(t, node, model);

    t.end();

    function compare(t, actual, expected, parent) {
        for (var field in expected) {
            if (!expected.hasOwnProperty(field)) continue;

            if (field === 'children') {
                expected[field].forEach(function (item, i) {
                    compare(t, actual[field][i], item, actual);
                });
                continue;
            }

            if (typeof expected[field] === 'object') {
                t.deepEqual(actual[field], expected[field]);
            }
            else {
                t.equal(actual[field], expected[field]);
            }
        }

        if (parent) {
            t.equal(actual.parent, parent, 'parent');

            var index = parent.children.indexOf(actual);
            t.notEqual(index, -1);

            var prev = index > 0 ? parent.children[index - 1] : null,
                next = index < parent.children.length - 1 ? parent.children[index + 1] : null;

            t.equal(actual.prev, prev, 'prev');
            t.equal(actual.next, next, 'next');
        }
    }
});

test('Stringify dom to html', function (t) {
    var html = fs.readFileSync(__dirname + '/in.html').toString();

    var model = require('./out');

    t.equal(toHtml(model), html);

    t.end();
});