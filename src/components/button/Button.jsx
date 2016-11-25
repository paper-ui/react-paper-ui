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

import React from 'react';
import Ripple from '../ripple';

export default class Button extends React.Component {
    // <editor-fold desc="Class Props">

    static propTypes = {
        raised: React.PropTypes.bool,
        rippleOptions: React.PropTypes.object,
        disabled: React.PropTypes.bool,
        noink: React.PropTypes.bool,
        toggles: React.PropTypes.bool
    };

    static defaultProps = {
        raised: false,
        rippleOptions: {},
        disabled: false,
        noink: false,
        toggles: false
    };

    // </editor-fold>

    // <editor-fold desc="Class Methods">

    _downAction(ev) {
        if (ev && typeof ev.persist === 'function') {
            ev.persist();
        }

        this._rippleDOwnAction(ev);

        // todo
    }

    _rippleDownAction(ev) {
        if (!this.props.noink) {
            this.$ripple.downAction(ev);
        }
    }

    _rippleUpAction() {
        if (!this.props.noink) {
            this.$ripple.upAction();
        }
    }

    componentDidMount() {
        console.log(this.$);
    }

    render() {
        let btnClassName = 'paper-button';

        if (this.props.raised) {
            btnClassName += ' paper-button--raised';
        }

        return (
            <button {...this.props} ref={el => { this.$ = el; }} className={btnClassName}>
                <Ripple {...this.props.rippleOptions} ref={el => { this.$ripple = el; }} />
                {this.props.children}
            </button>
        );
    }

    // </editor-fold>
}
