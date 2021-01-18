/*валидация формы*/
function validate(form, options){
    var setings = {
        errorFunction:null,
        submitFunction:null,
        highlightFunction:null,
        unhighlightFunction:null
    }
    $.extend(setings, options);

    var $form = $(form);

    if ($form.length && $form.attr('novalidate') === undefined) {
        $form.on('submit', function(e) {
            e.preventDefault();
        });

        $form.validate({
            errorClass : 'errorText',
            focusCleanup : true,
            focusInvalid : false,
            invalidHandler: function(event, validator) {
                if(typeof(setings.errorFunction) === 'function'){
                    setings.errorFunction(form);
                }
            },
            errorPlacement: function(error, element) {
                error.appendTo( element.closest('.form_input'));
            },
            highlight: function(element, errorClass, validClass) {
                $(element).addClass('error');
                $(element).closest('.form_row').addClass('error').removeClass('valid');
                if( typeof(setings.highlightFunction) === 'function' ) {
                    setings.highlightFunction(form);
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error');
                if($(element).closest('.form_row').is('.error')){
                    $(element).closest('.form_row').removeClass('error').addClass('valid');
                }
                if( typeof(setings.unhighlightFunction) === 'function' ) {
                    setings.unhighlightFunction(form);
                }
            },
            submitHandler: function(form) {
                if( typeof(setings.submitFunction) === 'function' ) {
                    setings.submitFunction(form);
                } else {
                    $form[0].submit();
                }
            }
        });

        $('[required]',$form).each(function(){
            $(this).rules( "add", {
                required: true,
                messages: {
                    required: "Вы пропустили"
                }
            });
        });

        if($('[type="email"]',$form).length) {
            $('[type="email"]',$form).rules( "add",
            {
                messages: {
                    email: "Невалидный email"
                 }
            });
        }

        if($('.tel-mask[required]',$form).length){
            $('.tel-mask[required]',$form).rules("add",
            {
                messages:{
                    required:"Введите номер мобильного телефона."
                }
            });
        }

        $('[type="password"]',$form).each(function(){
            if($(this).is("#re_password") == true){
                $(this).rules("add", {
                    minlength:3,
                    equalTo:"#password",
                    messages:{
                        equalTo:"Неверный пароль.",
                        minlength:"Недостаточно символов."
                    }
                });
            }
        })
    }
}

/*Отправка формы с вызовом попапа*/
function validationCall(form){

    var thisForm = $(form);
    var formSur = thisForm.serialize();
    $(form).find('input[name=action]').val();
    $(form).find('input[name=name]').val();
    $(form).find('input[name=error]').val();


    var data = new FormData();
    data.append( 'action' , $(form).find('input[name=action]').val() );
    data.append( 'name' , $(form).find('input[name=name]').val() );
    data.append( 'error' , $(form).find('textarea[name=error]').val() );
    data.append( 'page', location.href );

    fetch('/wp-admin/admin-ajax.php',{
        method: "POST",
        body: data
    }).then((response)=> {
        return response.json();                
    }).then((response)=> {
        
        if ( response ){
            thisForm.trigger('reset');
            $.fancybox.close();
            popNext('#call_success');
        }

    }).catch( (response) => {
        console.log('done');
    });

}

function popNext(popupId){

    $.fancybox.open({
        src  : popupId,
        type : 'inline',
        opts : {
            afterClose: function(){
                $('form').trigger("reset");
            }
        }
    });

}

/*маска на инпуте*/
function Maskedinput(){
    if($('.tel-mask')){
        $('.tel-mask').mask('+9 (999) 999-99-99');
    }
}

$(document).ready(function(){

    $('.hidden-pop-for-add form').on('submit', function(e){
        e.preventDefault();

        if ( parseFloat( $(this).find('input[name=count]').val() ) != 0 &&
            !isNaN( parseFloat( $(this).find('input[name=count]').val() ))
        )
        {

            var prrrrice = $(this).find('input[name=price]').val()
            var curr = $(this).find('input[name=count]').val();
            var apiName = $(this).find('input[name=apiname]').val();

            var data = new FormData();
            data.append( 'action' , 'addToSteakCurrent' );
            data.append( 'named' , JSON.stringify( apiName ) );
            data.append( 'summ' , JSON.stringify( curr ) );

            data.append( 'price' , JSON.stringify( prrrrice ) );
            data.append( 'time' , Date.now() );

            data.append( 'userID', userID );

            fetch('/wp-admin/admin-ajax.php',{
                method: "POST",
                body: data
            }).then((response)=> {
                return response.json();
        }).then((response)=> {

            if ( response ){
                $('.hidden-pop-for-add form').find('input[name=count]').val(0);
                location.replace('/cabinet/');
            }

        }).catch( (response) => {
            console.log('done');
        });

            $('.hidden-pop-for-add').fadeOut(100);
        } else {
            $(this).addClass('errorForm');
        }
    });

    $('#remove-popup .butt.close-popup').on('click', function(e){
        e.preventDefault();
        $.fancybox.close();
    });


    $('#remove-popup .delete.butt').on('click', function(e){
        e.preventDefault();
        var apiName = $('.hidden-pop-for-add form').find('input[name=apiname]').val();

        var data = new FormData();    

        data.append( 'action' , 'addToSteakCurrent' );
        data.append( 'named' , JSON.stringify( apiName ) );
        data.append( 'summ' , JSON.stringify( 0 ) );

        data.append( 'price' , JSON.stringify( 0 ) );
        data.append( 'time' , Date.now() );
        data.append( 'userID', userID );


        fetch('/wp-admin/admin-ajax.php',{
            method: "POST",
            body: data
        }).then((response)=> {
            return response.json();
    }).then((response)=> {

            if ( response ){
                location.reload();
            }

        }).catch( (response) => {
            console.log('done');
    });

        $('.hidden-pop-for-add').fadeOut(100);
    })


    validate('#find-error form', {submitFunction:validationCall});
    validate('#call-popup .contact-form', {submitFunction:validationCall});
    Maskedinput();

    /* ga part*/

        // search
        $('.searchform').on('submit', function () {

            var val = location.pathname;
            var val2 = $('input[name=search]').val();

            gtag('event', 'search', {
                'event_category': 'search',
                'event_label': val,
                'name' : val2
            });

        });

        /* login/logout */

        $('.go-to-cab').on('click', function () {

            var val = location.pathname;

            gtag('event', 'cabinet', {
                'event_category': 'go to cabinet from page',
                'event_label': val
            });
        });

        $('.go-log-out').on('click', function () {

            var val = location.pathname;

            gtag('event', 'logout', {
                'event_category': 'logout on page',
                'event_label': val
            });
        });

        $('.try-login-header').on('click', function () {

            var val = location.pathname;

            gtag('event', 'login', {
                'event_category': 'open login popup',
                'event_label': val
            });
        });

        $('.mid-table .trade a').on('click', function () {

            var changer = $(this).closest('li').find('.cell-name .name').find('span').eq(1).html();
            console.log( changer );
            $('#call-popup-cusual').find('.head-text .namename').html( changer ) ;
            $('#call-popup-cusual').find('.chooser .namename').html( changer ) ;

            var val = location.pathname;
            var val2 = $(this).closest('li').find('.cell-name .name span').eq(1).html();

            gtag('event', 'popup_bye', {
                'event_category': 'open bye popup',
                'event_label': val,
                'name' : val2
            });
        });


        $('.popup .contein-popup .chooser a').on('click', function () {


            var val = location.pathname;
            var val2 = $(this).closest('.popup').find('.head-text .namename').html();

            if ( $(this).index() == 0 ) {

                gtag('event', 'popup_bye', {
                    'event_category': 'go to changelly',
                    'event_label': val,
                    'name' : val2
                });

            } else {

                gtag('event', 'popup_bye', {
                    'event_category': 'go to coinmama',
                    'event_label': val,
                    'name' : val2
                });
            }
        });

        $('.add-to-steak button').on('click', function () {

            var val = location.pathname;
            var val2 = $(this).attr('data-marker');

            if ( !$(this).hasClass('in') ) {


                gtag('event', 'cabinet_add', {
                    'event_category': 'add item to cabinet',
                    'event_label': val,
                    'name' : val2
                });

            } else {

                gtag('event', 'cabinet_remove', {
                    'event_category': 'remove item from cabinet',
                    'event_label': val,
                    'name' : val2
                });

            }

        });
        
        $('.changer-counter button').on('click', function () {

            var val = location.pathname;
            var val2 = $(this).closest('li').find('.cell-name .name').find('span').eq(1).html();

            gtag('event', 'cabinet_change', {
                'event_category': 'change count item in cabinet',
                'event_label': val,
                'name' : val2
            });

        });

        $('.under-toper .left-side a ').on('click', function () {

            var val = location.pathname;
            var val2 = $('.head-line h1').html();

            gtag('event', 'popup_bye', {
                'event_category': 'open bye popup',
                'event_label': val,
                'name': val2
            });

        });

        $('.under-toper .left-side a , .bottom-content .butt').on('click', function () {

            var val = location.pathname;
            var val2 = $('.head-line h1').html();

            if ( $(this).attr('data-src') != '#find-error' ) {

                gtag('event', 'popup_bye', {
                    'event_category': 'open bye popup',
                    'event_label': val,
                    'name': val2
                });

            } else {

                gtag('event', 'popup_error', {
                    'event_category': 'open error popup',
                    'event_label': val,
                    'name': val2
                });

            }

        });

        $('.loading-description .butt-to-remove a').on('click', function () {

            var val = location.pathname;
            var val2 = $('.head-line h1').html();

            gtag('event', 'cabinet_remove', {
                'event_category': 'remove item from cabinet',
                'event_label': val,
                'name' : val2
            });

        });

        $('.loading-description .butt-to-add a ').on('click', function () {

            var val = location.pathname;
            var val2 = $('.head-line h1').html();

            gtag('event', 'cabinet_add', {
                'event_category': 'add item to cabinet',
                'event_label': val,
                'name' : val2
            });


        });


    /* ga part */


    $('.loadblog').on('click', function (e) {
        e.preventDefault();

        var data = {
            'action': 'loadmore_blog',
            'query': true_posts,
            'page' : current_page
        };

        $.ajax({
            url: $(this).attr('href'),
            data: data,
            type: 'POST',
            success:function(data){

                console.log( data );

                if( data ) {
                    $('.blog-list').append(data);
                    current_page++;
                    if (current_page == max_pages) $(".loadblog").remove();

                } else {
                    $('.loadblog').remove(); // если мы дошли до последней страницы постов, скроем кнопку
                }


            }
        });

    });

});