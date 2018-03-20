{
const post = document.getElementById('root');
const allPosts = 'https://jsonplaceholder.typicode.com/posts';
const comments = document.getElementById('comments');
const allUsers = `https://jsonplaceholder.typicode.com/users/`;

window.addEventListener('hashchange', function() {
    let way = location.hash
    let ID = way.match(/\d+/g).toString();
    switch(true) {
        case way.includes('post'):  
            setAllPosts(`${allPosts}/${ID}`, post, postDetail);
            setAllPosts(`${allPosts}/${ID}/comments`, comments, createComments);
            break;
        case way.includes("author"):  
            comments.innerHTML = '';
            setAllPosts(`${allUsers}${ID}`, post, author)
            break;
    }
});

function createPost(post){
    return `<div class = "post">
                <div>
                    <a href="#/postId=${post.id}" >
                        <h4 class = "postTitle">${post.title}</h4>
                    </a>
                </div>
                <p class = "postBody">${post.body}</p>
            </div>`;
}

function postDetail(post) {
    return `<div class="">
                <p class = "postDetailTitle">${post.title}</p>
                <p class = "postDetailBody">${post.body}</p>
                <div class = "postDetailInfo">    
                    <a  href="#/authorId=${post.userId}">View post creator info</a>
                </div>
                <h3 class = "postDetailComm">Comments</h3>
            </div>`;
}

function createComments(comments) {
    return `<p class = "comments"> - ${comments.body}</p>`
}

function author(author) {
    return `<div class="author">
                <p>Name : ${author.name}</p>
                <p>Phone : ${author.phone}</p>
                <p>E-Mail : ${author.email}</p>
                <p>Website : ${author.website}</p>
                <p>Adress : ${author.address.suite} ${author.address.street}, ${author.address.city}</p>
            </div>`;
}

setAllPosts(allPosts,post,createPost)

function setAllPosts(postUrl, postInfo, neededFunc) {
    fetch(postUrl)
        .then(response => response.json())
        .then(json => {
            if (Array.isArray(json)) {
                postInfo.innerHTML = json.map(function(item) {
                    return neededFunc(item);
                }).join('')
            }
            else {
                postInfo.innerHTML = neededFunc(json);
            }
        })
}
}