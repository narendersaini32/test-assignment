/* eslint-disable */
// variables
const DAYS = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
};

// The below function is used to get day for the year
function getDayForYear(_date) {
    const _format= "mm/dd/yyyy";
  const formatLowerCase = _format.toLowerCase();
  const formatItems = formatLowerCase.split("/");
  const dateItems = _date.split("/");
  const monthIndex = formatItems.indexOf('mm');
  const dayIndex = formatItems.indexOf('dd');
  const yearIndex = formatItems.indexOf('yyyy');
  let month = parseInt(dateItems[monthIndex]);
  month -= 1;
  const formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
  return formatedDate.getDay();
}

// below function is used for getting initials of the name
function getInitials(nameString) {
  const nameArray = nameString.split(' ');
  return nameArray.length === 1 ? nameArray[0].charAt(0)
    : nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
}

// below function validate date using regex
function validateDate(s) {
  const bits = s.split('/');
  const d = new Date(bits[2], bits[1] - 1, bits[0]);
  return d && (d.getMonth() + 1) == bits[1];
}

// below function is used to clearOldData
function clearOldData() {
  const classPeople = document.getElementsByClassName('day__people');
  for (let i = 0; i < classPeople.length; i++) {
    classPeople[i].innerHTML = '';
  }
  const classDay = document.getElementsByClassName('cal__day');
  for (let i = 0; i < classDay.length; i++) {
    classDay[i].classList.add('day--empty');
  }
}

// below function is used to create Div
function createPersonDiv(name, birthday) {
  const initial = getInitials(name);
  const day = getDayForYear(birthday);
  console.log('TCL: createPersonDiv -> day', day);
  const div = document.createElement('div');
  div.className = 'day__person';
  div.innerHTML = initial;
  const dayCard = document.querySelector(`[data-day='${DAYS[day]}']`);
  if (dayCard) {
    dayCard.classList.remove('day--empty');
    const peopleDiv = dayCard.getElementsByClassName('day__people')[0];
    peopleDiv.appendChild(div);
  }
}

// below function is used to responsiveMaker
function responsiveMaker() {
  for (let day = 0; day <= 6; day++) {
    const dayCard = document.querySelector(`[data-day='${DAYS[day]}']`);
    if (dayCard) {
      const peopleDiv = dayCard.getElementsByClassName('day__people')[0];
      const rows = Math.ceil(Math.sqrt(peopleDiv.childElementCount));
      peopleDiv.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;
      peopleDiv.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
      if (peopleDiv.lastChild) {
        const width = peopleDiv.lastChild.offsetWidth;
        if (width * rows > peopleDiv.offsetWidth) {
          const personDiv = dayCard.getElementsByClassName('day__person');
          for (let i = 0; i < personDiv.length; i++) {
            personDiv[i].style.fontSize = '0.30em';
          }
        }
      }
    }
  }
}

// this function handles update button click
export const handleUpdateClick = () => {
  clearOldData();
  const dataInput = document.getElementById('textarea-input') || {};
  const year = document.getElementById('year-value').value;
  const invalidBirthdays = [];
  let birthdayData = [];

  if (dataInput.value) {
    birthdayData = eval(`(${dataInput.value})`);
  } else if (!birthdayData.length) {
    alert('Please enter birthday data');
    return;
  }

  if (year.length < 4) {
    return alert(`${year} year is not valid`);
  }

  birthdayData = birthdayData.filter(({ birthday }) => {
    if (birthday) {
      const dateObj = new Date(birthday);
      if (dateObj.getFullYear && (Number(year) === dateObj.getFullYear())) {
        return true;
      }
      return false;
    }
  });
  if (!birthdayData.length) {
    return alert(`No birthday in ${year}`);
  }
  birthdayData.sort((a, b) => (new Date(b.birthday) > new Date(a.birthday) ? 1 : -1));

  birthdayData.forEach(({ birthday, name }) => {
    validateDate(birthday)
      ? createPersonDiv(name, birthday, year)
      : invalidBirthdays.push(name);
  });

  responsiveMaker();

  if (invalidBirthdays.length) { alert(`Following People have invalid birthday year ${invalidBirthdays.join(', ')}`); }
};
