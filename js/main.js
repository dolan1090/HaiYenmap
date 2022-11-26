// SmartMenus init
$(function() {
  $('#main-menu').smartmenus({
    subMenusSubOffsetX: 6,
    subMenusSubOffsetY: -8
  });
});

// SmartMenus mobile menu toggle button
$(function() {
  var $mainMenuState = $('#main-menu-state');
  if ($mainMenuState.length) {
    // animate mobile menu
    $mainMenuState.change(function(e) {
      var $menu = $('#main-menu');
      if (this.checked) {
        $menu.hide().slideDown(250, function() { $menu.css('display', ''); });
      } else {
        $menu.show().slideUp(250, function() { $menu.css('display', ''); });
      }
    });
    // hide mobile menu beforeunload
    $(window).bind('beforeunload unload', function() {
      if ($mainMenuState[0].checked) {
        $mainMenuState[0].click();
      }
    });
  }
});

// Fix bug
var btn_close_topmenu = document.querySelector("#main-menu-state");
var main_topmenu = document.querySelector("#main-menu");
btn_close_topmenu.onclick = function () {
  if (!main_topmenu.classList.contains('show-mn')) {
    main_topmenu.classList.add('show-mn');
  } else {
    main_topmenu.classList.remove('show-mn');
  };    
};

// End Menu



var swiper = new Swiper(".mySwiper1", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  autoHeight: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

var swiper2 = new Swiper(".mySwipercard", {
  slidesPerView: 1,
  spaceBetween: 10,
  freeMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".mySwipercard .swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    992: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
  },
});

// End slide




 function init() { 

        if ($("#locations").length) { 

          if (navigator.geolocation) { 

            navigator.geolocation.getCurrentPosition( 

              function (e) { 

                var data = sort(e.coords.latitude, e.coords.longitude); 

              }, 

              function () { 

                $.getJSON("http://ipinfo.io/json", function (e) { 

                  var latLong = e.loc.split(","); 

                  var data = sort(latLong[0], latLong[1]); 

                }); 

              } 

            ); 

          } 

        } 

      } 

      function distance(p1, p2) { 

        return ( 

          google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000 

        ).toFixed(2); 

      } 

  

      function sort(lat, long) { 

        var current = new google.maps.LatLng(lat, long); 

  

        var map = document.getElementById("locations"); 

        var arrayMap = Array.prototype.slice.call( 

          map.querySelectorAll(".list-see"), 

          0 

        ); 

  

        arrayMap.sort(function (a, b) { 

          var loc1 = a.getAttribute("data-latlon").split(","); 

          var loc2 = b.getAttribute("data-latlon").split(","); 

          dist1 = distance( 

            current, 

            new google.maps.LatLng(Number(loc1[0]), Number(loc1[1])) 

          ); 

          dist2 = distance( 

            current, 

            new google.maps.LatLng(Number(loc2[0]), Number(loc2[1])) 

          ); 

  

          return dist1 - dist2; 

        }); 

        map.innerHTML = ""; 

        var data = ""; 

        arrayMap.forEach(function (el) { 

          if (data == "") 

            data = $("div.embedmap") 

              .eq($(el).data("id")) 

              .find(".data-map") 

              .html(); 

          var temp = el.getAttribute("data-latlon").split(","); 

          var dist = distance( 

            current, 

            new google.maps.LatLng(Number(temp[0]), Number(temp[1])) 

          ); 

          el.innerHTML = 

            el.innerHTML + 

            '<div class="distance">Cách bạn: ' + 

            dist + 

            " km</div>"; 

          map.appendChild(el); 

        }); 

        return data; 

      } 