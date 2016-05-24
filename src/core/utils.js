/**
 * This file\code is part of Paper UI project.
 *
 * Paper UI - is a modern front-end framework based on Material Design by Google
 * https://github.com/paper-ui
 *
 * Copyright (c) 2016 Bohdan Shtepan
 * http://modern-dev.com/
 *
 * Licensed under the MIT license.
 */

const _now = (function now() {
        return window.performance && window.performance.now ? window.performance.now.bind(window.performance) : Date.now;
    }()),
    _ce = window.document.createElement.bind(window.document),
    _co = (obj, newProps) => {
        const newObj = {};

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = obj[key];
            }
        }

        for (const key in newProps) {
            if (newProps.hasOwnProperty(key)) {
                newObj[key] = newProps[key];
            }
        }

        return newObj;
    };

export { _now as now, _ce as ce, _co as copyObj };
