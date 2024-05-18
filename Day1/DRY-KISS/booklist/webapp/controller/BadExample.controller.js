sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
  "use strict";

  return Controller.extend("booklist.controller.BadExample", {
    onInit: function () {
      console.time("BadExample");
      var oModel = new JSONModel({
        books: [
          { title: "Book 1", author: "Author 1", publishedDate: "2021-01-01" },
          { title: "Book 2", author: "Author 2", publishedDate: "2022-02-02" }
        ]
      });
      this.getView().setModel(oModel);

      // Duplicate date formatting logic
      this.getView().byId("bookList").getItems().forEach(function (item) {
        var oContext = item.getBindingContext();
        var sDate = oContext.getProperty("publishedDate");
        var oDate = new Date(sDate);
        item.getContent()[0].getAggregation("items")[2].setText(oDate.toDateString())
      });
      console.timeEnd("BadExample");
    }
  });
});
