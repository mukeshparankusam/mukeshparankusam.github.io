window.addEventListener("scroll",()=>{

const header=document.querySelector("header");

if(window.scrollY>50){
header.style.background="#ffffff";
header.style.boxShadow="0 5px 20px rgba(0,0,0,.1)";
}else{
header.style.background="#ffffff";
header.style.boxShadow="0 2px 15px rgba(0,0,0,.08)";
}

});
