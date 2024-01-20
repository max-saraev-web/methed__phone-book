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
export default {
  createRow,
  createForm,
  createTable,
  createMain,
  createLogo,
  createFooter,
  createHeader,
  createButtonsGroup,
};
