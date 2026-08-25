const form = document.querySelector('#guest-form');
const nameInput = document.querySelector('#guest-name');
const nameError = document.querySelector('#name-error');
const greetingName = document.querySelector('#greeting strong');
const card = document.querySelector('#invitation-card');
const resetButton = document.querySelector('#reset-button');
const downloadButton = document.querySelector('#download-button');
const whatsappButton = document.querySelector('#whatsapp-button');
const actionButtons = [resetButton, downloadButton, whatsappButton];
const initialName = 'Invitado';
const locationUrl = 'https://maps.app.goo.gl/Biu3HGNGmLJcbiXt6';

function getGuestName() {
  return nameInput.value.trim();
}

function validateName() {
  const name = getGuestName();
  const isValid = name.length > 0;
  nameInput.setAttribute('aria-invalid', String(!isValid));
  nameError.textContent = isValid ? '' : 'Escribe el nombre del invitado para continuar.';
  return isValid;
}

function updateGreeting() {
  const name = getGuestName() || initialName;
  greetingName.textContent = name;
  if (getGuestName()) {
    nameError.textContent = '';
    nameInput.setAttribute('aria-invalid', 'false');
  }
}

async function createCardImage() {
  await document.fonts.ready;
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  return html2canvas(card, {
    scale: 2,
    backgroundColor: '#fffaf0',
    useCORS: true,
    logging: false
  });
}

function canvasToFile(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(new File([blob], 'invitacion-cumpleanos-jasmin.png', { type: 'image/png' })), 'image/png');
  });
}

nameInput.addEventListener('input', updateGreeting);
nameInput.addEventListener('blur', validateName);
nameInput.addEventListener('click', () => {
  if (nameInput.value === initialName) {
    nameInput.value = '';
    updateGreeting();
  }
});

resetButton.addEventListener('click', () => {
  nameInput.value = initialName;
  nameInput.setAttribute('aria-invalid', 'false');
  nameError.textContent = '';
  updateGreeting();
  nameInput.focus();
});

downloadButton.addEventListener('click', async () => {
  if (!validateName()) {
    nameInput.focus();
    return;
  }

  if (typeof html2canvas !== 'function') {
    nameError.textContent = 'No se pudo preparar la imagen. Comprueba tu conexión e inténtalo de nuevo.';
    return;
  }

  const originalLabel = downloadButton.innerHTML;
  downloadButton.disabled = true;
  downloadButton.textContent = 'Preparando...';

  try {
    const canvas = await createCardImage();
    const link = document.createElement('a');
    link.download = 'invitacion-cumpleanos-jasmin.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    nameError.textContent = 'No se pudo descargar la tarjeta. Inténtalo de nuevo.';
  } finally {
    downloadButton.disabled = false;
    downloadButton.innerHTML = originalLabel;
  }
});

whatsappButton.addEventListener('click', async () => {
  if (!validateName()) {
    nameInput.focus();
    return;
  }

  if (typeof html2canvas !== 'function') {
    nameError.textContent = 'No se pudo preparar la imagen. Comprueba tu conexión e inténtalo de nuevo.';
    return;
  }

  const originalLabel = whatsappButton.innerHTML;
  whatsappButton.disabled = true;
  whatsappButton.textContent = 'Preparando...';

  try {
    const canvas = await createCardImage();
    const file = await canvasToFile(canvas);
    const message = `Invitación al cumpleaños de Jasmin. Te espero el sábado 29/08 a las 5:00 p. m. en Casa de Jasmin (San Juan). Ubicación: ${locationUrl}`;

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ title: 'Cumpleaños de Jasmin', text: message, files: [file] });
    } else {
      const link = document.createElement('a');
      link.download = file.name;
      link.href = URL.createObjectURL(file);
      link.click();
      URL.revokeObjectURL(link.href);
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    }
  } catch (error) {
    if (error.name !== 'AbortError') nameError.textContent = 'No se pudo preparar el envío. Inténtalo de nuevo.';
  } finally {
    whatsappButton.disabled = false;
    whatsappButton.innerHTML = originalLabel;
  }
});

form.addEventListener('submit', (event) => event.preventDefault());
updateGreeting();

async function enableActionsWhenReady() {
  await document.fonts.ready;
  if (typeof html2canvas === 'function') {
    actionButtons.forEach((button) => { button.disabled = false; });
  }
}

enableActionsWhenReady();
