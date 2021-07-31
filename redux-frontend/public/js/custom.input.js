$(document).ready(function () {
    'use strict';
    (function ($) {
      $(function () {
        $('input:checkbox,input:radio,.search-engine-range-selection-container input:radio').styler();
      })
    })(jQuery);

    var slider_range = $("#slider-range");
    var ammount_from = $("#ammount-from");
    var ammount_to = $("#ammount-to");

    $(function () {
      slider_range.slider({
        range: true,
        min: 0,
        max: 1500,
        values: [275, 1100],
        slide: function (event, ui) {
          ammount_from.val(ui.values[0] + '$');
          ammount_to.val(ui.values[1] + '$');
        }
      });
      ammount_from.val(slider_range.slider("values", 0) + '$');
      ammount_to.val(slider_range.slider("values", 1) + '$');
    });

    $(".side-time").each(function () {
      var $this = $(this);
      $this.find('.time-range').slider({
        range: true,
        min: 0,
        max: 24,
        values: [3, 20],
        slide: function (event, ui) {
          $this.find(".time-from").text(ui.values[0]);
          $this.find(".time-to").text(ui.values[1]);
        }
      });
      $(this).find(".time-from").text($this.find(".time-range").slider("values", 0));
      $(this).find(".time-to").text($this.find(".time-range").slider("values", 1));
    });
  });