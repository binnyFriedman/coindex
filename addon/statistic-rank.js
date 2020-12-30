$(document).ready(function() {

    /* create single button */

    if ($('#table-id').length) {


        $.ajax({
            url: 'api.coincap.io/v2/assets',
            method: 'GET',
            success: function (data) {
                console.log( data );

                $('#table-id tbody tr').each(function () {

                    var currItem = $(this);
                    var currShort = ( $(this).attr('data-short') ).toLowerCase();
                    var currBig = ( $(this).find('td').eq(1).find('a').html() ).toLowerCase();
                    var currenter = true ;


                    data.forEach( (item, index) => {
                        if( (item.short).toLowerCase() === currShort  ) {

                            currItem.find('td:first').html( index+1 );

                            currenter = false;
                            return ;
                        }

                    });

                    if ( currenter && currShort != '' ){
                        var stan = currShort.toUpperCase();
                        $.ajax({
                            url: 'http://coincap.io/page/' + stan,
                            method: 'GET',
                            success: function (data) {

                                currItem.find('td:first').html( data.rank );

                            }

                        });
                    }
                })


            }

        });

    }

    /* create single button */

})