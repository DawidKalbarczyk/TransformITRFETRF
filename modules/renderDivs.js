const names_ITRF = ['ITRF2020', 'ITRF2014', 'ITRF2008', 'ITRF2005', 
    'ITRF2000', 'ITRF97', 'ITRF96', 'ITRF94', 'ITRF93','ITRF92',
    'ITRF91','ITRF90','ITRF89','ITRF88'];

const names_ETRF = ['ETRF2020', 'ETRF2014', 'ETRF2005', 'ETRF2000',
    'ETRF97', 'ETRF96', 'ETRF94', 'ETRF93','ETRF92',
    'ETRF91','ETRF90','ETRF89'];

let selected_itrfs = '';
let selected_etrfs = '';

function renderDivs(elem, dataset, legend) {
    if (legend == 'legend-from') {
        elem.innerHTML = `<legend id = 'legend-from'>Select starting reference frame</legend>`;
    } else if (legend == 'legend-to') {
        elem.innerHTML = `<legend id = 'legend-to'>Select output reference frame</legend>`;
    }
    if (dataset == names_ITRF) {
        const classy = 'itrfs-divs';
        for (const name_ of dataset) {
            const div = document.createElement('div');
            div.innerHTML = `${name_}`;
            div.classList.add(`${classy}`);
            elem.appendChild(div);
            div.addEventListener('click', function() {
                elem.querySelectorAll('.itrfs-divs').forEach(div => div.classList.remove('selected_itrf'));
                selected_itrfs = this.innerHTML;
                this.classList.add('selected_itrf');
                console.log(selected_itrfs);
            });
        }
    }
    else {
        const classy = 'etrfs-divs';
        for (const name_ of dataset) {
            const div = document.createElement('div');
            div.innerHTML = `${name_}`;
            div.classList.add(`${classy}`);
            elem.appendChild(div);
            div.addEventListener('click', function() {
                elem.querySelectorAll('.etrfs-divs').forEach(div => div.classList.remove('selected_etrf'));
                selected_etrfs = this.innerHTML;
                this.classList.add('selected_etrf');
                console.log(selected_etrfs);
            });
        }
    }
    
}

export {names_ITRF, names_ETRF, renderDivs, selected_itrfs, selected_etrfs};