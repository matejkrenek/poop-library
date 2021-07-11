class Carousel {
    constructor ({slider, options, styles = {}}) {
        this.slider = slider;
        this.options = options;
        this.styles = styles;
        // this.controllers = _controllers;
        this.init();
    }

    // prevSlide() {
    //     this.currentSlide = this.currentSlide <= 0 ? this.sliderLen - this.perPage : this.currentSlide - this.perMove;
    //     this.changeSlide(this.currentSlide)
    // }

    initSlider() {
        this.carousel = document.querySelector(this.slider);
        this.carousel_cont = document.querySelector(this.slider + '> *');
        this.carousel_cont_slides = Array.prototype.slice.call( this.carousel_cont.children );
    }

    nextSlide() {
        if (this.currentSlide >= this.sliderLen - this.perPage + 1) {
            console.log('');
            this.currentSlide = 1;
        } else {
            console.log('');
            this.currentSlide = this.sliderLen - (this.currentSlide + this.perMove) < this.perPage
                ? this.currentSlide = this.sliderLen - this.perPage + 1
                : this.currentSlide + this.perMove;
        }
        
        this.changeSlide(this.currentSlide);
    }

    prevSlide() {
        if (this.currentSlide <= 1) {
            console.log('');
            this.currentSlide = this.sliderLen - this.perPage + 1;
        } else {
            console.log('');
            this.currentSlide = this.currentSlide - this.perMove <= 0
                ? 1
                : this.currentSlide - this.perPage + 1;
        }
        
        this.changeSlide(this.currentSlide);
    }

    changeSlide(index = this.currentSlide) {
        this.currentSlide = index;
        this.apparentTransform = 100 / this.carousel_cont_slides.length * (this.currentSlide - 1);
        this.deductionGap = this.styles.slider.gap.replace('px', '') / this.carousel_cont_slides.length * (this.currentSlide - 1);
        this.carousel_cont.style.transform = `translateX(calc(-${this.apparentTransform}% - ${this.deductionGap}px)`;
        // console.log(this.currentSlide + ' change slide');
    }

    renderArrows() {
        
    }

    initStylesFor(object) {
        let stringStyle = '';
        for (const [key, value] of Object.entries(object)) {
            let myKey = key.match(/[A-Z]*[^A-Z]+/g).map(word => word.toLowerCase()).join('-');
            stringStyle += (`${myKey}: ${value};`);
        }
        return stringStyle;
    }

    initStyles(style) {
        if (style.value != false) {

            //          ↓↓↓ Defalut styles ↓↓↓ ❤
            style.class = style.class ? style.class : 'sliderStyle';
            style.package.maxWidth = style.package.maxWidth ? style.package.maxWidth : '300px';
            style.package.height = style.package.height ? style.package.height : '300px';
            style.package.background = (style.package.background || style.package.backgroundColor || style.package.backgroundImage) ? style.package.background : '#777777';
            style.slides.background = (style.slides.background || style.slides.backgroundColor || style.slides.backgroundImage) ? style.slides.background : '#ffffff';
            style.slider.gap = style.slider.gap ? style.slider.gap : '0px';
            style.slider.alignItems = style.slider.alignItems ? style.slider.alignItems : 'center';
            style.slides.height = style.slides.height ? style.slides.height: '100%';
            style.slider.transition = style.slider.transition ? style.slider.transition : 'transform 0.5s';
            //          ↑↑↑ Defalut styles ↑↑↑ ❤

            this.carousel.classList.add(style.class);
            let styleElement = document.createElement('style');

            styleElement.innerHTML = 
            `
            .${style.class} {
                ${ this.initStylesFor(style.package)}
                overflow: hidden;
            }
            .${style.class} > * {
                ${ this.initStylesFor(style.slider)}
                width: calc((${this.carousel_cont_slides.length * 100}% + ${style.slider.gap}*${this.sliderLen - this.perPage})/${this.perPage});
                height: 100%;
                display: flex;
                flex-flow: row nowrap;
            }
            .${style.class} > * > * {
                margin: 0px;
                ${this.initStylesFor(style.slides)}
                height: calc(${style.slides.height} - ${style.slides.margin}*2);
                width: 100%;}
            `
            document.body.appendChild(styleElement)
        }
    }

    initOptions() {
        this.currentSlide = this.options.startSlide ? this.options.startSlide : 1;
        this.perPage = this.options.perPage ? this.options.perPage : 1;
        this.perMove = this.options.perMove ? this.options.perMove : 1;
        this.sliderLen = this.carousel_cont_slides.length
        this.styles ? this.initStyles(this.styles): null;
    }
    
    init() {
        this.initSlider();
        this.initOptions();
        this.changeSlide();
    }
}

const bruh = new Carousel({
    slider: '.js-carousel',
    styles: {
        value: true,
        class: 'classForPackage',
        package: {
            // height: '300px',
            // backgroundColor: '#232323',
        },
        slider: {
            gap: '10px',
        },
        slides: {
            margin: '1px',
        }
    },
    options: {
        startSlide: 1,
        perMove: 2,
        perPage: 3,
    }
})
// console.log('-----------------Slider-----------------');