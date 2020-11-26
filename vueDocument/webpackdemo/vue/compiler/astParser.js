const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i

function parseHtmlToAst(html) {
    while(html) {
        let text;
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
        break;
    }
    function start(tagName, attrs) {
        console.log('------------开始-------------')
        console.log(tagName, attrs);
    }
    function parseStartTag() {
        const start = html.match(startTagOpen);
        let end, attr;
        if (start) {
            const match = {
                tagName: start[0],
                attrs: []
            }
            advance(start[0].length);
            while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[6]
                })
                console.log(match)
                advance(attr[0].length);
                return match;
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
    function end(tagName) {
        console.log('------------结束-------------')
        console.log(tagName);
    }
    function chars(text) {
        console.log('------------文本-------------')
        console.log(text);
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
}
export {
    parseHtmlToAst
}