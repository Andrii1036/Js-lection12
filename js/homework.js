// ---------------------------------------------------------------------------------------------------
// 1.
// Отримати відповідь з цього ресурсу відповідь, та вивести в документ об'єкти. Застилізувати, за допомоги css, щоб отримати 5 елементів в рядку.
// Для кожного елементу свій блок div.post
// Всі характеристики повинні мати свої блоки всередені div.post
// https://jsonplaceholder.typicode.com/posts

let url = 'https://jsonplaceholder.typicode.com/posts';

let createDocument = (posts) => {
    let postsWrapper = document.createElement('div');
    postsWrapper.style.cssText = 'max-width:1100px; margin:0 auto; display:flex; row-gap:10px; flex-wrap:wrap; padding:10px; justify-content:space-around'

    for (let post of posts) {
        let postCard = document.createElement('div');
        postCard.style.cssText = 'border: 1px solid black; width:19%; padding:10px'
        let postInfo = document.createElement('div');
        postInfo.style.cssText = 'border-bottom:1px solid black; '
        let postContent = document.createElement('div');
        postContent.style.cssText = 'display:flex;flex-direction:column; justify-content:space-around;height:90%'
        let userIdBlock = document.createElement('p');
        let postIdBlock = document.createElement('p');
        let postTitleBlock = document.createElement('h2');
        postTitleBlock.style.cssText = 'text-align:center; margin:5px 5px 15px 5px; text-decoration:underline;'
        let postContentBody = document.createElement('p');

        userIdBlock.innerText = `User ID: ${post.userId}`;
        postIdBlock.innerText = `Post ID: ${post.id}`;
        postTitleBlock.innerText = post.title;
        postContentBody.innerText = post.body;

        postContent.append(postTitleBlock, postContentBody);
        postInfo.append(userIdBlock, postIdBlock);
        postCard.append(postInfo, postContent);

        postsWrapper.appendChild(postCard);

    };
    document.body.appendChild(postsWrapper)
};
let getAndUseFetch = (url, action) => {
    fetch(url)
        .then(response => response.json())
        .then(value => action(value));
};
getAndUseFetch(url, createDocument)

// --------------------------------------------------------------------------------------------------

// 2.
// Отримати відповідь з цього ресурсу відповідь, та вивести в документ як в прикладі на занятті.
// Для кожного елементу свій блок div.comment
// Всі характеристики повинні мати свої блоки всередені div.comment
// https://jsonplaceholder.typicode.com/comments

let newUrl = ' https://jsonplaceholder.typicode.com/comments';

let createDocumentWithComents = (comments) => {
    let commentsWrapper = document.createElement('div');
    commentsWrapper.style.cssText = 'display:flex;max-width:1100px;flex-wrap:wrap; gap:10px;margin: 0 auto; padding:10px;justify-content:space-around';
    for (let comment of comments) {
        let commentCard = document.createElement('div');
        commentCard.style.cssText = 'border-top:1px solid black; width:45%; font-size:0';
        for (let key in comment) {
            let row = document.createElement('p');
            row.style.cssText = 'display:flex;'
            let keyName = document.createElement('p');
            keyName.style.cssText = 'border-bottom:1px solid black;border-right:1px solid black;border-left:1px solid black;width:20%;font-size:14px';
            let keyValue = document.createElement('p');
            keyValue.style.cssText = 'border-bottom:1px solid black;border-right:1px solid black;width:80%;font-size:14px'

            keyName.innerText = `${key}:`;
            keyValue.innerText = comment[key];
            row.append(keyName, keyValue);
            commentCard.appendChild(row);
        };
        commentsWrapper.appendChild(commentCard);
    };
    document.body.appendChild(commentsWrapper);
};

getAndUseFetch(newUrl, createDocumentWithComents);
// ---------------------------------------------------------------------