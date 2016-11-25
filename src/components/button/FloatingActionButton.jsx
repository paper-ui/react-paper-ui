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

export default class FloatingActionButton extends React.Component {
    render() {
        return (
            <div className="paper-fab">
                <Ripple />
            </div>
        );
    }
}
