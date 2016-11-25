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

import { copyObj } from '../../core/utils';
import React from 'react';
import RippleWave from './RippleWave';
import '../../styles/components/_ripple';

/**
 * Provides all the logic to produce ripple visual effect.
 * Other elements can use it to simulate rippling effect emanating from the point of contact.
 *
 * @class Ripple
 * @returns {Ripple} The new instance of a class.
 */
export default class Ripple extends React.Component {
    // <editor-fold desc="Class Props">

    static propTypes = {
        /**
         * The initial opacity of the each wave.
         */
        initialOpacity: React.PropTypes.number,

        /**
         * How fast (opacity per second) the wave fades out.
         */
        opacityDecayVelocity: React.PropTypes.number,

        /**
         * If true, waves will exhibit a gravitational pull towards the center of their container as they fade away.
         */
        recenters: React.PropTypes.bool,

        /**
         * If true, waves will center inside its container.
         */
        center: React.PropTypes.bool,

        /**
         * If true, ripple effect will apply within a circle.
         */
        round: React.PropTypes.bool,

        /**
         * The initial color of the each wave.
         */
        color: React.PropTypes.string
    };

    static defaultProps = {
        initialOpacity: 0.25,
        opacityDecayVelocity: 0.8,
        recenters: false,
        center: false,
        round: false
    };

    /**
     * Determines whether the ripple should keep animating or not.
     *
     * @returns {Boolean} `true`, if so, otherwise `false`.
     */
    get shouldKeepAnimating() {
        return this._waves.some(wave => !wave.isAnimationComplete);
    }

    _waves = [];

    // </editor-fold>

    // <editor-fold desc="Class Methods">

    /**
     * Adds new wave to the list of visual ripples.
     *
     * @returns {RippleWave} Current instance for method chaining.
     */
    _addWave() {
        const props = copyObj(this.props, { $: this.$ }),
            wave = new RippleWave(props);

        this.$.appendChild(wave.$);
        this.$bg.style.backgroundColor = wave.color;

        this._waves.push(wave);

        return wave;
    }

    /**
     * Removes given wave from the list of visual ripples.
     *
     * @param {RippleWave} wave - The wave to remove.
     * @returns {Ripple} Current instance for method chaining.
     */
    _removeWave(wave) {
        const waveIndex = this._waves.indexOf(wave);

        if (waveIndex < 0) {
            return this;
        }

        this._waves.splice(waveIndex, 1);
        wave.remove();

        return this;
    }

    /**
     * Animates all the waves in the list of visual ripples.
     *
     * @returns {Ripple} Current instance for method chaining.
     */
    _animate() {
        let i, len, wave;

        for (i = 0, len = this._waves.length; i < len; i++) {
            wave = this._waves[i];

            if (wave) {
                wave.draw();

                this.$bg.style.opacity = wave.outerOpacity;

                if (wave.isWaveFullyOpaque && !wave.isMaxRadiusReached) {
                    this._removeWave(wave);
                }
            }
        }

        if (!this.shouldKeepAnimating && this._waves.length === 0) {
            this.$bg.style.backgroundColor = null;
        } else {
            window.requestAnimationFrame(this._animate.bind(this));
        }

        return this;
    }

    shouldComponentUpdate(props, state) {
        for (const p in props) {
            if (props.hasOwnProperty(p) && this.props[p] !== props[p]) {
                return true;
            }
        }

        for (const s in state) {
            if (state.hasOwnProperty(s) && this.state[s] !== state[s]) {
                return true;
            }
        }

        return false;
    }

    /**
     * Produces a ripple-down effect.
     *
     * @param {(Event|{clientX: Number, clientY: Number}|{x: Number, y: Number})} [ev=null] - Object containing coordinates of the point of contact.
     * @returns {Ripple} Current instance for method chaining.
     */
    downAction(ev) {
        if (ev && typeof ev.persist === 'function') {
            ev.persist();
        }

        const wave = this._addWave();

        wave.downAction(ev);
        this._animate();

        return this;
    }

    /**
     * Produces a ripple-up effect.
     *
     * @returns {Ripple} Current instance for method chaining.
     */
    upAction() {
        this._waves.forEach(wave => wave.upAction());
        this._animate();

        return this;
    }

    render() {
        return (
            <div className={`paper-ripple${this.props.round ? ' paper-ripple--round' : ''}`} {...this.props}
                style={{ color: this.props.color }}>
                <div className="paper-ripple__bg" ref={el => { this.$bg = el; }}></div>
                <div className="paper-ripple__waves" ref={el => { this.$ = el; }}></div>
            </div>
        );
    }

    // </editor-fold>
}
