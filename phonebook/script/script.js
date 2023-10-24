'use strict';
// const data = [
//   {
//     name: 'Иван',
//     surname: 'Петров',
//     phone: '+79514545454',
//   },
//   {
//     name: 'Игорь',
//     surname: 'Семёнов',
//     phone: '+79999999999',
//   },
//   {
//     name: 'Семён',
//     surname: 'Иванов',
//     phone: '+79800252525',
//   },
//   {
//     name: 'Мария',
//     surname: 'Попова',
//     phone: '+79876543210',
//   },
// ];

{
  // ! - Пока не знаю как заюзать, но пусть будет
  const getLocalStorageData = () => Object.fromEntries(localStorage)
      .reduce((acc, [key, value]) => {
        let newValue;
        try {
          newValue = JSON.parse(value);
        } catch (err) {
          newValue = value;
        }
        return {
          ...acc,
          [key]: newValue,
        };
      },
      {});
  const addContactData = (arr, contact) => {
    arr.push(contact);
  };
  // ! - задание 1
  const getStorage = (key = 'phoneBook') =>
    (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []);
  // ! - задание 2
  const setStorage = (obj, key = 'phoneBook') => {
    localStorage.setItem(key, JSON.stringify(obj));
  };
  // ! - Задание 3
  const removeStorage = (num, key = 'phoneBook') => {
    const currentStorage = getStorage();
    const sortedStorage = currentStorage.filter(obj =>
      obj.phone !== num);
    localStorage.setItem(key, JSON.stringify(sortedStorage));
  };
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');

    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.headerContainer = headerContainer;
    header.append(headerContainer);

    return header;
  };

  const createFooter = title => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.footerContainer = footerContainer;
    footer.append(footerContainer);
    footerContainer.textContent = `Все права защищены ${title}`;

    return footer;
  };

  const createLogo = title => {
    const logo = document.createElement('h1');
    logo.classList.add('logo');
    logo.textContent = `Телефонный справочник. ${title}`;

    return logo;
  };

  const createMain = () => {
    const main = document.createElement('main');
    main.classList.add('main');

    const mainContainer = createContainer();
    main.mainContainer = mainContainer;
    main.append(mainContainer);

    return main;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });
    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th class="table__name">Имя</th>
        <th class="table__surname">Фамилия</th>
        <th>Телефон</th>
        <th>Изменить данные</th>
      </tr>
    `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title"></h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя: </label>
        <input class="form-input" name="name" id="name"
        type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия: </label>
        <input class="form-input" name="surname" id="surname"
        type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон: </label>
        <input class="form-input" name="phone" id="phone"
        type="number" required>
      </div>
    `);
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);

    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const footer = createFooter(title);
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const {form, overlay} = createForm();

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
    };
  };

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdEdit = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.classList.add('btn-edit');
    editButton.textContent = 'Редактировать';
    tdEdit.append(editButton);

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  const addContactPage = (contact, list) => {
    list.append(createRow(contact));
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);

    return allRow;
  };


  const hoverRow = (allRow, logo) => {
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

  const modalControl = (btnAdd, formOverlay) => {
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

  const deleteControl = (btnDel, list) => {
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
  const formControl = (form, list, closeModal) => {
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
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    // ! - Деструктуризация
    const {list, logo, btnAdd, btnDel, form, formOverlay} =
      renderPhoneBook(app, title);
    let allRow = renderContacts(list, getStorage());
    const {closeModal} = modalControl(btnAdd, formOverlay);

    // * - Функционал
    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    // setTimeout(() => {
    //   const contact = createRow({
    //     name: 'Дух',
    //     surname: 'Погасший',
    //     phone: '+71234567890',
    //   });
    //   list.append(contact);
    // }, 5000);

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
            // a должно быть равным b
            return 0;
          }
        });
        list.innerHTML = '';
        allRow = renderContacts(list, currentStorage);
        setStorage(currentStorage);
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
            // a должно быть равным b
            return 0;
          }
        });
        list.innerHTML = '';
        allRow = renderContacts(list, currentStorage);
        setStorage(currentStorage);
      }
    });
  };
  window.phoneBookInit = init;
}
