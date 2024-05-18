sap.ui.define([], function () {
  "use strict";

  return {
    formatDate: function (sDate) {
      var oDate = new Date(sDate);
      return oDate.toDateString();
    }
  };
});
