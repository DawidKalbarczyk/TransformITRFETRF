import {names_ITRF, names_ETRF, renderDivs} from './modules/renderDivs.js';
import {selected_itrfs, selected_etrfs} from './modules/renderDivs.js';
const ITRF_fieldset = document.getElementById('select-container-itrf');
const ETRF_fieldset = document.getElementById('select-container-etrf');
const first_step_div = document.getElementById('content-div');
const second_step_div = document.getElementById('second-step-div');
const next_button = document.getElementById('next-button');
const third_step_div = document.getElementById('third-step-div');
const content = document.getElementById('textfield');
const calculate_button = document.getElementById('calculate-button');
const fourth_step_div = document.getElementById('fourth-step-div');

document.getElementById('itrf-to-etrf-button').addEventListener('click', function() {
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
    next_button.style.pointerEvents = 'auto';
});

document.getElementById('etrf-to-itrf-button').addEventListener('click', function() {
    ETRF_fieldset.style.display = 'flex';
    ETRF_fieldset.style.opacity = '1';
    ITRF_fieldset.style.display = 'none';
    ITRF_fieldset.style.opacity = '0';
    renderDivs(document.getElementById('fieldset_ETRF_2'), names_ETRF, 'legend-from');
    renderDivs(document.getElementById('fieldset_ITRF_2'), names_ITRF, 'legend-to');
    second_step_div.style.opacity = '1';
    if (!first_step_div.classList.contains('first-step-div-transformed')) {
        first_step_div.classList.add('first-step-div-transformed');
    }
    next_button.style.pointerEvents = 'auto';
});


next_button.addEventListener('click', async function() {
    const s_itrf = document.querySelector('.selected_itrf');
    const s_etrf = document.querySelector('.selected_etrf');
    
    if (s_itrf && s_etrf) {
        if (this.textContent === 'Next') {
            this.textContent = 'Back';
            second_step_div.style.left = '-120%';
            first_step_div.style.opacity = '0';
            first_step_div.style.transform = 'translateX(-300%)';
            await new Promise(resolve => setTimeout(resolve, 200));
            third_step_div.classList.toggle('third-step-div-transformed');
            fourth_step_div.classList.toggle('fourth-step-div-transformed');
        } else {
            this.textContent = 'Next';
            second_step_div.style.left = '35%';
            first_step_div.style.opacity = '1';
            await new Promise(resolve => setTimeout(resolve, 1));
            first_step_div.style.transform = 'translateX(-40%)';
            third_step_div.classList.toggle('third-step-div-transformed');
            fourth_step_div.classList.toggle('fourth-step-div-transformed');
            content.value = '';
        }


    } else {
        alert('Please select both a starting and an output reference frame before proceeding.');
    }
});


calculate_button.addEventListener('click', function() {
    console.log(`${content.value}`)
});