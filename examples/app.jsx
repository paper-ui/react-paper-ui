/* global Ripple: true*/

import React from 'react';
import { Ripple } from '../src/index';
import { render } from 'react-dom';

class App extends React.Component {
    state = {
        idd: null
    };

    onMouseDown(ev) {
        console.log('onmousedown');

        this._ripple.downAction(ev);

        this.setState({ idd: `id${Math.random()}` });
    }

    onMouseUp() {
        this._ripple.upAction();
    }

    componentDidMount() {
        this.$.addEventListener('mousedown', ev => { console.log('md', ev); }, false);
    }

    componentWillUnmount() {
        
    }

    render() {
        return (
            <div onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)} ref={el => { this.$ = el; }}
                 style={{ position: 'relative', width: '100%', height: '100%' }} id={this.state.idd}>
                <Ripple {...this.props} ref={ripple => { this._ripple = ripple; }}/>
            </div>
        );
    }
}

render(<App recenter={true} color="red" />, document.getElementById('app'));
