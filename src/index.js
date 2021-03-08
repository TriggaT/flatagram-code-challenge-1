// write your code here
const image = document.getElementsByClassName("image")[0]
const title = document.getElementsByClassName("title")[0]
const likes = document.getElementsByClassName("likes")[0]
const comments = document.getElementsByClassName("comments")[0]
const likebtn = document.getElementsByClassName("like-button")[0]
const newComment = document.getElementsByClassName("comment-input")[0]
const submitComment = document.getElementsByClassName("comment-button")[0]

document.addEventListener("DOMContentloaded",
    fetch("http://localhost:3000/images/1")
    .then(r => r.json())
    .then(data => postPicInfo(data))
)

function postPicInfo(p){
    image.src = p.image
    title.innerText = p.title 
    likes.innerText = `${p.likes} likes`
    p.comments.forEach(c => postComment(c.content))
}

function postComment(c){
    let comment = document.createElement("li")
    comment.innerText = c
    comments.appendChild(comment)
}

likebtn.addEventListener("click", function(e){
    let configObj = {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({likes : parseInt(likes.innerText + 1)})
    }
    
    fetch("http://localhost:3000/images/1", configObj)
    .then(r => r.json())
    .then(data => accumLikes(data.likes))

})

function accumLikes(l){
    let i = 1
    likes.innerText = `${l + i} likes`;
    i++
}

submitComment.addEventListener("click", function(e){
    e.preventDefault();
    postComment(newComment.value)

})



