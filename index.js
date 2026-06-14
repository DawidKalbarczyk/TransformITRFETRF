import {names_ITRF, names_ETRF, renderDivs} from './modules/renderDivs.js';
import {selected_itrfs, selected_etrfs} from './modules/renderDivs.js';
const ITRF_fieldset = document.getElementById('select-container-itrf');
const ETRF_fieldset = document.getElementById('select-container-etrf');
const first_step_div = document.getElementById('content-div');
const second_step_div = document.getElementById('second-step-div');

document.getElementById('itrf-to-etrf-button').addEventListener('click', function() {
    document.body.style.backgroundImage = "url('images_resized/milky-way-galaxy-dark-night-sky.jpg')";
    ITRF_fieldset.style.display = 'flex';
    ITRF_fieldset.style.opacity = '1';
    ETRF_fieldset.style.display = 'none';
    ETRF_fieldset.style.opacity = '0';
    renderDivs(document.getElementById('fieldset_ITRF_1'), names_ITRF, 'legend-from');
    renderDivs(document.getElementById('fieldset_ETRF_1'), names_ETRF, 'legend-to');
    second_step_div.style.opacity = '1';
    if (!first_step_div.classList.contains('first-step-div-transformed')) {
        first_step_div.classList.add('first-step-div-transformed');
    }
});

document.getElementById('etrf-to-itrf-button').addEventListener('click', function() {
    document.body.style.backgroundImage = "url('images_resized/milky-way-galaxy-dark-night-sky.jpg')";
    ETRF_fieldset.style.display = 'flex';
    ETRF_fieldset.style.opacity = '1';
    ITRF_fieldset.style.display = 'none';
    ITRF_fieldset.style.opacity = '0';
    renderDivs(document.getElementById('fieldset_ETRF_2'), names_ETRF, 'legend-from');
    renderDivs(document.getElementById('fieldset_ITRF_2'), names_ITRF, 'legend-to');
    second_step_div.style.opacity = '1';
});


