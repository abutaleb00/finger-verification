(function (w) {
  function format(s) {
    var i = arguments.length;

    while (i-- > 1) {
      s = s.replace(new RegExp("\\{" + (i - 1) + "\\}", "gm"), arguments[i]);
    }

    return s;
  }

  function showBusyModal(msg) {
    var msgHtml = $("<div/>").css({
      display: "none",
      padding: "50px",
      width: "30%",
      border: "4px solid #3aa061",
      "border-radius": "7px",
      "background-color": "white",
    });
    msgHtml.html(msg);
    $("body").append(msgHtml);
    return $(msgHtml).easyModal({
      overlayClose: false,
      closeOnEscape: false,
    });
  }

  function error(msg) {
    return {
      isError: true,
      message:
        msg ||
        "Timeout! Could not capture finger! <br/> Please Check if the device is connected/ready.",
    };
  }

  function FingerCapturer(port, header, color) {
    this.port = port || 12002;
    this.server = "http://127.0.0.1";
    this.header = header || null;
    this.hcolor = color || "auto";
  }

  FingerCapturer.prototype.captureFinger = function captureFinger(callback) {
    var modalHtml =
      "<div>Please put your finger on the scanner. It is recommended to press your finger a bit for better match response.</div>";
    if (this.header) {
      var h = $("<h2/>").html(this.header).css({
        color: this.hcolor,
        "border-bottom": "2px solid #eee",
        "padding-bottom": "5px",
        "margin-bottom": "5px",
      })[0].outerHTML;
      modalHtml = h + modalHtml;
    }
    var bzModal = showBusyModal(modalHtml);
    bzModal.trigger("openModal");
    var captureRequest = $.ajax({
      url: format("{0}:{1}/capture/", this.server, this.port),
      async: true,
      crossDomain: true,
      dataType: "jsonp",
      contentType: "jsonp",
      timeout: 50000,
    });

    captureRequest
      .done(function (result) {
        bzModal.trigger("closeModal");
        callback(result);
      })
      .fail(function (jqxhr, textStatus, er) {
        bzModal.trigger("closeModal");
        callback(error());
      });
  };

  w.FingerCapturer = FingerCapturer;
})(window);

(function ($) {
  "use strict";
  var methods = {
    init: function (options) {
      var defaults = {
        top: "auto",
        autoOpen: false,
        overlayOpacity: 0.5,
        overlayColor: "#000",
        overlayClose: true,
        overlayParent: "body",
        closeOnEscape: true,
        closeButtonClass: ".close",
        transitionIn: "",
        transitionOut: "",
        onOpen: false,
        onClose: false,
        zIndex: function () {
          return (function (value) {
            return value === -Infinity ? 0 : value + 1;
          })(
            Math.max.apply(
              Math,
              $.makeArray(
                $("*")
                  .map(function () {
                    return $(this).css("z-index");
                  })
                  .filter(function () {
                    return $.isNumeric(this);
                  })
                  .map(function () {
                    return parseInt(this, 10);
                  })
              )
            )
          );
        },
        updateZIndexOnOpen: true,
      };

      options = $.extend(defaults, options);

      return this.each(function () {
        var o = options,
          $overlay = $('<div class="lean-overlay"></div>'),
          $modal = $(this);

        $overlay
          .css({
            display: "none",
            position: "fixed",
            // When updateZIndexOnOpen is set to true, we avoid computing the z-index on initialization,
            // because the value would be replaced when opening the modal.
            "z-index": o.updateZIndexOnOpen ? 0 : o.zIndex(),
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            background: o.overlayColor,
            opacity: o.overlayOpacity,
            overflow: "auto",
          })
          .appendTo(o.overlayParent);

        $modal.css({
          display: "none",
          position: "fixed",
          // When updateZIndexOnOpen is set to true, we avoid computing the z-index on initialization,
          // because the value would be replaced when opening the modal.
          "z-index": o.updateZIndexOnOpen ? 0 : o.zIndex() + 1,
          left: 50 + "%",
          top: parseInt(o.top, 10) > -1 ? o.top + "px" : 50 + "%",
        });

        $modal.bind("openModal", function () {
          var overlayZ = o.updateZIndexOnOpen
              ? o.zIndex()
              : parseInt($overlay.css("z-index"), 10),
            modalZ = overlayZ + 1;

          if (o.transitionIn !== "" && o.transitionOut !== "") {
            $modal.removeClass(o.transitionOut).addClass(o.transitionIn);
          }
          $modal.css({
            display: "block",
            "margin-left": -($modal.outerWidth() / 2) + "px",
            "margin-top":
              (parseInt(o.top, 10) > -1 ? 0 : -($modal.outerHeight() / 2)) +
              "px",
            "z-index": modalZ,
          });

          $overlay.css({ "z-index": overlayZ, display: "block" });

          if (o.onOpen && typeof o.onOpen === "function") {
            // onOpen callback receives as argument the modal window
            o.onOpen($modal[0]);
          }
        });

        $modal.bind("closeModal", function () {
          if (o.transitionIn !== "" && o.transitionOut !== "") {
            $modal.removeClass(o.transitionIn).addClass(o.transitionOut);
            $modal.one(
              "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
              function () {
                $modal.css("display", "none");
                $overlay.css("display", "none");
              }
            );
          } else {
            $modal.css("display", "none");
            $overlay.css("display", "none");
          }
          if (o.onClose && typeof o.onClose === "function") {
            // onClose callback receives as argument the modal window
            o.onClose($modal[0]);
          }
        });

        // Close on overlay click
        $overlay.click(function () {
          if (o.overlayClose) {
            $modal.trigger("closeModal");
          }
        });

        $(document).keydown(function (e) {
          // ESCAPE key pressed
          if (o.closeOnEscape && e.keyCode === 27) {
            $modal.trigger("closeModal");
          }
        });

        // Close when button pressed
        $modal.on("click", o.closeButtonClass, function (e) {
          $modal.trigger("closeModal");
          e.preventDefault();
        });

        // Automatically open modal if option set
        if (o.autoOpen) {
          $modal.trigger("openModal");
        }
      });
    },
  };

  $.fn.easyModal = function (method) {
    // Method calling logic
    if (methods[method]) {
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    }

    if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    }

    $.error("Method " + method + " does not exist on jQuery.easyModal");
  };
})(jQuery);
