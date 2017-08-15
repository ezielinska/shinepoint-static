(function($) {

    function _citySelector() {

        var cityKey = 'shinepoint_city';
        var previousValue = window.localStorage.getItem(cityKey);
        var $select = $('.city-selector select');

        if (previousValue) {
            $select.val(previousValue);
        }

        $select.on('hidden.bs.select', function(e) {

            var value = $select.val();
            window.localStorage.setItem(cityKey, value);
        });
    }

    function _optionsListPicker() {

        var $optionsListButton = $('.options-list__type');

        $optionsListButton.click(function(e) {

            e.preventDefault();

            var $el = $(this);
            var $singleOption = $('.single-option');
            var forCompanies = $el.hasClass('options-list__type--for-companies');
            var windowWidth = $(window).width();

            $optionsListButton.toggleClass('options-list__type--active');
            $singleOption.toggleClass('hidden');

            var $visibleOptions = $('.single-option:not(.hidden)');
            var scrollTo = $visibleOptions.offset().top - 20;

            console.log('scrollTo', scrollTo)

            _optionsListEqualizeHeight();
            if (windowWidth <= 992) {
                setTimeout(function() {
                    $('html, body').animate({ scrollTop: scrollTo }, 1000);
                }, 50)
            }
        })
    }

    function _hamburgerMenu() {

        var $hamburgerButton = $('.js-hamburger-menu');
        var $menuList = $('.main-menu__list');

        $hamburgerButton.click(function() {

            $menuList.slideToggle();
        })
    }

    function _optionsListEqualizeHeight() {

        var maxHeight = 0;
        var $singleOption = $('.single-option');

        $('.options-list').imagesLoaded(function() {
            $singleOption.each(function() {

                var $el = $(this);
                $el.removeAttr('style');

                if ($el.height() > maxHeight) {
                    maxHeight = $(this).height();
                }
            });

            $singleOption.height(maxHeight);
        });
    }

    function _preventHashesOnLinkClick(){

        $('a[href="#"]').click(function(event){
            event.preventDefault()
        })
    }

    $(document).ready(function() {

        _citySelector();
        _optionsListPicker();
        _hamburgerMenu();
        _optionsListEqualizeHeight();
        _preventHashesOnLinkClick();

        $(window).resize(function(){
            _optionsListEqualizeHeight();
        })
    });

}(jQuery))