import os
import numpy as np
import matplotlib.pyplot as plt

np.set_printoptions(precision=3, suppress=True)
os.makedirs('results', exist_ok=True)
data = []

# Format pliku: ID;X;Y;Z
with open('punkty_ECEF.txt', 'r') as file:
    for line in file.read().splitlines():
        single = line.split(';')
        data.append(single)

t_2026 = float(2026.0) + float(111/365)

coords_2020 = {}
coords_2000 = {}
########################### ETAP ITRF 2020 do ITRF 2000 ##############################
ITRF_2020_2000 = {
        'T1': -0.2,
        'T1_rate': 0.1,
        'T2': 0.8,
        'T2_rate': 0.0,
        'T3': -34.2,
        'T3_rate': -1.7,
        'D': 2.25,
        'D_rate': 0.11,
        'R1': 0,
        'R1_rate': 0,
        'R2': 0,
        'R2_rate': 0,
        'R3': 0,
        'R3_rate': 0
    }

mas = np.pi / (180*60*60*1000) 

ITRF_TRANS_PARAMS = {
    'T1': (ITRF_2020_2000['T1'] + ITRF_2020_2000['T1_rate'] * (t_2026 - 2015.0))*1e-3,
    'T2': (ITRF_2020_2000['T2'] + ITRF_2020_2000['T2_rate'] * (t_2026 - 2015.0))*1e-3,
    'T3': (ITRF_2020_2000['T3'] + ITRF_2020_2000['T3_rate'] * (t_2026 - 2015.0))*1e-3,
    'D': (ITRF_2020_2000['D'] + ITRF_2020_2000['D_rate'] * (t_2026 - 2015.0))*1e-9,
    'R1': (ITRF_2020_2000['R1'] + ITRF_2020_2000['R1_rate'] * ((t_2026 - 2015.0)))*mas,
    'R2': (ITRF_2020_2000['R2'] + ITRF_2020_2000['R2_rate'] * ((t_2026 - 2015.0)))*mas,
    'R3': (ITRF_2020_2000['R3'] + ITRF_2020_2000['R3_rate'] * ((t_2026 - 2015.0)))*mas
}

for d in data:
    COORDS_ITRF_2020 = np.matrix([[d[1]], 
                                [d[2]], 
                                [d[3]]], dtype=float)

    T_MATRIX = np.matrix([[ITRF_TRANS_PARAMS['T1']],
                        [ITRF_TRANS_PARAMS['T2']],
                        [ITRF_TRANS_PARAMS['T3']]], dtype=float)

    R_MATRIX = np.matrix([[ITRF_TRANS_PARAMS['D'],-ITRF_TRANS_PARAMS['R3'], ITRF_TRANS_PARAMS['R2']],
                        [ITRF_TRANS_PARAMS['R3'], ITRF_TRANS_PARAMS['D'], -ITRF_TRANS_PARAMS['R1']],
                        [-ITRF_TRANS_PARAMS['R2'], ITRF_TRANS_PARAMS['R1'], ITRF_TRANS_PARAMS['D']]], dtype=float)

    COORDS_ITRF_2000 = COORDS_ITRF_2020 + T_MATRIX + R_MATRIX * COORDS_ITRF_2020
    coords_2020[d[0]] = COORDS_ITRF_2020
    coords_2000[d[0]] = COORDS_ITRF_2000
    


########################### ETAP ITRF 2020 do ITRF 2000 ##############################





########################### ETAP ITRF 2000 do ETRF 2000 ##############################

ITRF_2000_ETRF_2000 = {
        'T1': 54.0,
        'T1_rate': 0.0,
        'T2': 51.0,
        'T2_rate': 0.0,
        'T3': -48.0,
        'T3_rate': 0.0,
        'D': 0.0,
        'D_rate': 0.0,
        'R1': 1.701,
        'R1_rate': 0.081,
        'R2': 10.290,
        'R2_rate': 0.490,
        'R3': -16.632,
        'R3_rate': -0.792
    }

ETRF_TRANS_PARAMS = {
    'T1': (ITRF_2000_ETRF_2000['T1'] + ITRF_2000_ETRF_2000['T1_rate'] * (t_2026 - 2010.0))*1e-3,
    'T2': (ITRF_2000_ETRF_2000['T2'] + ITRF_2000_ETRF_2000['T2_rate'] * (t_2026 - 2010.0))*1e-3,
    'T3': (ITRF_2000_ETRF_2000['T3'] + ITRF_2000_ETRF_2000['T3_rate'] * (t_2026 - 2010.0))*1e-3,
    'D': (ITRF_2000_ETRF_2000['D'] + ITRF_2000_ETRF_2000['D_rate'] * (t_2026 - 2010.0))*1e-9,
    'R1': (ITRF_2000_ETRF_2000['R1'] + ITRF_2000_ETRF_2000['R1_rate'] * ((t_2026 - 2010.0)))*mas,
    'R2': (ITRF_2000_ETRF_2000['R2'] + ITRF_2000_ETRF_2000['R2_rate'] * ((t_2026 - 2010.0)))*mas,
    'R3': (ITRF_2000_ETRF_2000['R3'] + ITRF_2000_ETRF_2000['R3_rate'] * ((t_2026 - 2010.0)))*mas
}

T_MATRIX = np.matrix([[ETRF_TRANS_PARAMS['T1']],
                    [ETRF_TRANS_PARAMS['T2']],
                    [ETRF_TRANS_PARAMS['T3']]], dtype=float)

R_MATRIX = np.matrix([[ETRF_TRANS_PARAMS['D'],-ETRF_TRANS_PARAMS['R3'], ETRF_TRANS_PARAMS['R2']],
                    [ETRF_TRANS_PARAMS['R3'], ETRF_TRANS_PARAMS['D'], -ETRF_TRANS_PARAMS['R1']],
                    [-ETRF_TRANS_PARAMS['R2'], ETRF_TRANS_PARAMS['R1'], ETRF_TRANS_PARAMS['D']]], dtype=float)

coords_ETRF_2000 = {}
diff_final = {}

for key in coords_2000:
    COORDS_ETRF_2000 = coords_2000[key] + T_MATRIX + R_MATRIX * coords_2000[key]
    coords_ETRF_2000[key] = COORDS_ETRF_2000
    diff = coords_2020[key] - coords_ETRF_2000[key]
    diff_3D = np.sqrt(diff[0,0]**2 + diff[1,0]**2 + diff[2,0]**2)
    diff_ETRF_ITRF = np.matrix([[diff[0,0]], [diff[1,0]], [diff[2,0]], [diff_3D]])
    diff_final[key] = diff_ETRF_ITRF


with open('results/wyniki.txt', 'w') as f:
    f.write('WSP ITRF 2020:\n')
    f.write('  Format: [X,              Y,              Z][m]\n')
    for key, value in coords_2020.items():
        f.write(f'  {key}: {np.round(value, 3).T}\n')
    
    f.write('\nWSP ITRF 2000:\n')
    f.write('  Format: [X,              Y,              Z][m]\n')
    for key, value in coords_2000.items():
        f.write(f'  {key}: {np.round(value, 3).T}\n')
    
    f.write('\nWSP ETRF 2000:\n')
    f.write('  Format: [X,              Y,              Z][m]\n')
    for key, value in coords_ETRF_2000.items():
        f.write(f'  {key}: {np.round(value, 3).T}\n')

    f.write('\nRóżnice [m]:\n')
    f.write('  Format: [dX,     dY,     dZ,     3D][m]\n')
    for key, value in diff_final.items():
        f.write(f'  {key}: {value.T}\n')

