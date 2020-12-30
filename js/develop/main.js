$(document).ready(function () {
  if ($(".share-sides").length && $(window).width() > 1024) {
    //$(".share-sides").sticky({topSpacing: 20});
    /*
        var sticky1 = new Sticky('.texter-part .social .share-sides');
        var sticky2 = new Sticky('.texter-part .news-list .convert');
*/
    $(".texter-part .social, .texter-part .news-list").stick_in_parent();
    //$("").stick_in_parent();
  }

  $("select").select2();

  /* tabs */

  $(".navigate-tabs ul li a").on("click", function (e) {
    e.preventDefault();
    if (!$(this).closest("li").hasClass("active")) {
      $(".navigate-tabs ul li").removeClass("active");
      $(this).closest("li").addClass("active");

      $(".content-tabs ul li.active").slideUp(300, function () {
        $(this).removeClass("active");
      });

      $(".content-tabs ul li")
        .eq($(this).closest("li").index())
        .slideDown(300, function () {
          $(this).addClass("active");
        });
    }
  });

  /* tabs */

  /* widjet copy */

  $(".button-for-copy").on("click", function (e) {
    e.preventDefault();
    var content = $(".textarea-place textarea").val();
    console.log(content);

    var copyTextarea = $(".textarea-place textarea");
    copyTextarea.focus();
    copyTextarea.select();

    document.execCommand("copy");
  });

  /* widjet copy */

  /* create single button */

  if ($(".create-next-button").length) {
    var curname = $(".create-next-button a").attr("data-curmin");
    var currentHref = $(".create-next-button a").attr("href");

    $.ajax({
      url: "api.coincap.io/v2/",
      method: "GET",
      success: function (data) {
        var next;
        data.forEach((item, index) => {
          if (item.short.toLowerCase() === curname.toLowerCase()) {
            if (index + 1 >= data.length) {
              next = 0;
            } else {
              next = index + 1;
            }
          }
        });

        $(".create-next-button a").attr(
          "href",
          currentHref + data[next].short.toLowerCase() + "/"
        );
      },
    });
  }

  /* create single button */

  /* preloader */

  setTimeout(function () {
    $("#preloader").fadeOut(500, function () {
      $("body").removeClass("lock");
      $("#preloader").remove();
    });
  }, 1500);

  /* preloader */

  /* single popups */

  $(".butt-to-add .butt").on("click", function (e) {
    e.preventDefault();
    $(".hidden-pop-for-add").fadeIn(100);
  });

  $(".hidden-pop-for-add .closer-pop").on("click", function () {
    $(".hidden-pop-for-add").fadeOut(100);
  });

  /* single popups */

  /* print */

  $(".print").on("click", function (e) {
    e.preventDefault();
    window.print();
  });

  /* print */

  /* hidden-search */

  $(".hidden-search .butt").on("click", function (e) {
    e.preventDefault();
    if (!$(this).hasClass("active")) {
      $(this).addClass("active");
      $(".head-row .simple-part .search-part").slideDown(300);
    } else {
      $(this).removeClass("active");
      $(".head-row .simple-part .search-part").slideUp(300);
    }
  });

  /* hidden-search */

  /* custom pop */

  $(".go-to-main").on("click", function (e) {
    e.preventDefault();
    var curr = $(this).attr("href");
    $("body").addClass("lock");
    $(curr).fadeIn(300);
  });

  $(".closer-pop").on("click", function () {
    $("body").removeClass("lock");
    $("#pop-valute").fadeOut(300);
  });

  /* custom pop */

  /* menu */
  $(".hidden-butter").on("click", function (e) {
    e.preventDefault();
    if (!$(this).hasClass("active")) {
      $(this).addClass("active");
      $(".hidden-menu").addClass("active");
    } else {
      $(this).removeClass("active");
      $(".hidden-menu").removeClass("active");
    }
  });
  /* menu */

  /* tabs */

  $(".news-list  .head-tabs li a").on("click", function (e) {
    e.preventDefault();
    if (!$(this).closest("li").hasClass("active")) {
      $(".news-list  .head-tabs li").removeClass("active");
      $(this).closest("li").addClass("active");

      $(".news-list  .content-tabs  li.active").slideUp(300, function () {
        $(this).removeClass("active");
      });

      $(".news-list  .content-tabs  li")
        .eq($(this).closest("li").index())
        .slideDown(300, function () {
          $(this).addClass("active");
        });
    }
  });

  /* tabs */
});

$(window).on("load", function () {});

$(window).resize(function () {});
