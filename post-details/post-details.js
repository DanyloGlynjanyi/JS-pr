//     На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

let urlParams = new URLSearchParams(window.location.search);
let postID = urlParams.get('id');
let userId = urlParams.get('userId');

let createdPostDetails = document.getElementById('postDetails');
let createdComments = document.getElementById('creatorComments');

fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`)
    .then(response => response.json())
    .then(post => {
        console.log(post);
        for (const key in post) {
            let liCreator = document.createElement('li');
            liCreator.innerText = `${key}: ${JSON.stringify(post[key])}`;
            createdPostDetails.append(liCreator);
        }

        let buttEx = document.createElement('button');
        buttEx.innerText = 'Exit';
        buttEx.id = 'btnExit';
        buttEx.onclick = () => {
            location.href = `../index/index.html?userId=${userId}`;
        };

        let divEx = document.createElement('div');
        divEx.append(buttEx);
        createdPostDetails.append(divEx);
    });

fetch(`https://jsonplaceholder.typicode.com/posts/${postID}/comments`)
    .then(response => response.json())
    .then(comments => {
        for (const comment of comments) {
            let dComments = document.createElement('div');
            let pComment = document.createElement('p');
            pComment.innerText = `
        Comment by: ${comment.name} 
        Id: ${comment.id} 
        Text: ${comment.body} 
        Email: ${comment.email}`;

            dComments.appendChild(pComment);
            createdComments.appendChild(dComments);
            dComments.className = 'commentBlock';
        }
    });
