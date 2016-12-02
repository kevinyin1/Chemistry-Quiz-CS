window.addEventListener('load',function(){
    $('#cover').css('background-size',screen.width + 'px');
    $('#cover').css('min-height',screen.height + 'px');
    console.log(screen.width + 'px');
//flip
    $("#topic1").flip({
        axis: 'y',
        trigger: 'hover'
    });
    $("#topic2").flip({
        axis: 'y',
        trigger: 'hover'
    });
    $("#topic3").flip({
        axis: 'y',
        trigger: 'hover'
    });
    $("#topic4").flip({
        axis: 'y',
        trigger: 'hover'
    });
    $("#topic5").flip({
        axis: 'y',
        trigger: 'hover'
    });
    $("#topic6").flip({
        axis: 'y',
        trigger: 'hover'
    });
//smove scroll script :)
    $('a[href^="#"]').on('click', function(event) {

       var target = $(this.getAttribute('href'));

       if( target.length ) {
           event.preventDefault();
           $('html, body').stop().animate({
               scrollTop: target.offset().top
           }, 1000);
       }

    });


});
