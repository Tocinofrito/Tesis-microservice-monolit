import cv2
import numpy as np
from matplotlib import pyplot as plt

# Definir el rango de la función senoidal
x = np.linspace(0, 8 * np.pi, 256)

# Calcular los valores de la función senoidal
y = np.sin(x)

# Escalar los valores a un rango de 0 a 255 para la visualización
scaled_y = ((y - y.min()) / (y.max() - y.min()) * 255).astype(np.uint8)

# Crear una matriz de imagen en blanco
image = np.zeros((256,256), dtype=np.uint8)

# Rellenar la matriz de imagen con los valores de la función senoidal
for i in range(256):
    image[i, :] = scaled_y

# Voltear la imagen verticalmente para que la parte superior sea el principio de la función
image = cv2.flip(image, 0)

# Girar la matriz
rotated_image = cv2.rotate(image, cv2.ROTATE_90_COUNTERCLOCKWISE)

# Sumar la imagen original con la imagen girada
result_image = cv2.add(image, rotated_image)

# Aplicar la Transformada de Fourier
f_transform = np.fft.fft2(result_image)
f_transform_shifted = np.fft.fftshift(f_transform)
magnitude_spectrum = np.log(np.abs(f_transform_shifted) + 1)
#Mostrar imagen de seno:
cv2.imshow('seno',image)
cv2.imshow('seno volteado', rotated_image)

# Mostrar la imagen resultante y su espectro de magnitud
plt.subplot(121), plt.imshow(result_image, cmap='gray')
plt.title('Imagen Resultante'), plt.xticks([]), plt.yticks([])
plt.subplot(122), plt.imshow(magnitude_spectrum, cmap='gray')
plt.title('Espectro de Magnitud'), plt.xticks([]), plt.yticks([])
plt.show()