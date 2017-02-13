var mainImage = document.getElementById('main_image');
var navigation = document.getElementById('navigation_bar');
var body = document.body || document.documentElement;
var mainImageVerticalSize = mainImage.clientHeight;

var changePosition = function() {
    console.log(mainImageVerticalSize);
    if(body.scrollTop >= mainImageVerticalSize - 80) {
        navigation.style.position = 'fixed';
        navigation.style.top = '80px';
    }
    else {
        navigation.style.position = 'absolute';
        navigation.style.top = '100%';
    }
};

body.onscroll = changePosition;
console.log("Entrando a la consola");
