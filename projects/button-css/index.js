document.addEventListener("DOMcontentLoaded", ()=>{
    let blogs = document.querySelector(".blogs");
    console.log("reloaded");
    for(let i = 0; i<6; i++){
      blogs.innerHTML += `
      <div class="blog">
        <img src="https://random.imagecdn.app/500/150">
        </div> `
    }
  })
let btn = document.getElementsByClassName("btn");
btn.addEventListener("click", ()=> {
    console.log("js");
})