sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        let deltojbl = {};
        let deltojblcoords = [];
        let movingMarkerLayer;
        return Controller.extend("leafletmap.controller.View1", {
            onInit: function () {
                deltojbl = this.getOwnerComponent().getModel("deltojbl").getData();
                deltojblcoords = deltojbl.features[0].geometry.coordinates || [];
                this.getView().setModel(new sap.ui.model.json.JSONModel({ visible: false }), "buttonmodel");
            },

            onAfterRendering: function () {
                let mapPanel = this.getView().byId("map");
                // initialize leaflet map and set the center to India
                this.map = L.map(mapPanel.getId()).setView([28.7041, 77.1025], 5);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                }).addTo(this.map);

                // add delhi to jabalpur geojson to the map
                L.geoJSON(deltojbl).addTo(this.map);
                
                // add restart button on the map
                this.setupRestartButton();

                // add moving marker to the map
                this.setupMovingMarker();


            },

            setupMovingMarker: function () {
                movingMarkerLayer = L.layerGroup().addTo(this.map);
                let trainIcon = L.icon({
                    iconUrl: `${$.sap.getModulePath("leafletmap")}/images/train-icon.png`,
                    iconSize: [24, 24],
                    iconAnchor: [12, 12]
                });

                this.playMovingMarker(trainIcon);
            },

            playMovingMarker: function (trainIcon) {
                deltojblcoords.forEach((coords, index) => {
                    setTimeout(() => {
                        movingMarkerLayer.clearLayers();
                        L.marker([coords[1], coords[0]], { icon: trainIcon }).addTo(movingMarkerLayer);
                        // this.map.panTo([coords[1], coords[0]]);
                    }, 50 * index);
                    if (index === deltojblcoords.length - 1) {
                        setTimeout(() => {
                            this.getView().getModel("buttonmodel").setProperty("/visible", true);
                        }, 50 * index);
                    }
                });
            },

            restartMovingMarker: function () {
                this.getView().getModel("buttonmodel").setProperty("/visible", false);
                movingMarkerLayer.clearLayers();
                this.setupMovingMarker();
            },

            setupRestartButton: function () {
                let restartButton = L.control({ position: 'topright' });

                const oButton = new sap.m.Button({
                    text: "Restart",
                    press: this.restartMovingMarker.bind(this),
                    visible: "{buttonmodel>/visible}"
                });

                oButton.setModel(this.getView().getModel("buttonmodel"));

                restartButton.onAdd = function () {
                    let div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
                    return div;
                };

                restartButton.addTo(this.map);
                oButton.placeAt(restartButton.getContainer());
            }
        });
    });
