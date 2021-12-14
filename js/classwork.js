// 1.
// Отримати відповідь з цього ресурсу відповідь, та вивести в документ як в прикладі на занятті
// https://jsonplaceholder.typicode.com/posts
// зробити кнопку до кожного поста. при кліку на яку виводяться в окремий блок всі коментарі поточного поста



// ПИТАННЯ????????????????????????????????
// як доцільніше робити? спочатку дістати всю можливу інформацію з сервера собі в якусь перемінну чи в return функції, а вже потім фільтровано її 
// видавати відповідно до запитів користувача? чи кожного разу при потребі робити новий запит для отримання конкретної інфи?? 

let url = 'https://jsonplaceholder.typicode.com/posts';
let commentsUrl = 'https://jsonplaceholder.typicode.com/comments?postId='
let popUp = document.createElement('div');
popUp.className = 'popup'
let popupContent = document.createElement('div');
popupContent.className = 'popup_content';
popUp.appendChild(popupContent);
document.body.appendChild(popUp);

popUp.onclick = function() {
    this.classList.remove('active')
}

const showAllComments = (comments) => {
    popupContent.innerText = '';
    let commentsWrapper = document.createElement('div');
    commentsWrapper.style.cssText = 'padding:15px'
    for (let comment of comments) {
        let commentCard = document.createElement('div');
        commentCard.style.cssText = 'border:1px solid black; gap:10px; display:flex; flex-direction:column'
        let commentName = document.createElement('h2');
        let commentEmail = document.createElement('h4');
        let commentBody = document.createElement('p');
        let mailAnchor = document.createElement('a');

        mailAnchor.href = `mailto:${comment.email}`;
        mailAnchor.innerText = comment.email;
        commentName.innerText = comment.name;
        commentBody.innerText = comment.body;

        commentEmail.appendChild(mailAnchor);
        commentCard.append(commentName, commentEmail, commentBody);
        commentsWrapper.appendChild(commentCard);
    };
    popupContent.appendChild(commentsWrapper)
}

const createDocumentWithPosts = (value) => {
    let postsWrapper = document.createElement('div');
    postsWrapper.style.cssText = 'display:flex; max-width:1100px; margin:0 auto; justify-content:space-around; flex-wrap:wrap; gap:10px'
    for (let post of value) {
        let postCard = document.createElement('div');
        postCard.style.cssText = 'width:45%; background-color: rgb(204, 204, 204);padding:15px;display:flex; flex-direction:column;justify-content:space-between'
        let postInfo = document.createElement('div');
        let button = document.createElement('button');
        button.style.cssText = 'margin-top:10px;'
        button.innerText = 'show all comments'
        button.onclick = function() {
            let popup = document.getElementsByClassName('popup')[0];
            popup.classList.add('active');
            getAndUseFetch(`${commentsUrl}${post.id}`, showAllComments)
        };
        for (let key in post) {
            let row = document.createElement('p');
            row.style.cssText = 'border:1px solid black; display:flex;';
            let keyName = document.createElement('p');
            keyName.style.cssText = 'width:20%'
            let keyValue = document.createElement('p');
            keyValue.style.cssText = 'width:80%;border-left:1px solid black;'

            keyName.innerText = `${key}:`;
            keyValue.innerText = post[key];

            row.append(keyName, keyValue);
            postInfo.appendChild(row);
        };
        postCard.append(postInfo, button)
        postsWrapper.appendChild(postCard);
    };
    document.body.appendChild(postsWrapper);
}

function getAndUseFetch(url, action) {
    fetch(url)
        .then(response => response.json())
        .then(value => action(value));
};


getAndUseFetch(url, createDocumentWithPosts);
// -------------------------------------------------------------