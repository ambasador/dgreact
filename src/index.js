import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import classNames from 'classnames';
import registerServiceWorker from './registerServiceWorker';

class CitiesSlider extends React.Component {
    constructor(props) {
        super(props);

        this.IMAGE_PARTS = 4;

        this.changeTO = null;
        this.AUTOCHANGE_TIME = 6000;

        this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
    }

    componentWillUnmount() {
        window.clearTimeout(this.changeTO);
    }

    componentDidMount() {
        this.runAutochangeTO();
        setTimeout(() => {
            this.setState({ activeSlide: 0, sliderReady: true });
        }, 0);
    }

    runAutochangeTO() {
        this.changeTO = setTimeout(() => {
            this.changeSlides(1);
            this.runAutochangeTO();
        }, this.AUTOCHANGE_TIME);
    }

    changeSlides(change) {
        window.clearTimeout(this.changeTO);
        const { length } = this.props.slides;
        const prevSlide = this.state.activeSlide;
        let activeSlide = prevSlide + change;
        if (activeSlide < 0) activeSlide = length - 1;
        if (activeSlide >= length) activeSlide = 0;
        this.setState({ activeSlide, prevSlide });
    }

    render() {
        const { activeSlide, prevSlide, sliderReady } = this.state;
        return (
            <div className={classNames('slider', { 's--ready': sliderReady })}>
                <p className="slider__top-heading"><svg version="1.0" id="logo" x="0px" y="0px" viewBox="0 0 45 45"><path fill="#FFFFFF" d="M23.6,0.4c-8,0-14.5,0.8-14.5,0.8L1.4,34.8l9.4-2.2L8.3,44.1L29.4,35l-16.9,3.7l7-30.7l12.3-1.7l-7.6,24 c0,0,17.1-3,17.9-15.6C42.8,2.2,31.6,0.4,23.6,0.4z"></path></svg></p>
                <div className="slider__slides">
                    {this.props.slides.map((slide, index) => (
                        <div
                            className={classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index  })}
                            key={slide.slide}
                        >
                            <div className="slider__slide-content">
                                <h3 className="slider__slide-subheading">{slide.type || slide.slide}</h3>
                                <h2 className="slider__slide-heading">
                                    {slide.slide.split('').map(l => <span>{l}</span>)}
                                </h2>

                            </div>
                            <div className="slider__slide-parts">
                                {[...Array(this.IMAGE_PARTS).fill()].map((x, i) => (
                                    <div className="slider__slide-part" key={i}>
                                        <div className="slider__slide-part-inner" style={{ backgroundImage: `url(${slide.img})` }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="slider__control" onClick={() => this.changeSlides(-1)} />
                <div className="slider__control slider__control--right" onClick={() => this.changeSlides(1)} />
            </div>
        );
    }
}

const slides = [
    {
        slide: 'Pizza House',
        type: 'Business Cards',
        img: 'http://digital-legend.com/static/media/pizza-house.c85ece9a.jpg',
    },
    {
        slide: 'Bisect',
        type: 'Longplay',
        img: 'http://digital-legend.com/static/media/bisect-vinyl.18b26c15.jpg',
    },
    {
        slide: 'Inch  Hideaway',
        type: 'Logo',
        img: 'http://digital-legend.com/static/media/inch-hideaway.60493bef.jpg',
    },
    {
        slide: 'Digital  Legend',
        type: 'Logo',
        img: 'http://digital-legend.com/static/media/digital-legend-logo.789d334a.jpg',
    },
    {
        slide: 'Dziewoy',
        type: 'Website',
        img: 'http://digital-legend.com/static/media/dziewoy.bf90681c.jpg',
    },
];

ReactDOM.render(<CitiesSlider slides={slides} />, document.querySelector('#app'));


registerServiceWorker();
