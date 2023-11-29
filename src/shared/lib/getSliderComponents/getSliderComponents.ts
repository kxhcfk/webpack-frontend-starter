const getSliderComponents = (sliderElement: HTMLDivElement) => {
    const wrapper = sliderElement.closest<HTMLDivElement>('.js-slider-wrapper');
    const navigation = wrapper.querySelector<HTMLDivElement>('.js-slider-navigation');
    const navigationPrev = navigation.querySelector<HTMLButtonElement>('.js-slider-navigation-button-prev');
    const navigationNext = navigation.querySelector<HTMLButtonElement>('.js-slider-navigation-button-next');
    
    return {
        wrapper,
        navigation,
        navigationPrev,
        navigationNext
    }
}

export {
    getSliderComponents
}