// 1.
// Отримати відповідь з цього ресурсу відповідь, та вивести в документ як в прикладі на занятті
// https://jsonplaceholder.typicode.com/users
// кожному елементу юзера створити кнопку, при клику на яку в окремий блок виводяться всі пости поточного юзера.
// Кожному елементу post створити кнопку, при клику на яку в окремий блок виводяться всі коментарі поточного поста

let url = 'https://jsonplaceholder.typicode.com/users';
let userPostsUrl = 'https://jsonplaceholder.typicode.com/posts?userId=';
let commentsUrl = 'https://jsonplaceholder.typicode.com/comments?postId=';
let usersWrapper = document.createElement('div');
usersWrapper.style.cssText = 'display:flex;gap:15px; flex-wrap:wrap; max-width:800px; margin:0 auto; justify-content:space-between; padding:15px;'

let showCommentsOfPost = (array, id) => {
    let commentsWrapper = document.createElement('div');
    commentsWrapper.id = `comments${id}`;
    commentsWrapper.style.cssText = 'width:100%;padding:15px; margin-top:15px;';

    for (let comment of array) {
        let commentCard = document.createElement('div');
        commentCard.style.cssText = 'border-right:1px solid black;border-bottom:1px solid black; padding:10px; margin-bottom:20px;'
        let commentName = document.createElement('h3');
        commentName.style.cssText = 'margin-bottom:15px';
        let commentEmail = document.createElement('p');
        commentEmail.style.cssText = 'margin-bottom:15px';
        let commentBody = document.createElement('p');
        let mailAnchor = document.createElement('a');
        mailAnchor.href = `mailto:${comment.email}`;

        mailAnchor.innerText = comment.email;
        commentName.innerText = comment.name;
        commentBody.innerText = comment.body;

        commentEmail.appendChild(mailAnchor)
        commentCard.append(commentName, commentEmail, commentBody)
        commentsWrapper.appendChild(commentCard)

    };
    document.getElementById(`post${id}`).appendChild(commentsWrapper)
};

let showPostsOfUser = (array, id) => {
    let postsWrapper = document.createElement('div');
    postsWrapper.id = `posts${id}`;
    postsWrapper.style.cssText = 'width:100%;padding:15px; margin-top:15px;';

    for (let post of array) {
        let postCard = document.createElement('div');
        postCard.id = `post${post.id}`;
        postCard.style.cssText = 'border-left:1px solid black;border-bottom:1px solid black; padding:10px; margin-bottom:20px;';
        let postTitle = document.createElement('h3');
        postTitle.style.cssText = 'margin-bottom:15px;'
        let postBody = document.createElement('p');
        let button = document.createElement('button');
        button.style.cssText = 'width:100%; margin-top:15px; background-color:yellow;'
        button.innerText = 'All comments to this post';

        let buttonTrue = false;

        button.onclick = function() {
            let commentsBlock = document.getElementById(`comments${post.id}`);
            buttonTrue = !buttonTrue;
            if (buttonTrue) {
                getAndUseFetch(`${commentsUrl}${post.id}`, showCommentsOfPost, post.id)
            } else { commentsBlock.remove() };
        };

        postTitle.innerText = post.title;
        postBody.innerText = post.body;

        postCard.append(postTitle, postBody, button);
        postsWrapper.appendChild(postCard);
    };

    document.getElementById(id).appendChild(postsWrapper);

};

let createDocumentWithUsers = (array) => {
    for (let item of array) {
        let userCard = document.createElement('div');
        userCard.id = item.id
        userCard.style.cssText = 'border:1px solid black; padding:15px; width:100%;background-color:rgb(244, 244, 244)'
        let buttonUser = document.createElement('button');
        buttonUser.style.cssText = 'margin-top:20px; width:100%;background-color: yellow;'
        buttonUser.innerText = 'All posts of this user';

        let buttonTrue = false;

        buttonUser.onclick = function() {
            let blockWithPosts = document.getElementById(`posts${item.id}`);
            buttonTrue = !buttonTrue;
            if (buttonTrue) {
                getAndUseFetch(`${userPostsUrl}${item.id}`, showPostsOfUser, item.id);
            } else {
                blockWithPosts.remove();
            }
        }

        workWithObject(userCard, item)
        userCard.appendChild(buttonUser)
        usersWrapper.appendChild(userCard);

        function workWithObject(plaseWhereWork, item) {
            for (let key in item) {
                let row = document.createElement('div');
                row.style.cssText = 'display:flex;border:1px solid black;'
                let keyName = document.createElement('p');
                keyName.style.cssText = 'border-right:1px solid black; width:100px'
                let keyValue = document.createElement('p');
                keyName.innerText = `${key}:`;
                if (typeof item[key] === 'object') {
                    workWithObject(keyValue, item[key])
                } else {
                    keyValue.innerText = item[key];
                };

                row.append(keyName, keyValue);
                plaseWhereWork.appendChild(row);
            };
        };
    };
    document.body.appendChild(usersWrapper);
};

function getAndUseFetch(url, action, id) {
    fetch(url)
        .then(response => response.json())
        .then(value => action(value, id));
};


getAndUseFetch(url, createDocumentWithUsers)