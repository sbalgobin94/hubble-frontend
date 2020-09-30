let addPost = false;
const postsCollection = document.querySelector("div#posts")
const postForm = document.querySelector(".add-post-form")


fetch('http://localhost:3000/posts')
.then(res => res.json())
.then((posts) => {
    renderPosts(posts)
})


let renderPosts = (posts) => {
  postsCollection.innerHTML = ""
  posts.forEach(function (post) {
    postsCollection.innerHTML += `
   <center><div class="card" data-id=${post.title}>
        <h6>${post.title}</h6>
        <center><img style="height: 30rem; width: 25rem;" src="${post.image_url}" class="post-picture" /></center>
        <p>${post.description}</p>
        <button class="like-btn">♥</button>
   </div></center>
   <br>
  `
  })
}

let turnPostToHTML = (createdPost) => {
    postsCollection.innerHTML += `
    <center><div class="card" data-id=${createdPost.title}>
        <h6>${createdPost.title}</h6>
         <center><img style="height: 30rem; width: 25rem;" src="${createdPost.image_url}" class="post-picture" /></center>
         <p>${createdPost.description}</p>
         <button class="like-btn">♥</button>
    </div></center>
    <br>
   `
  }

postForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    let imageInput = document.querySelector("#image-input")
    let titleInput = document.querySelector("#title-input")
    let descriptionInput = document.querySelector("#description-input")
    
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        title: titleInput.value,
        description: descriptionInput.value,
        image_url: imageInput.value
      })
    })
    .then(res => res.json())
    .then((createdPost) => {
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
      if (addPost) {
        postFormContainer.style.display = "block";
      } else {
        postFormContainer.style.display = "none";
      }
    });
  });