/* eslint-disable */

export const hideAlert = () => {
  const e = document.querySelector('.alert');
  if (e) e.parentElement.removeChild(e);
};

// type is success or error
export const showAlert = (type, msg, time = 4) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, time * 1000);
};
