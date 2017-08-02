;(function(global, document, $){
    'use strict';

    var doc = $(document);

    function downloadWidget(selector, active, download){
        if ( this === undefined ) {
            return new downloadWidget(selector, active);
        }
        this.download_areas = $(selector);
        this.active = active || 'show-widget';
        this.download = download || 'download-file';
        this.activated = null;
        this.init();
    }

    downloadWidget.prototype = {
        constructor: downloadWidget,
        init: function(){
            var _this = this;
            $.each(_this.download_areas, function(index){
                var area = _this.download_areas.eq(index);
                area.attr({
                    'tabindex': 0,
                    'aria-label': '첨부파일 다운로드 팝업 보기'
                });
                area.children('.'+_this.download).attr('aria-hidden', true);
                area.on('focus click', _this.showDownloadWidget.bind(_this, area));
            });
            doc.on('click', function(e){
                var target = e.target;
                _this.activated = _this.download_areas.filter('.'+_this.active);
                if ( _this.activated.length > 0 ) {
                    if (_this.activated.is(target)) { return; }
                    _this.hideDownloadWidget.call(_this, _this.activated);
                }
            });
        },
        showDownloadWidget: function(area){
            area.addClass(this.active);
            var file = area.children('.'+this.download);
            if ( file.length > 0 ) {
                file.attr('aria-hidden', false);
                file.children('a:last').on('focusout', this.hideDownloadWidget.bind(this, area));
            }
        },
        hideDownloadWidget: function(area){
            area.removeClass(this.active);
            area.children('.'+this.download).attr('aria-hidden', true);
        }
    };

    global.downloadWidget = downloadWidget;

})(window, document, window.jQuery);