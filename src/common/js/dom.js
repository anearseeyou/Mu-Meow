/**
 * 判断是否有ClassName
 * @param el
 * @param className
 */

export function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}

export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}


/**
 * CSS3私有前缀 兼容性封装
 */

let elementStyle = document.createElement('div').style;

let vender = (() => {
    let transformNames = {
        webkit: 'WebkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'webkitTransform',
    }
    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key;
        }
    }
    return false;
})()

export function prefixStyle(style) {
    if (vender === false) {
        return false;
    }

    if (vender === 'standard') {
        return style
    }

    return vender + style.charAt(0).toUpperCase() + style.substr(1);
}
