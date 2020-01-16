var memeDetails = {category:"",tag:""};
// var category;
// var tag;
function memeTinder() {
  // checking categories
  if(document.getElementById("category1").checked)
   {
    memeDetails.category = "Hindi Memes";
   }
   else if(document.getElementById("category2").checked)
   {
    memeDetails.category = "Wholesome";
   }
   else if(document.getElementById("category3").checked)
   {
    memeDetails.category = "self Deprecating meme";
   }
   else if(document.getElementById("category4").checked)
   {
    memeDetails.category = "Dark meme";
   }
   else if(document.getElementById("category5").checked)
   {
    memeDetails.category = "Sports meme";
   }
   else if(document.getElementById("category6").checked)
   {
    memeDetails.category = "Youtube meme";
   }
   else if(document.getElementById("category7").checked)
   {
    memeDetails.category = "Celebrity meme";
   }
   else if(document.getElementById("category8").checked)
   {
    memeDetails.category = "Animal meme";
   }
   else if(document.getElementById("category9").checked)
   {
    memeDetails.category = "TV meme";
   }
   else if(document.getElementById("category10").checked)
   {
    memeDetails.category = "Animated meme";
   }
   else if(document.getElementById("category11").checked)
   {
    memeDetails.category = "Political meme ";
   }
   else if(document.getElementById("category12").checked)
   {
    memeDetails.category = "Fitness meme ";
   }
   else if(document.getElementById("category13").checked)
   {
    memeDetails.category = "Nerd meme";
   }
   else{
     alert("Please select category");
     return false;
   }
   console.log( memeDetails.category);
   //checking tags;
   if(document.getElementById("tags").value!= "")
   {
    memeDetails.tag = document.getElementById("tags").value;
    console.log( memeDetails.tag);
   }
   else{
    alert("Please add tags");
    return false;
  }

   return true;
}