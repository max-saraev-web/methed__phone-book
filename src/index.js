import {renderPhoneBook, renderContacts} from './script/render';
import {getStorage} from './script/serviceStorage';
import * as control from './script/control';

// ? styles
import './scss/index.scss';

// ? html
import './index.html';


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
