class Carousel {
    constructor ({slider, options = {}}) {
        this.slider = slider;
        this.options = options;
        // this.controllers = _controllers;
        this.init();
    }

    // prevSlide() {
    //     this.currentIndex = this.currentIndex <= 0 ? this.sliderLen - this.perPage : this.currentIndex - this.perMove;
    //     this.changeSlide(this.currentIndex)
    // }

    initSlider() {
        this.carousel = document.querySelector(this.slider);
        this.carousel_cont = document.querySelector(this.slider + '> *');
        this.carousel_cont_slides = Array.prototype.slice.call( this.carousel_cont.children );
    }

    changeSlide() {
        this.currentTransform1 = 100 / this.carousel_cont_slides.length * (this.currentSlide - 1);
        this.currentTransform2 = this.options.defaultStyles.gap.replace('px', '') / this.carousel_cont_slides.length * (this.currentSlide - 1);
        this.carousel_cont.style.transform = `translateX(calc(-${this.currentTransform1}% - ${this.currentTransform2}px)`;
    }

    nextSlide() {
        this.currentSlide = this.currentSlide + this.perMove;
        this.changeSlide();
    }

    prevSlide() {
        this.currentSlide = this.currentSlide - this.perMove;
        this.changeSlide();
    }

    renderArrows() {
        
    }

    initDefaultStyles(style) {
        if (style.value ) {
            style.class = style.class ? style.class : 'sliderStyle';
            style.width = style.width ? style.width : '300px';
            style.height = style.height ? style.height : '300px';
            style.background = style.background ? style.background : '#777777';
            style.gap = style.gap ? style.gap : '0px';
            style.margin = style.margin ? style.margin : '0px';

            this.carousel.classList.add(style.class)
            let defStyles = document.createElement('style')
            defStyles.innerHTML = 
            `
            .${style.class} {width: ${style.width};height: ${style.height};background: ${style.background};overflow:hidden;}
            .${style.class} > * {width: calc(${this.carousel_cont_slides.length * 100}% + ${style.gap}*4);height: 100%;display: flex;flex-flow: row nowrap;overflow: hidden;align-items: center;gap: ${style.gap};}
            .${style.class} > * > * {background-color: #fff;height: calc(100% - ${style.margin}*2);margin: ${style.margin};width: 100%;}
            `
            document.body.appendChild(defStyles)
        }
    }

    initOptions() {
        this.options.defaultStyles ? this.initDefaultStyles(this.options.defaultStyles): null;
        this.currentSlide = this.options.startSlide ? this.options.startSlide : 1;
        this.perPage = this.options.perPage ? this.options.perPage : 1;
        this.perMove = this.options.perMove ? this.options.perMove : 1;
    }
    
    init() {
        this.initSlider();
        this.initOptions();
        this.changeSlide();
    }
}

const bruh = new Carousel({
    slider: '.js-carousel',
    options: {
        defaultStyles: {
            value: true,
            class: 'carouselDefStyles',
            // width: '500px',
            // height: '300px',
            // background: '#232323',
            gap: '20px',
            margin: '10px',
        },
        // startSlide: 1,
        perMove: 1,
    }
})

// console.log('-----------------Slider-----------------');