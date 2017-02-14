var NavigationBarControlFactory = function( scrollManager ) {

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

    var initialize = function( scrollManager ) {
        var skillsSectionStart = sectionHeights.mainImageHeight;
        var projectsSectionStart = skillsSectionStart + sectionHeights.skillsSectionHeight;
        var contactSectionStart = projectsSectionStart + sectionHeights.projectsSectionHeight;
        Object.keys( navItemsState ).forEach(function( itemName ) {

            var scrollPosition;
            switch (itemName) {
                case 'skills':
                    scrollPosition = skillsSectionStart + 10;
                    break;
                case 'projects':
                    scrollPosition = projectsSectionStart + 10;
                    break;
                case 'contact':
                    scrollPosition = contactSectionStart + 10;
                    break;
                default:
                    break;
            }

            var navigateTo = function() {
                scrollManager.scrollLinearTo(scrollPosition, 600);
            };

            navigationElements[ itemName ].onclick = navigateTo;
        });
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

    initialize( scrollManager );
    return {
        changePosition: changePosition,
        selectNavItem: selectNavItem
    };
};

var ScrollControlFactory = function() {

    var body = document.body || document.documentElement;

    var scrollLinearTo = function( scrollPosition, time ) {
        var currentPosition = body.scrollTop;
        var pixelsBetween = Math.abs(currentPosition - scrollPosition);
        var direction = (currentPosition < scrollPosition)? 1 : -1;
        var absoluteScrollStep = Math.round(pixelsBetween / (time / 20));
        var scrollStep = absoluteScrollStep * direction;
        var lastScrollStep = (pixelsBetween % absoluteScrollStep) * direction;
        var stepsCount = Math.floor(pixelsBetween / absoluteScrollStep);
        var scrollInterval = setInterval(function() {
            if(stepsCount > 0) {
                window.scrollBy(0, scrollStep);
                stepsCount -= 1;
            }
            else{
                window.scrollBy(0, lastScrollStep);
                clearInterval( scrollInterval );
            }
        }, 20);
    };

    return {
        scrollLinearTo: scrollLinearTo
    };
};

var scrollManager = ScrollControlFactory();
var navigationManager = NavigationBarControlFactory( scrollManager );

window.onscroll = function() {
    navigationManager.changePosition();
    navigationManager.selectNavItem();
};
