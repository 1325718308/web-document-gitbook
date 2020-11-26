
/**
 * <div id="app" style="color: red">
      hello: {{title}}
      <span class="text" style="color: green">{{age}}</span>
  </div>

  
  _c() => createELement()
  _v() => createTextNode()
  _s() => {{}} => _s(name)
 * 
 */
function vrender() {
    return `
        _c(
            'div', 
            {'id': 'app', style: {'color': 'red'}},
            _v('hello' + _s(title)),
        _c(
            'span',
            {
                class: 'text'
                style: {'color': 'green'}
            },
            _v(_s(age)
        )
    `
}

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

function formatProps(attrs) {
   let attrStr = '';
   for (let i = 0; i < attrs.length; i++) {
       const attr = attrs[i];
       if (attr.name === 'style') {
           let styleAttrs = {}
           attr.value.split(';').map(styleAttr => {
               let [key, value] = styleAttr.split(':');
               styleAttrs[key] = value;
           })
           attr.value = styleAttrs;
       }
       attrStr += `${attr.name}: ${JSON.stringify(attr.value)},`
       return `{${attrStr.slice(0, -1)}}`
   }
}

function getChildren(el) {
    const children = el.children;
    if (children) {
        return children.map(c => generateChild(c)).join(',');
    }
}

function generateChild(node) {
    if (node.type === 1) {
        return generate(node);
    } else if(node.type === 3) {
        let text = node.text;
        if (!text.match(defaultTagRE)) {
            // 纯文本的处理
            return `_v(${JSON.stringify(text)})`
        } 
        let match;
        let index;
        let lastIndex = defaultTagRE.lastIndex = 0;
        let textArr = [];
        while(match = defaultTagRE.exec(text)) {
            index = match.index;
            if (index > lastIndex) {
                textArr.push(JSON.stringify(text.slice(lastIndex, index)));
            }
            textArr.push(`_s(${match[1].trim()})`);
            lastIndex = index + match[0].length;
        }
        if (lastIndex < text.length) {
            textArr.push(JSON.stringify(text.slice(lastIndex)));
        }
        return `_v(${textArr.join('+')})`
    }
}

function generate(el) {
    let children = getChildren(el);
    let code = `_c('${el.tag}', ${
            el.attrs.length > 0
            ? 
            `${formatProps(el.attrs)}`
            : undefined
        })${
            children ? `,${children}` : ''
        }`;
    return code;
} 
export {
    generate
}