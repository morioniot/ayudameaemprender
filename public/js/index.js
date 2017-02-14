var NavigationBarControlFactory = function() {

    var navFixedPositionState = false;
    var body = document.body || document.documentElement;

    var navigationElements = {
        navigationBar: document.getElementById('navigation_bar'),
        skills: document.getElementById('skills_item'),
        projects: document.getElementById('projects_item'),
        contact: document.getElementById('contact_item')
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

    var turnOnNavItem = function( itemName ) {
        if(!navItemsState[ itemName ]) {
            navItemsState[ itemName ] = true;
            navigationElements[ itemName ].classList.add('selected');
        }
    };

    var turnOffNavItem = function( itemName ) {
        if(navItemsState[ itemName ]) {
            navItemsState[ itemName ] = false;
            navigationElements[ itemName ].classList.remove('selected');
        }
    };

    var turnOffAllItems = function() {
        turnOffNavItem('projects');
        turnOffNavItem('skills');
        turnOffNavItem('contact');
    };

    var selectNavItem = function() {
        var skillsSectionStart = sectionHeights.mainImageHeight;
        var projectsSectionStart = skillsSectionStart + sectionHeights.skillsSectionHeight;
        var contactSectionStart = projectsSectionStart + sectionHeights.projectsSectionHeight;
        turnOffAllItems();
        if(body.scrollTop >= skillsSectionStart && body.scrollTop < projectsSectionStart)
            turnOnNavItem('skills');
        else if(body.scrollTop >= projectsSectionStart && body.scrollTop < contactSectionStart)
            turnOnNavItem('projects');
        else if(body.scrollTop >= contactSectionStart)
            turnOnNavItem('contact');
    };

    return {
        changePosition: changePosition,
        selectNavItem: selectNavItem
    };
}

var navigationManager = NavigationBarControlFactory();

window.onscroll = function() {
    navigationManager.changePosition();
    navigationManager.selectNavItem();
};

console.log("Entrando a la consola");
