Object.entries((() => {
    const $ = jQuery;

    // most credit goes to: https://stackoverflow.com/a/71787772
    function cssWithShadow(selector, rootNode = document.documentElement) {
        const arr = [];

        arr.push(...$(selector, rootNode));

        const traverser = node => {
            if (node.nodeType !== Node.ELEMENT_NODE) {
                return;
            }

            const shadowRoot = node.shadowRoot;
            if (shadowRoot) {
                const shadowChildren = shadowRoot.children;
                for (const shadowChild of shadowChildren) {
                    arr.push(...cssWithShadow(selector, shadowChild));
                }
            }

            for (const child of node.children) {
                traverser(child);
            }
        }

        traverser(rootNode);

        return $(arr);
    }

    $.fn.$$$ = function(selector) {
        const result = [];
        this.each((i, e) => result.push(...cssWithShadow(selector, e)));
        return $(result);
    }

    return {"$$$": cssWithShadow};
})()).forEach(([k, v]) => window[k] = v);