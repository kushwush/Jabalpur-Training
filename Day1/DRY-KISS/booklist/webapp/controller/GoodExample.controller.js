sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "booklist/util/Formatter"
], function (Controller, JSONModel, Formatter) {
  "use strict";

  return Controller.extend("booklist.controller.GoodExample", {
    onInit: function () {
      console.time("GoodExample")
      // Set data model
      var oModel = new JSONModel({
        books: [
          { title: "Book 1", author: "Author 1", publishedDate: "2021-01-01" },
          { title: "Book 2", author: "Author 2", publishedDate: "2022-02-02" }
        ]
      });
      this.getView().setModel(oModel, "bookModel");
      console.timeEnd("GoodExample")
    },

    formatDate: Formatter.formatDate
  });
});
