// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнул
const magicWord = prompt('Enter "Yes" if you are ready for magic:');
const correctMagicWord = 'Yes';

if (magicWord !== correctMagicWord) {
    alert('Sorry, you are a muggle.');
} else {

    const url = new URL(' https://jsonplaceholder.typicode.com/users')
    fetch(url)
        .then(res => res.json())
        .then(users => {
            let userList = document.getElementById('userList');
            for (let user of users) {
                let userBlock = document.createElement('div');
                userBlock.className = 'user-info';

                let ul = document.createElement('ul');
                let liId = document.createElement('li');
                let liName = document.createElement('li');

                liId.innerText = `ID: ${user.id}`;
                liName.innerText = `Name: ${user.name}`;
                ul.append(liId, liName);

                let buttonDetails = document.createElement('button');
                buttonDetails.className = 'butt_det';
                buttonDetails.innerText = 'Details';

                let buttonDelete = document.createElement('button');
                buttonDelete.className = 'butt-del';
                buttonDelete.innerText = 'Delete';

                ul.appendChild(buttonDetails);
                ul.appendChild(buttonDelete);
                userBlock.appendChild(ul);
                userList.appendChild(userBlock);

                buttonDetails.onclick = () => {
                    location.href = `../User-details/user-details.html?userId=${user.id}`;
                }

                buttonDelete.onclick = () => {
                    userBlock.style.display = 'none';
                }
            }
        });
}
