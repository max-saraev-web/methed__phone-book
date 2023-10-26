import {renderPhoneBook, renderContacts} from './modules/render.js';
import {getStorage} from './modules/serviceStorage.js';
import * as control from './modules/control.js';

const {sortControl, hoverRow, deleteControl, formControl,
  modalControl} = control;
{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {list, logo, btnAdd, btnDel, form, formOverlay} =
      renderPhoneBook(app, title);
    const allRow = renderContacts(list, getStorage());
    const {closeModal} = modalControl(btnAdd, formOverlay);

    // * - Функционал
    hoverRow(allRow, logo);
    sortControl(app, list);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
  };
  window.phoneBookInit = init;
}
