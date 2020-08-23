$('.photo').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    adaptiveHeight: true,
    useTransform: true,
    speed: 400,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: '<i class="slick-btn slick-next fa fa-angle-right fa-2x" aria-hidden="true"></i>',
    prevArrow: '<i class="slick-btn slick-prev fa fa-angle-left fa-2x" aria-hidden="true"></i>',
    cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
});
