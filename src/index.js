let addPost = false;
const postFormContainer = document.querySelector(".container");
postFormContainer.style.display = "none";
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

    let likeButton = document.createElement("button")
    likeButton.classList.add("like-btn")
    likeButton.innerText = "♥"
    

    let deleteButton = document.createElement("button")
    deleteButton.classList.add("del-btn")
    deleteButton.innerText = "Delete Post"

    let br = document.createElement("br")


    postDiv.append(postTitle, postImg, postDesc, likeButton, deleteButton)
    postsCollection.append(postDiv)
    postsCollection.append(br)
    


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
        user_id: 1
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
    const postFormContainer = document.querySelector(".container");
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