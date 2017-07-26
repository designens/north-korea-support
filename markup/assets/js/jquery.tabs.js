;(function($) {

    var tabs = $(".tablist li[role='tab']"),
        panel = $(".tab-panel[role='tabpanel']");

    tabs.click(function() {
        tabs.attr("aria-selected", "false");
        $(this).attr("aria-selected", "true");
        var tabpanid = $(this).attr("aria-controls");
        var tabpan = $("#" + tabpanid);
        $(panel).attr("aria-hidden", "true");
        tabpan.attr("aria-hidden", "false");
    });

    tabs.keydown(function(ev) {
        if (ev.which == 13) {
            $(this).click();
        }
    });

    tabs.keydown(function(ev) { 
        if ((ev.which == 39) || (ev.which == 37)) {
            var selected = $(this).attr("aria-selected");
            if (selected == "true") {
                $(".tablist li[aria-selected='false']").attr("aria-selected","true").focus();
                $(this).attr("aria-selected","false");
                var tabpanid = $(".tablist li[aria-selected='true']").attr("aria-controls");
                var tabpan = $("#" + tabpanid);
                panel.attr("aria-hidden", "true");
                tabpan.attr("aria-hidden", "false");
            }
        }
    });
    
}(window.jQuery));