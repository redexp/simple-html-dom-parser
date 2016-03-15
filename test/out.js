module.exports = {
    type: 'document',
    children: [
        doc('HTML\nPUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd"'),
        text('\n\n'),
        comment('One line'),
        text('\n'),
        comment('Multi\n    line'),
        text('\n\n'),
        tag('div', {
            attr: {
                "id": "test",
                "data-d-quot": "'test'",
                "data-quot": '"test"'
            },
            children: [
                text("\n  "),
                tag('h1', {
                    children: [
                        tag('i', {
                            attr: {
                                "class": "icon"
                            }
                        }),
                        text(" Title")
                    ]
                }),
                text('\n  Inner text\n  Multiline text\n  '),
                tag('p', {
                    children: [
                        text('Description')
                    ]
                }),
                text('\n')
            ]
        }),
        text('\n\n'),
        tag('input', {
            attr: {
                type: 'text'
            },
            unary: true
        })
    ]
};

function tag(name, ops) {
    var obj = {
        type: 'tag',
        name: name,
        attr: {},
        children: [],
        unary: false
    };

    ops = ops || {};

    for (var field in ops) {
        if (ops.hasOwnProperty(field)) {
            obj[field] = ops[field];
        }
    }

    return obj;
}

function doc(data) {
    return {
        type: 'doctype',
        data: data
    };
}

function comment(data) {
    return {
        type: 'comment',
        data: data
    };
}

function text(data) {
    return {
        type: 'text',
        data: data
    };
}