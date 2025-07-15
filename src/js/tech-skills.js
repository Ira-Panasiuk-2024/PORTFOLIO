const skills = [
  'JAVASCRIPT',
  'TYPESCRIPT',
  'REACT',
  'REDUX',
  'NODE.JS',
  'Express.js',
  'MongoDB (Mongoose)',
  'Firebase (Firestore/Realtime Database)',
  'REST API',
  'HTML',
  'CSS3',
  'SASS',
  'Git',
  'GitHub',
  'VSCode',
  'Postman',
  'Vite',
  'Swagger',
];

function populateSkillsList(elementId, skillsArray, itemClassName = '') {
  const ulElement = document.getElementById(elementId);

  if (!ulElement) {
    console.error(`Елемент з ID "${elementId}" не знайдено.`);
    return;
  }

  const fragment = document.createDocumentFragment();

  skillsArray.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    if (itemClassName) {
      li.classList.add(itemClassName);
    }
    fragment.appendChild(li);
  });

  ulElement.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', () => {
  populateSkillsList('evenSkillsList', skills);
  populateSkillsList('evenSkillsListDuplicate', skills);

  populateSkillsList('unevenSkillsList', skills, 'uneven-item');
  populateSkillsList('unevenSkillsListDuplicate', skills, 'uneven-item');
});
