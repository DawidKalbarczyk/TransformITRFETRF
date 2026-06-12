import cv2
import os

img_paths = os.listdir('images')

for img_path in img_paths:
    if img_path.endswith(('.jpg', '.png')):
        img = cv2.imread(f'images/{img_path}')
        resized_img = cv2.resize(img, (3840, 2160))
        cv2.imwrite(f'images_resized/{img_path}', resized_img)