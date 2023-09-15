var slider = document.getElementById('inputB');

noUiSlider.create(slider, {
    animate: false,
    start: 3,
    step: 1,
    connect: [true, false],
    padding: [1, 0],
    direction: 'rtl',
    range: {
        'min': 0,
        'max': 5
    },
    pips: {
        mode: 'step',
        density: 20,
    },
});