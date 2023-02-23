Object.entries((() => {
    const $ = jQuery;

    $.fn.x = function (xpath) {
        const result = [];
        this.each((i, e) => {
            const xpathResult = document.evaluate(xpath, e, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

            let elem;
            while (elem = xpathResult.iterateNext()) {
                result.push(elem);
            }
        });
        return $(result);
    };
    const $x = (xpath, context) => $(context ? context : document).x(xpath);

    return {"$x": $x};
})()).forEach(([k, v]) => window[k] = v);