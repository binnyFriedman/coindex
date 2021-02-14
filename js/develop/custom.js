$(document).ready(function(){

    if( $('#uppered-popup').length && !logined ){
        var timeCurr = Date.now();
        var date = new Date();

        if ( localStorage.getItem('coindextimestamp') == null || localStorage.getItem('coindextimestamp')*1 < timeCurr ){

            setTimeout(function() {
                $.fancybox.open({
                    src  : '#uppered-popup',
                    type : 'inline',
                    opts : {
                        afterClose: function(){
                            localStorage.setItem('coindextimestamp', date.setDate(date.getDate() + 1) );
                        }
                    }
                });

            }, 60000);
        }
    }


});




