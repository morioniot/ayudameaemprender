var NavigationBarControlFactory = function() {

    var navFixedPositionState = false;
    var body = document.body || document.documentElement;

    var navigationElements = {
        navigationBar: document.getElementById('navigation_bar')
    }

    var sectionHeights = {
        mainImageHeight: document.getElementById('main_image').clientHeight,
        skillsSectionHeight: document.getElementById('skills_section').clientHeight,
        projectsSectionHeight: document.getElementById('projects_section').clientHeight
    };

    var navItemsState = {
        skills: false,
        projects: false,
        contact: false
    };

    var changePosition = function() {
        if(body.scrollTop >= sectionHeights.mainImageHeight - 80) {
            if( !navFixedPositionState ) {
                navFixedPositionState = true;
                navigationElements.navigationBar.style.position = 'fixed';
                navigationElements.navigationBar.style.top = '80px';
            }
        }
        else {
            if( navFixedPositionState ) {
                navFixedPositionState = false;
                navigationElements.navigationBar.style.position = 'absolute';
                navigationElements.navigationBar.style.top = '100%';
            }
        }
    };

    return {
        changePosition: changePosition
    };
}

var body = document.body || document.documentElement;
var navigationManager = NavigationBarControlFactory();

body.onscroll = function(){
    navigationManager.changePosition();
};
console.log("Entrando a la consola");
