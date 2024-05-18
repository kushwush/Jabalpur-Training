sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
],
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },
            createProductModel: function () {
                let productData = {
                    Products: [
                        {
                            ProductName: "Notebook Basic 15",
                            ProductID: "HT-1000",
                            ProductPrice: "1000"
                        },
                        {
                            ProductName: "Notebook Professional 15",
                            ProductID: "HT-1001",
                            ProductPrice: "2000"
                        },
                        {
                            ProductName: "Notebook Basic 17",
                            ProductID: "HT-1002",
                            ProductPrice: "1500"
                        },
                        {
                            ProductName: "Notebook Professional 17",
                            ProductID: "HT-1003",
                            ProductPrice: "2500"
                        }
                    ]
                };

                let productModel = new JSONModel(productData);

                return productModel;
            }
        };
    });