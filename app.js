if ('serviceWorker'in navigator)
{navigator.serviceWorker.register('/app_cw2/sw.js');
};


 
var button = document.getElementById("notifications");
button.addEventListener('click', function(e) {
Notification.requestPermission().then(function(result) { 
if(result === 'granted') { 
randomNotification(); 
}
});
});


function randomNotification(){
    var randomItem = Math.floor(Math.random()*courses.length);
    var notifTitle = courses[randomItem].topic;
    var notifBody='Created by '+courses[randomItem].provider+'.';
    var notifImg='data/images/'+courses[randomItem].slug+'.jpg';
    var options = {body:notifBody,
        icon:notifImg
    }
    var notif = new Notification(notifTitle,options);
    setTimeout(randomNotification,300000000);
}

let imagesToLoad = document.querySelectorAll('img[data-src]');
const loadImages = (image) => {
    image.setAttribute('src' , image.getAttribute('data-src'));
    image.onload =() => {
        image.removeAttribute('data-src');
    };
};

if('IntersectionObserver' in window) {
	var observer = new IntersectionObserver(function(items, observer) {
		items.forEach(function(item) {
			if(item.isIntersecting) {
				loadImages(item.target);
				observer.unobserve(item.target);
			}
		});
	});
	imagesToLoad.forEach(function(img) {
		observer.observe(img);
	});
}
else {
	imagesToLoad.forEach(function(img) {
		loadImages(img);
	});
}
