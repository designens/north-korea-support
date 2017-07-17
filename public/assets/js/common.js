(function(global, doc, $) {

    // SVGInjector : Style 설정
    var svgInjection = function() {
        // img.inject-me 요소 수집해서 mySVGsToInject 변수에 참조
        var mySVGsToInject = doc.querySelectorAll('img.inject-svg');
        // SVG 주입(Injector) 설정 옵션
        var injectorOptions = {
            evalScripts: 'once', // always, once, never
            pngFallback: 'images/ie-assets', // PNG 대체 폴더 설정
            each: function(svg) {
                // svg는 수집된 개별 img.inject-me를 가리킴
                console.log(svg.id);
            }
        };
        // SVGInjector 함수에 연결
        SVGInjector(
            // 수집된 img.inject-me 요소
            mySVGsToInject,
            // SVG 주입(Injector) 설정 옵션
            injectorOptions,
            // 콜백 함수
            function(totalSVGsInjected) {
                // totalSVGsInjected는 SVG 주입된 설정 개수를 출력
                // console.log(totalSVGsInjected);
            }
        );
    };

    // IMG => SVG로 변환, ie9 이하 버전 PNG로 대체
    svgInjection();

    // 부드럽게 스크롤 이동 처리
    smoothScroll.init();

    // 팝업 플러그인 연결
    var $popups = $('.popup').a11y_popup();

    // 버튼 컨트롤
    $('.btn-popup-login').on('click', function(e) {
      e.preventDefault();
      // 팝업 찾아 열기 (id)
      $.popupId($popups, 'login-area').open();
    });

    // 팝업 컨트롤 범위 지정
    $('.popup').draggable({
        containment: "body" //지정된 영역안에서만 이동
    });

    // GNB 전체메뉴
    var menu = doc.querySelector("#gnb-all-menu"),
    toggle = doc.querySelector(".btn-gnb-all");

    function toggleMenu() {
      menu.classList.toggle("active");
    };

    toggle.addEventListener("click", toggleMenu, false);


})(window, document, window.jQuery);