sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("booklist.controller.View1", {
			onInit: function () {

			},

			onGoodExamplePress(_oEvent) {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("GoodExample");
			},

			onBadExamplePress(_oEvent) {
				this.getOwnerComponent().getRouter().navTo("BadExample");
			}
		});
	});
