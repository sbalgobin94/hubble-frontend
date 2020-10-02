let addPost = false;
const postFormContainer = document.querySelector(".postform")
postFormContainer.style.display = "none"
const postsCollection = document.querySelector("div#posts")
const postForm = document.querySelector(".add-post-form")
let globalPost = {}


fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .then((postsArr) => {
        postsArr.forEach((post) => {
           turnPostToHTML(post);
        })

    })


let turnPostToHTML = (post) => {

    let postDiv = document.createElement("div")
    postDiv.classList.add("card")
    postDiv.id = "singlepost"

    // let postUser = document.createElement("h3")
    // postUser.innerText = post.user_name

    
    let postTitle = document.createElement("h5")
    postTitle.innerText = post.title

    let postImg = document.createElement("img")
    postImg.src = post.image_url
    postImg.alt = "image not found"
    postImg.classList.add("post-img")
    postImg.classList.add("center")
    postImg.style.height = "35rem"
    postImg.style.width = "30rem"

    let postDesc= document.createElement("p")
    postDesc.innerText = post.description

    let postLikesP = document.createElement("p")
    postLikesP.classList.add("upvote")
    postLikesP.innerText = `${post.likes} Upvotes`

    let likeButton = document.createElement("button")
    likeButton.classList.add("like-btn")
    likeButton.innerText = "⬆️"

    let deleteButton = document.createElement("button")
    deleteButton.classList.add("del-btn")
    deleteButton.innerText = "Delete Post"

    let br = document.createElement("br")

    let commentDiv = document.createElement("div")
    commentDiv.className = "comment-div"

    let commentForm = document.createElement("form")
    commentForm.id = "new-comment-form" 
    let commentLabel = document.createElement("label")
    commentLabel.innerText = "Comment: "
    let commentInput = document.createElement("input")
    commentInput.type = "text"
    commentInput.name = "content"
    commentInput.id = "comment-input"
    let submitComment = document.createElement("input")
    submitComment.type = "submit"
    submitComment.value = "submit"
    submitComment.id = "button-button"

    commentForm.append(commentLabel, commentInput, submitComment)

    post.comments.forEach(function(comment) {
      let commentP = document.createElement("p")
      commentP.className = "comment-p"
      commentP.innerText = `${comment.user} : ${comment.content}`
      commentDiv.append(commentP)
    })


    postDiv.append(postTitle, postImg, postDesc, postLikesP, likeButton, deleteButton, commentForm, commentDiv)



    postsCollection.append(postDiv)
    postsCollection.append(br)

  commentForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    let contentInput = evt.target.content
    
    fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        content: contentInput.value,
        user_id: 1,
        post_id: post.id

      })
    })
    .then(res => res.json())
    .then((createdComment) => {
      console.log(createdComment)
      let commentP = document.createElement("p")
      commentP.className = "comment-p"
      commentP.innerText = `${createdComment.user.username} : ${createdComment.content}`
      commentDiv.append(commentP)
      
      evt.target.reset()
    })
    
  })
    


   deleteButton.addEventListener("click", (evt) => {

    console.log("delete button clicked")

    fetch(`http://localhost:3000/posts/${post.id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(() => {
          console.log(postDiv)
          postDiv.remove()
        })

})

likeButton.addEventListener("click", (evt) => {
  let theNewLikes = post.likes + 1
  
  fetch(`http:/localhost:3000/posts/${post.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: theNewLikes
    })
  })
    .then(res => res.json())
    .then((updatedPost) => {
     postLikesP.innerText = `${updatedPost.likes} Upvotes`

      post.likes = updatedPost.likes
    })

  })
}

postForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    let imageInput = evt.target.image
    let titleInput = evt.target.title
    let descriptionInput = evt.target.description
    
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        title: titleInput.value,
        description: descriptionInput.value,
        image_url: imageInput.value,
        user_id: 1,
        likes: 0

      })
    })
    .then(res => res.json())
    .then((createdPost) => {
      console.log(createdPost)
      turnPostToHTML(createdPost);
      evt.target.reset()
    })
    
  })



  document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-post-btn");
    const postFormContainer = document.querySelector("postform");
    addBtn.addEventListener("click", () => {
      // hide & seek with the form
      addPost = !addPost;
      console.log(addPost)
      if (addPost) {
        postFormContainer.style.display = "block";
      } else {
        postFormContainer.style.display = "none";
      }
    });
  });

