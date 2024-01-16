// // На странице user-details.html:
// // 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// // 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// // (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// //     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.
let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('userId');

let userDetailsCont = document.getElementById('userDetails');

let url = new URL(`https://jsonplaceholder.typicode.com/users/${userId}`)

fetch(url)
    .then(res => res.json())
    .then(user => {
        for (let property in user) {
            let li = document.createElement('li');
            li.innerText = `${property}: `;
            userDetailsCont.append(li);

            let content = document.createElement('div');
            content.classList.add('indent');
            userDetailsCont.append(content);

            let value = user[property];
            if (typeof value === 'object') {
                content.innerText = `${JSON.stringify(value, null, 2).replace(/["{}]/g, '')}`;
            } else {
                content.textContent = JSON.stringify(value);
            }
        }
        postsButton.id = 'postsButton';
        postsButton.innerText = 'Posts of current user';
        postsButton.onclick = () => {
            userDetailsCont.style.display = 'none'
        }
        userDetailsCont.appendChild(postsButton);

        let exitDiv = document.createElement('div')
        let btnExit = document.createElement('button')
        btnExit.innerText = 'Go back'
        btnExit.id = 'btnGoBack';
        btnExit.onclick = () => {
            location.href = `../index/index.html?${userId}`
        }
        exitDiv.append(btnExit)
        userDetailsCont.append(exitDiv)

    })
let postsButton = document.createElement('button');

postsButton.addEventListener('click', function () {
    userDetailsCont.innerText = ''
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                let postBlock = document.createElement('div');
                let titleP = document.createElement('p');
                let detailsButton = document.createElement('button');

                postBlock.className = 'postBlock';
                titleP.className = 'postTitle';

                titleP.innerText = `title: ${post.title}`;
                postBlock.append(titleP);

                detailsButton.innerText = 'View Details';
                detailsButton.id = 'detailsButton';
                detailsButton.onclick = () => {
                    location.href = `../post-details/post-details.html?id=${post.id}`;
                };

                postBlock.append(detailsButton);
                let userPosts = document.getElementById('userPosts');
                userPosts.append(postBlock);
            })
            let divExit = document.createElement('div');
            let exitBtn = document.createElement('button');
            exitBtn.innerText = 'Go back';
            exitBtn.id = 'btnGoBack';
            exitBtn.className = 'btnGo';
            exitBtn.onclick = () => {
                location.href = `../User-details/user-details.html?userId=${userId}`
            }
            divExit.append(exitBtn)
            document.body.append(divExit);
        })
});
