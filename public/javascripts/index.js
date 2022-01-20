

// function fav(e) {
//     const tgt = e.target.firstElementChild;
//     tgt.classList.toggle('far fa-star');
//     tgt.classList.toggle('fas fa-star');
//   }



//document.getElementById("starIcon").classList.toggle('fas fa-star');



// document.querySelector('starIcon').addEventListener('click', fav);


function fav() {
    var icon = document.getElementById("favIcon");
      if (icon.classList.contains("far fa-star")) {
        icon.classList.remove("far fa-star");
        icon.classList.add("fas fa-star");
      } else {
        icon.classList.remove("fas fa-star");
        icon.classList.add("far fa-star");
      }
    }

    // function fav() {
    //     var icon = document.getElementById("favIcon");
    //       if (icon.classList.contains("fa-star-o")) {
    //         icon.classList.remove("fa-star-o");
    //         icon.classList.add("fa-star");
    //       } else {
    //         icon.classList.remove("fa-star");
    //         icon.classList.add("fa-star-o");
    //       }
    //     }