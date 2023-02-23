Object.entries((() => {
    const $ = jQuery;

    function xpath(path, rootNode = document.documentElement) {
        const iterator = document.evaluate(path, rootNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        const result = [];
        let elem;
        while (elem = iterator.iterateNext()) {
            result.push(elem);
        }
        return result;
    }

    // most credit goes to: https://stackoverflow.com/a/71787772
    function xpathWithShadow(path, rootNode = document.documentElement) {
        const arr = [];

        arr.push(...xpath(path, rootNode));

        const traverser = node => {
            if (node.nodeType !== Node.ELEMENT_NODE) {
                return;
            }

            const shadowRoot = node.shadowRoot;
            if (shadowRoot) {
                const shadowChildren = shadowRoot.children;
                for (const shadowChild of shadowChildren) {
                    arr.push(...xpathWithShadow(path, shadowChild));
                }
            }

            for (const child of node.children) {
                traverser(child);
            }
        }

        traverser(rootNode);

        return $(arr);
    }

    $.fn.$$$x = function(selector) {
        const result = [];
        this.each((i, e) => result.push(...xpathWithShadow(selector, e)));
        return $(result);
    }

    return {"$$$x": xpathWithShadow};
})()).forEach(([k, v]) => window[k] = v);