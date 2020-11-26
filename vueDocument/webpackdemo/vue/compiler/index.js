import {parseHtmlToAst} from './astParser';
function compileToRenderFunction(html) {
    const ast = parseHtmlToAst(html)
}

export {
    compileToRenderFunction
}