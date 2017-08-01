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

    // 테스트 팝업
    $('.btn-popup-test').on('click', function(e) {
      e.preventDefault();
      // 팝업 찾아 열기 (id)
      $.popupId($popups, 'test-area').open();
    });

    // Q&ampA 팝업
    $('.btn-popup-qna').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-qna').open();
    });

    // 공지사항 상세 팝업
    $('.btn-popup-notices').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-notices').open();
    });

    // 자료실 상세 팝업
    $('.btn-popup-resources').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-resources').open();
    });

    // 공고내용 상세보기 팝업
    $('.btn-popup-business-application').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-business-application').open();
    });
    
    // GNB 전체메뉴
    // 상단 메뉴 버튼 클릭 시 전체메뉴 오픈
    $('.btn-gnb-all').click(function() {
       $('#gnb-all-menu').toggleClass('open');
    });
    // 전체메뉴 닫기 버튼 클릭 시 닫기
    $('.btn-gnb-close').click(function() {
       $('#gnb-all-menu').toggleClass('open');
    });

    // 아코디언 설정
    var aco_bases = $(".aco-base");
    var aco_opens = $(".aco-open");
    // 기본 설정 (패널 닫힘)
    $.each(aco_bases,function(index) {
        var aco_base = aco_bases.eq(index);
        new $.Accordion(aco_base);
    });
    // 첫번째 패널 오픈
    $.each(aco_opens,function(index) {
        var aco_open = aco_opens.eq(index);
        new $.Accordion(aco_open, 1);
    });

    // SelectBox Option 선택 설정
    var selectbox = $("select");
    selectbox.change(function(){
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
    });

    // -------------------------------------------------------------------
    //다운로드 파일 말풍선 설정
    // -------------------------------------------------------------------

    // document 객체 jQuery화
    var doc = $(document);
    // .download-type-02 문서 객체 참조 jQuery 화
    var download_areas = $(".download-type-02");
    // 활성화 클래스 이름 설정(변경 가능, CSS에도 적용해야 함)
    var download_active_class = 'show-widget';

    // jQuery화된 document 객체에 클릭 이벤트 연결
    doc.on('click', function(e){
        // 클릭한 대상(이벤트 타겟) 참조
        var target = e.target;
        // 현재 문서에서 활성화된 다운로드 에이리어 요소 참조
        var activated = download_areas.filter('.'+download_active_class);
        // 활성화된 요소가 존재한다면
        if ( activated.length > 0 ) {
            // 활성화된 요소와 클릭한 대상이 같다면 함수 종료
            if (activated.is(target)) { return; }
            // hideDownloadWidget() 함수 호출 (this === 활성화된 요소 적용)
            hideDownloadWidget.call(activated);
        }
    });

    // download_areas 참조 객체를 순환하여 콜백 함수 처리
    // 순환되는 인덱스(index) 값을 첫번째 매개변수로 받음
    $.each(download_areas, function(index){
        // area 변수에 순환되는 jQuery 객체(download_areas 집합의 개별 아이템) 참조
        var area = download_areas.eq(index);
        // 각 아이템을 순환하여 이벤트 연결
        // 포커스, 클릭 이벤트 발생 시 showDownloadWidget() 함수 실행
        // 함수의 this 컨텍스트를 area (순환되는 개별 아이템)으로 설정
        area.on('focus click', showDownloadWidget.bind(area));
    });

    // 다운로드 위젯을 보여주는 함수
    function showDownloadWidget(){
        // area 참조 객체에 download_active_class 추가
        this.addClass(download_active_class);
        // file 변수에 area 자식 .download-file 대상 찾아 참조
        var file = this.children('.download-file');
        // file 객체가 존재한다면
        if ( file.length > 0 ) {
            // file 객체에 aria-hidden 속성 false 로 설정
            file.attr('aria-hidden', false);
            // file 자식 중 마지막 a 요소를 찾아 focusout 이벤트 연결
            // 이벤트 발생 시, hideDownloadWidget() 함수 실행
            // this 참조 값으로 area 객체 설정
            file.children('a:last').on('focusout', hideDownloadWidget.bind(this));
        }
    }

    // 다운로드 위젯을 감추는 함수
    function hideDownloadWidget(){
        // area 참조 객체에 download_active_class 제거
        this.removeClass(download_active_class);
        // file 객체에 aria-hidden 속성 true 로 설정
        this.children('.download-file').attr('aria-hidden', true);
    }

})(window, document, window.jQuery);