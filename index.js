import {names_ITRF, names_ETRF, renderDivs} from './modules/renderDivs.js';
import {selected_itrfs, selected_etrfs} from './modules/renderDivs.js';
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.getElementById(selector);
const ITRF_fieldset = $$('select-container-itrf');
const ETRF_fieldset = $$('select-container-etrf');
const first_step_div = $$('content-div');
const second_step_div = $$('second-step-div');
const next_button = $$('next-button');
const third_step_div = $$('third-step-div');
const content = $$('textfield');
const calculate_button = $$('calculate-button');
const fourth_step_div = $$('fourth-step-div');

$$('guide-div').addEventListener('click', async function() {
    if (!document.getElementById('guide-window')) {
        const guide_window = document.createElement('div');
        guide_window.id = 'guide-window';
        guide_window.style.opacity = '0';
        guide_window.innerHTML = `
            <img id="guide-close-icon" src="images/close-icon.png" alt="Close">
            <h2>How to use this tool?</h2>
            <ul>
                <li>First, select the type of transformation you want to perform: ITRF to ETRF or ETRF to ITRF.</li>
                <li>Then, choose the specific reference frames for both the starting and output frames by clicking on the respective options.</li>
                <li>After making your selections, click the "Next" button to proceed to the next step.</li>
                <li>In the next step, you need to paste the input data for the transformation with specific format as follows: Point_ID;X;Y;Z.</li>
            </ul>
        `;
        document.body.appendChild(guide_window);
        await new Promise(resolve => setTimeout(resolve, 1));
        guide_window.style.opacity = '1';

        $$('guide-close-icon').addEventListener('click', async function() {
            guide_window.style.opacity = '0';
            await new Promise(resolve => setTimeout(resolve, 1500));
            document.body.removeChild(guide_window);
        });
    }
});

$$('itrf-to-etrf-button').addEventListener('click', function() {
    ITRF_fieldset.style.display = 'flex';
    ITRF_fieldset.style.opacity = '1';
    ETRF_fieldset.style.display = 'none';
    ETRF_fieldset.style.opacity = '0';
    renderDivs($$('fieldset_ITRF_1'), names_ITRF, 'legend-from');
    renderDivs($$('fieldset_ETRF_1'), names_ETRF, 'legend-to');
    second_step_div.style.opacity = '1';
    if (!first_step_div.classList.contains('first-step-div-transformed')) {
        first_step_div.classList.add('first-step-div-transformed');
    }
    next_button.style.pointerEvents = 'auto';
});

$$('etrf-to-itrf-button').addEventListener('click', function() {
    ETRF_fieldset.style.display = 'flex';
    ETRF_fieldset.style.opacity = '1';
    ITRF_fieldset.style.display = 'none';
    ITRF_fieldset.style.opacity = '0';
    renderDivs($$('fieldset_ETRF_2'), names_ETRF, 'legend-from');
    renderDivs($$('fieldset_ITRF_2'), names_ITRF, 'legend-to');
    second_step_div.style.opacity = '1';
    if (!first_step_div.classList.contains('first-step-div-transformed')) {
        first_step_div.classList.add('first-step-div-transformed');
    }
    next_button.style.pointerEvents = 'auto';
});


next_button.addEventListener('click', async function() {
    const s_itrf = $('.selected_itrf');
    const s_etrf = $('.selected_etrf');
    
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