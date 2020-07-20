let input = null;
let button = null;
let userList = null;
let userCount = null;
let statistics = null;
let data = null;
let allUsers = [];
let newUserList = [];
let tabUsers = null;
let tabStatistics = null;

window.addEventListener('load', () => {
  input = document.querySelector('#search');
  button = document.querySelector('#button');
  userList = document.querySelector('.users-list');
  userCount = document.querySelector('#userCount');
  statistics = document.querySelector('.statistics');
  data = document.querySelector('#data');
  tabUsers = document.querySelector('#tabUsers');
  tabStatistics = document.querySelector('#tabStatistics');
  preventFormSubmit();
  fetchUsers();
  input.addEventListener('keyup', handleInput);
  button.addEventListener('click', handleButtonClick);
});

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();
  allUsers = json.results.map((user) => {
    const { gender, name, dob, picture } = user;
    return {
      gender: gender,
      name: name.first + ' ' + name.last,
      age: dob.age,
      picture: picture.thumbnail,
    };
  });
}

function handleInput(event) {
  if (event.target.value.length < 1) {
    toggleButton(false);
  } else {
    toggleButton(true);
  }
}

function toggleButton(enabled) {
  if (enabled) {
    button.removeAttribute('disabled');
    button.setAttribute('enabled', '');
  } else {
    button.setAttribute('disabled', '');
  }
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function renderUserList(input) {
  newUserList = doFilter(input);
  text.innerHTML = newUserList.length + ' user(s) found';
  let usersHTML = '<div>';
  newUserList.forEach((user) => {
    const { gender, name, age, picture } = user;
    const userHTML = `
    <div class='user'>
      <div>
        <img src="${picture}" alt="${picture}">
      </div>
      <div>
        ${name}, ${age}
      </div>
    </div>
    `;
    usersHTML += userHTML;
  });
  usersHTML += '</div>';
  tabUsers.innerHTML = usersHTML;
}

function doFilter(name) {
  return allUsers.filter((user) =>
    user.name.toLowerCase().includes(name.toLowerCase())
  );
}

function handleButtonClick(event) {
  renderUserList(event.path[1][0].value);
  renderStatistics(newUserList);
}

function renderStatistics(newUserList) {
  if (newUserList.length > 0) {
    const male = newUserList.filter(
      (user) => user.gender.toLowerCase() === 'male'
    );
    const female = newUserList.filter(
      (user) => user.gender.toLowerCase() === 'female'
    );
    const sum = newUserList.reduce((acc, curr) => {
      return acc + curr.age;
    }, 0);
    const average = sum / newUserList.length;
    text2.innerHTML = 'Statistics';
    let statisticsHTML = `
  <div class='statistic'>
    <div>
      Male: ${male.length}
    </div>
    <div>
      Female: ${female.length}
    </div>
    <div>
      Ages Sum:  ${sum}
    </div>
    <div>
      Ages Average: ${average}
    </div>
  </div>
  `;
    tabStatistics.innerHTML = statisticsHTML;
  }
}
