const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray= [];
let initialLoad = true;


// Unsplash API
const apiKey ='_C7988cl7BgsDLkP1ikaEn5nuVqUGm4gaq2D_bvsv4I';
let count= 5;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all the images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded===totalImages)
    {
        loader.hidden =true;
        ready= true;
        initialLoad =false;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}


// Helper Function to set attributes on DOM Elements
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

// Create Elements for links and photos
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for Photo
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title:photo.alt_description,
        });

        // Event Listener , Check when each is finished loading
        img.addEventListener('load',imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get Photos from Unsplash API
async function getPhotos(){

    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error){
        //Catch Error here
    }

}

// Check to see if the scrolling is near the bottom of page, Load More Photos
window.addEventListener('scroll',() =>{
    
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        getPhotos();
    }
});

getPhotos();