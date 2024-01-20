import create from './createElements';
import { renderContacts } from './render';
import {addContactData, getStorage, removeStorage,
  setStorage} from './serviceStorage';

const {createRow} = create;
export const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};
export const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', ev => {
    const target = ev.target;
    if (target.matches('.close') || target === formOverlay) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

export const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });
  // ! - работаю над этим сейчас
  list.addEventListener('click', ev => {
    const target = ev.target;
    if (target.closest('.del-icon')) {
      const phoneNumber =
          target.parentElement.parentElement.phoneLink.textContent;
      removeStorage(phoneNumber);
      target.closest('.contact').remove();
    }
  });
};
export const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData = new FormData(ev.target);

    const newContact = Object.fromEntries(formData);
    addContactPage(newContact, list);
    const currentStorage = getStorage();
    addContactData(currentStorage, newContact);
    setStorage(currentStorage);
    form.reset();
    closeModal();
  });
};
export const sortControl = (app, list) => {
  app.addEventListener('click', ev => {
    const target = ev.target;
    if (target.closest('.table__name')) {
      const currentStorage = getStorage();
      currentStorage.sort((a, b) => {
        {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        }
      });
      list.innerHTML = '';
      setStorage(currentStorage);
      renderContacts(list, currentStorage);
    }
    if (target.closest('.table__surname')) {
      const currentStorage = getStorage();
      currentStorage.sort((a, b) => {
        {
          if (a.surname > b.surname) {
            return 1;
          }
          if (a.surname < b.surname) {
            return -1;
          }
          return 0;
        }
      });
      list.innerHTML = '';
      setStorage(currentStorage);
      renderContacts(list, currentStorage);
    }
  });
};
export const hoverRow = (allRow, logo) => {
  const text = logo.textContent;
  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};
