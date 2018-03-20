var post = document.getElementById('root');
var allPosts = 'https://jsonplaceholder.typicode.com/posts';
var comments = document.getElementById('comments');
var allUsers = `https://jsonplaceholder.typicode.com/users/`;


window.addEventListener('hashchange', function() {
    let way = location.hash
    let ID = way.match(/\d+/g).toString();
    if (way.includes('post')) {
        setAllPosts(`${allPosts}/${ID}`, post, postDetail);
        setAllPosts(`${allPosts}/${ID}/comments`, comments, createComments);
        console.log("1")
    }
    else if (way.includes('author')) {
        comments.innerHTML = '';
        setAllPosts(`${allUsers}${ID}`, post, author)
        console.log("2")
    }
    else if (way == '') {
        setAllPosts(allPosts, post, createPost);
        console.log("3")
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
    return `<ul>
                <li>${comments.body}</li>
            </ul>`
}

function author(author) {
    return `<div class="">
                <h4>${author.name}</h4>
                <p>${author.phone}</p>
                <p>${author.email}</p>
                <p>${author.website}</p>
                <p>${author.address.suite} ${author.address.street}, ${author.address.city}</p>
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

