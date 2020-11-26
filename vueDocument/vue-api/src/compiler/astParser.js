const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)

function parseHtmlToAst(html) {
    let text,
        root, 
        currentParent,
        stack = [];
        
    while(html) {
        let textEnd = html.indexOf('<');
        if (textEnd === 0) {
            const startTagMatch = parseStartTag();
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs);
                continue;
            }
            const endTagMatch = html.match(endTag);
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
        // break;
    }
    
    function parseStartTag() {
        const start = html.match(startTagOpen);
        let end, attr;
        if (start) {
            const match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length);
            while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5]
                })
                advance(attr[0].length);
            }
            if (end) {
                advance(end[0].length);
                return match;
            }
        }
    }

    function advance(n) {
        html = html.substring(n)
    }

    function start(tagName, attrs) {
        const element = createASTElement(tagName, attrs);
        if (!root) {
            root = element;
        }
        currentParent = element;
        stack.push(element);
    }

    function end(tagName) {
        const element = stack.pop();
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
                text
            })
        }
    }

    function createASTElement(tagName, attrs) {
        return {
            tag: tagName,
            type: 1,
            children: [],
            attrs,
            parent
        }
    }
    return root;
}
export {
    parseHtmlToAst
}