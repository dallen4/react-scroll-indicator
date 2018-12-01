import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ScrollIndicatorPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            interpolatedValue: `0%`,
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    static propTypes = {
        horizontal: PropTypes.bool,
        customStyles: PropTypes.object,
    };

    static defaultProps = {
        horizontal: true,
        customStyles: {},
    };
    
    componentDidMount() {
        this.handleScroll();
    }

    handleScroll() {

        // get current offset from top of document
        let heightOffset = window.pageYOffset;

        // subtract view height from total document height
        let docViewDiff = document.body.clientHeight - window.innerHeight;

        let percentage = (heightOffset / docViewDiff * 100).toFixed(2);
        let interpolatedValue = `${percentage}%`;

        this.setState({ interpolatedValue });

    }

    render() {

        let { horizontal, customStyles, } = this.props;
        let { interpolatedValue } = this.state;

        let styles = {
            left: 0,
            bottom: 0,
            position: 'fixed',
            height: '3px',
            width: '3px',
            backgroundColor: 'rgb(252, 154, 31)',
            ...customStyles,
        };

        let interpolatedField = horizontal ? 'width' : 'height';

        styles[interpolatedField] = interpolatedValue;

        return (
            <div onWheel={this.handleScroll}>
                {this.props.children}
                <div style={styles} />
            </div>
        );
    }
}
