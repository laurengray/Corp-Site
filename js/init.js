// lazy load images

$("div.lazy").lazyload({
  effect: "fadeIn",
  visibleOnly: false,
  delay: 0
});

$("img.lazy").lazyload({
   effect: "fadeIn"
});

// show nav when intro slides out of view

$('#why').waypoint(function() {
  $('header').toggleClass('active');
}, { offset: 20 });

// set heights for masonry grid

$.masonryHeights = function() {
  var itemHeight = $('.masonry .item').outerWidth(true);
        
  $('.masonry .item, .masonry .grid-sizer').css({
    height: itemHeight,
  });
  $('.h2').css('height', itemHeight*2);
  $('.h3').css('height', itemHeight*3);
  $('.h4').css('height', itemHeight*4);
  $('.h5').css('height', itemHeight*5);
  $('.h6').css('height', itemHeight*6);
  $('.h7').css('height', itemHeight*7);
  $('.h8').css('height', itemHeight*8);
  $('.h9').css('height', itemHeight*9);
  $('.h10').css('height', itemHeight*10);
  $('.h11').css('height', itemHeight*11);
  $('.h12').css('height', itemHeight*12);
};

$.masonryHeights();  


// initiate masonry

var $container = $('.masonry')

$container.masonry({
  itemSelector: '.item',
  columnWidth: '.grid-sizer'
});


// set mobile menu height and triggers

if ($(window).width() <= 1000) {
  $('header .mobile-menu, header ul.nav li').click(function() {
    $('html').toggleClass('open');
    $('header').toggleClass('open');
  });

  $('.header-start .mobile-menu, body > ul.nav li').click(function(){
    $('html').toggleClass('open');
  })
};


$(document).ready(function(){
  
  // Smooth scroll when clicking on nav elements
  if ($(window).width() >= 1000) {    
    $.localScroll.hash({
  		duration:1200,
  		easing: 'swing'
  	});

  	$.localScroll({
  		duration:1200, 
  		hash:true,
  		easing: 'swing',
  	});
  }
  
  // Initiate Big Video bg
  
  $(function() {
    var BV = new $.BigVideo();
    BV.init();
    if (Modernizr.touch) {
        BV.show('http://content.backcountry.com/promo_upload/corpsite/img/video-bg.jpg');
    } else {
        BV.show('http://content.backcountry.com/promo_upload/corpsite/brandvideo_edit2_1280x720.mp4',{ambient:true});
    }
  });
  
  // Launch player (videos & exec bios) when clicking on .trigger
  // Video will auto-play
    
  $('.trigger').bind('click', function() {
    var thisId = $(this).attr('id');
    $('.player-wrapper').show().animate({
      opacity: 1
    }, 500);
    $('html').css('overflow', 'hidden');
    $('.player.'+thisId).show();
    playerOffset = $('.player.'+thisId).height()/2;
    playerCenter = $('.player.'+thisId).width()/2;

    $('.player.'+thisId).css({
      transform:'scale(1,1)',
      '-webkit-transform':'scale(1,1)',
      '-moz-transform':'scale(1,1)',
      '-o-transform':'scale(1,1)',
      'margin-top':-playerOffset,
      'margin-left':-playerCenter
    });
    
      bioHeight = (playerOffset*2) - $('.player.'+thisId+' .bio-head').outerHeight() - 70;
      $('.bio-body').css('height', bioHeight);
      console.log($('.bio-head').outerHeight(true));

    
    var iframe = $('#'+thisId)[0],
        player = $f(iframe);
    
    player.api($(this).text().toLowerCase());
  });
  
  $('#brand-video.trigger').click(function() {
    $('.player-wrapper').addClass('video');
  });
  
  $('#video').fitVids();
  
  // Close player when either .close or .player-wrapper are clicked
  
  $('.player-wrapper, .player .close').click(function(){
    var source = $('.brand-video').find('iframe').attr('src');
	  $('.brand-video').find('iframe').attr('src', '');
	  $('.brand-video').find('iframe').attr('src', source);
    $('.player-wrapper').hide().css('opacity', 0);
    $('html').css('overflow', 'visible');
    $('.player').css({
      transform:'scale(0,0)',
      '-webkit-transform':'scale(0,0)',
      '-moz-transform':'scale(0,0)',
      '-o-transform':'scale(0,0)'
    }).hide();
    $('.player-wrapper').removeClass('video');
  });
  
  // Initiate slideshows
	if ($(window).width() >= 600) {
  	$('.slideshow').flexslider({
      animation: "slide",
      slideshow: false
    });
  
    $('.slideshow-2').flexslider({
      animation: "slide",
      slideshow: false,
      controlNav: false
    });
  }
  
  if ($(window).width() >= 1000){
    $('.slideshow-3').flexslider({
      animation: "slide",
      slideshow: false
    });
  }
  
  // add '0' to beginning of flex-nav for .slideshow
  
  $('.slideshow li a').prepend('0');
    
  // Anchor .slideshow to top of page when a nav element is clicked
  
  $('.slideshow .flex-direction-nav li a, .slideshow .flex-control-nav li a').click(function() {
    $('body').animate({
      scrollTop: $('#why').offset().top
    }, 600);
  });
  
  // resize exec portraits to always be square
  
  $.execSquare = function() {
    var execWidth = $('.exec-pic').outerWidth(true);
    
    console.log(execWidth)
    $('.exec-pic').css('height', execWidth);
  };
  
  $.execSquare();

    
  // hide header when footer is close to top
  
  $('footer').waypoint(function() {
    $('header').toggleClass('active');
  }, {
    offset: 300
  });
  
  $('.slideshow-3 .flex-control-nav li a').prepend('Part ').append(' <em>of</em> 5');
  
  $('.slideshow-3 .flex-direction-nav li a').click(function() {
    $f($('iframe')[0]).api('pause');
  });
  
  // Load behind the scenes when footer comes into view
  
  $('footer').waypoint(function() {
    $('.bts').toggleClass('active');
  }, {
    offset: '100%'
  });
  
});


$(window).load(function(){
  
  // Scrollspy for nav elements
  
  $('body').removeClass('no-scroll');
  $('#loader').fadeOut('slow');
	
	var btsOffset = (($(window).height() - $('.bts .container').height()) / 2) - 35;
   $('.bts').css('padding-top', btsOffset);
   
   $('body').scrollspy({ 
 	  target: '.navbar',
 	  offset: 60
 	});
	
});

$(window).resize(function(){
    
  // reset masonry heights and widths on resize
  
  $.masonryHeights();
  
  $container.masonry({
    itemSelector: '.item',
    columnWidth: '.grid-sizer'
  });
  
  $.execSquare();
});