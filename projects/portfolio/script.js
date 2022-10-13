$(function() {
    let portfolioHeader = $('.portfolio-header').position().top;
    console.log(portfolioHeader);
    $('.about-btn').on('click touch', function() {
      const about = $('#about').position().top;
      console.log(about);
      $('html, body').animate(
        {
          scrollTop: about
        }, 600, 'easeOutCirc', () => {console.log('livin\' it up while i\'m goin\' down!');});
    });
    $('.portfolio-btn').on('click touch', function(e) {
      const portfolio = $('#portfolio').position().top;
      console.log(portfolio);
      $('html, body').animate(
        {
          scrollTop: portfolio
        }, 600, 'easeOutCirc', () => {console.log('livin\' it up while i\'m goin\' down!');});
    });
    $('.contact-btn').on('click touch', function(e) {
      const contact = $('#contact').position().top;
      console.log(contact);
      $('html, body').animate(
        {
          scrollTop: contact
        }, 600, 'easeOutCirc', () => {console.log('livin\' it up while i\'m goin\' down!');});
    });
    $('.top-btn').on('click touch', function(e) {
      const top = $('#top').position().top;
      console.log(top);
      $('html, body').animate(
        {
          scrollTop: top
        }, 600, 'easeOutCirc');
    });
    const startYear = 2017;
    let thisYear = (new Date).getFullYear()
    if(thisYear === startYear) {
      $('#cw-year').html(startYear).css('font-size', '13px');
    } else {
      $('#cw-year').html(startYear + '-' + thisYear).css('font-size', '13px');;
    }; 
  });
  
  /*  *  *  *  *  *  *  *  *  *
  
  To fix —
  Navbar —
  √ •  do animation so buttons on left are display:none until animation ends, the quickly fade in with display:block or display:flex.
  •  make search button/controller work or get rid of search
  
  Header —
  •  If it's possible to round the corners of the background pic itself, do it.
  
  About —
  •  fix formatting on left side
     -  darkslategrey div goes all the way to the bottom of containing div.
     -  "Back To Top" button goes to the bottom of that div too.
     –  fix spacing/centering on name
     –  fix spacing/centering on bullet points
  •  fix formatting on right side
     -  center pic vertically
     -  center pic horizontally
     √ -  get rid of failed red border
     -  add red border & shadow in using multiple box shadows
     
  Portfolio —
  •  fix top overlapping square edges of iframe on Martian Arts thumbnail box
  
  Contact —
  •  Bootstrap Tooltips over icons w/ their i.d. (e.g., "Faddah's LinkedIn," "Faddah's Instagram," etc.)
  
  *  *  *  *  *  *  *  *  *  */
  
  
  /* function googleSearch() {
      var cx = '018300457617410184591:gbg3sp39sog';
      var gcse = document.createElement('script');
      gcse.type = 'text/javascript';
      gcse.async = true;
      gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(gcse, s);
  }; */
  
  /*  *  *  *  *  *  *  *  *  *
  
  function openDbRelativeURL( url, target ){
    //Check we have a target window;
    target = (target == null ) ? window : target;
    //Work out the path of the database;
    path = location.pathname.split('.nsf')[0] + '.nsf/';
    target.location.href = path + url;
  }
  
  function doSearch ( s ) {
    var regExp1 = /\bfield\b/;
    var regExp2 = /[(,),<,>,\[,\]]/;
    var str = s.value; if ( str == "" ){ 
      alert("Please be sure to enter something to search for.");
      s.focus();
    } else { 
      if ( typeof regExp1.source != 'undefined' ) //supports regular expression testing 
        if ( regExp1.test( str ) || regExp2.test( str ) ){
          var alrt = "Please note that you can not include:"; 
          alrt += "\n\nThe reserved word 'field'\nthe characters [, ], (, ), < or >";
          alrt += "\n\nin your search query!\n\nIf you are confident that you know";
          alrt += "\nwhat you are doing, then you can\nmanually produce the URL required."
          s.focus();
          return alert( alrt );
        }
      openDbRelativeURL("All?SearchView&Query=" + escape( str ) + "&start=1&count=10");
    }
  }
  
  *  *  *  *  *  *  *  *  *  */