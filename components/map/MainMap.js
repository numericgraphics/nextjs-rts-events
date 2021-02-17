import React, { useRef, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import WebMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Layer from '@arcgis/core/layers/Layer'
import Locate from '@arcgis/core/widgets/Locate'
import LayerList from '@arcgis/core/widgets/LayerList'
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'
import '@arcgis/core/assets/esri/themes/dark/main.css'

function MainMap (props) {
    const baseURL = window.location.origin
    const mapDiv = useRef(null)
    useEffect(() => {
        if (mapDiv.current) {
            const popupTemplate = {
                // autocasts as new PopupTemplate()
                title: '{titre}',
                content: [
                    {
                        // It is also possible to set the fieldInfos outside of the content
                        // directly in the popupTemplate. If no fieldInfos is specifically set
                        // in the content, it defaults to whatever may be set within the popupTemplate.
                        type: 'fields',
                        fieldInfos: [
                            {
                                fieldName: 'eventDescription',
                                label: 'Description'
                            },
                            {
                                fieldName: 'eventDate',
                                label: 'Date'
                            },
                            {
                                fieldName: 'eventHour',
                                label: 'Heure'
                            }
                        ]
                    }
                ]
            }

            const renderer = {
                type: 'simple',
                field: 'mag',
                symbol: {
                    type: 'simple-marker',
                    size: 10,
                    color: '#019406',
                    outline: {
                        color: 'rgba(1, 148, 6, 0.5)',
                        width: 11
                    }
                }
            }

            const pastRenderer = {
                type: 'simple',
                field: 'mag',
                symbol: {
                    type: 'simple-marker',
                    size: 10,
                    color: '#af001e',
                    outline: {
                        color: 'rgba(175, 0, 30, 0.5)',
                        width: 11
                    }
                }
            }

            const futurRenderer = {
                type: 'simple',
                field: 'mag',
                symbol: {
                    type: 'simple-marker',
                    size: 10,
                    color: '#e3cc00',
                    outline: {
                        color: 'rgba(227, 204, 0, 0.5)',
                        width: 11
                    }
                }
            }

            const dayLayer = new GeoJSONLayer({
                url: baseURL + '/currentEvent.geojson',
                title: 'Event du jour',
                renderer: renderer, // optional,
                popupTemplate
            })

            const futurLayer = new GeoJSONLayer({
                url: baseURL + '/futurEvent.geojson',
                visible: false,
                title: 'Event à venir',
                renderer: futurRenderer, // optional,
                popupTemplate
            })

            const pastLayer = new GeoJSONLayer({
                url: baseURL + '/pastEvent.geojson',
                visible: false,
                title: 'Event passé',
                copyright: 'RTS Challenge',
                renderer: pastRenderer, // optional,
                popupTemplate
            })

            /* geojsonLayer.popupTemplate.content = [{
          // The following creates a piechart in addition to an image. The chart is
          // also set  up to work with related tables.
          // Autocasts as new MediaContent()
          type: "media",
          // Autocasts as array of MediaInfo objects
          mediaInfos: [{
            title: "<b>Mexican Fan Palm</b>",
            type: "image", // Autocasts as new ImageMediaInfo object
            caption: "tree species",
            // Autocasts as new ImageMediaInfoValue object
            value: {
              sourceURL: "https://www.sunset.com/wp-content/uploads/96006df453533f4c982212b8cc7882f5-800x0-c-default.jpg"
            }
          }]
        }]; */
            // test
            /* var basemap = new Basemap({
          baseLayers: [
            new MapImageLayer({
              url: "url to your dynamic MapServer",
              title: "Basemap"
            })
          ],
          title: "basemap",
          id: "basemap"
        }); */

            const webmap = new WebMap({
                basemap: 'topo-vector',
                // basemap: basemap,
                layers: [futurLayer, dayLayer, pastLayer]
            })

            console.log(webmap)

            const view = new MapView({
                container: mapDiv.current,
                map: webmap,
                popup: {
                    collapseEnabled: false,
                    dockEnabled: true,
                    dockOptions: {
                        breakpoint: true,
                        buttonEnabled: false
                    }
                }
            // zoom: 8,
            // center: [7.096432,47.064489] // longitude, latitude
            })

            view.when(function () {
                var layerList = new LayerList({
                    multipleSelectionEnabled: false,
                    view: view
                })
                console.log(layerList.visibleElements)
                // Add widget to the top right corner of the view
                view.ui.add(layerList, 'top-right')
            })

            Layer.fromPortalItem({
                portalItem: {
                    // autocasts as new PortalItem()
                    id: 'fbab6ce6b9ea4566a768f3804f4b0bb5'
                }
            })
                .then(addLayer)
                .catch(rejection)

            // Adds the layer to the map once it loads
            // eslint-disable-next-line no-inner-declarations
            function addLayer (layer) {
                console.log('added')
                layer.listMode = 'hide'
                webmap.add(layer)
            }

            // eslint-disable-next-line no-inner-declarations
            function rejection (error) {
                console.log('Layer failed to load: ', error)
            }

            var locate = new Locate({
                view: view,
                useHeadingEnabled: false,
                goToOverride: function (view, options) {
                    options.target.scale = 1450
                    return view.goTo(options.target)
                }
            })

            view.ui.add(locate, 'top-left')
        }
    }, [])

    return (
        <Box className="mapContainer">
            <div style={{ height: window.innerHeight, width: '100vw' }} id="mapDiv" ref={mapDiv}></div>
        </Box>
    )
}
export default MainMap
