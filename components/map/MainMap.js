import React, { useRef, useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import WebMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Locate from '@arcgis/core/widgets/Locate'
import LayerList from '@arcgis/core/widgets/LayerList'
import GroupLayer from '@arcgis/core/layers/GroupLayer'
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'
import '@arcgis/core/assets/esri/themes/dark/main.css'
import config from '@arcgis/core/config.js'
import { useStyles } from '../../styles/jsx/components/map/mainMap.style.js'
import Router, { useRouter } from 'next/router'
config.assetsPath = '/assets'

function MainMap (props) {
    const router = useRouter()
    const mapDiv = useRef(null)
    const classes = useStyles()
    const [layers, setLayers] = useState()
    const { events } = router.query

    const renderer = {
        type: 'simple',
        field: 'mag',
        symbol: {
            type: 'simple-marker',
            size: 7,
            color: '#69dcff',
            outline: {
                color: 'rgba(0, 139, 174, 0.5)',
                width: 8
            }
        }
    }

    const cluster = {
        type: 'cluster',
        clusterRadius: '100px',
        // {cluster_count} is an aggregate field containing
        // the number of features comprised by the cluster
        popupTemplate: {
            // Desactiver le zoom overwriteActions: false,
            content: '{cluster_count} défi(s) ont été réalisé dans cette region. Zoom pour en voir plus !',
            fieldInfos: [
                {
                    fieldName: 'cluster_count',
                    format: {
                        places: 0,
                        digitSeparator: true
                    }
                }
            ]
        },
        clusterMinSize: '32px',
        clusterMaxSize: '60px',
        labelingInfo: [
            {
                deconflictionStrategy: 'none',
                labelExpressionInfo: {
                    expression: "Text($feature.cluster_count, '#,###')"
                },
                symbol: {
                    type: 'text',
                    color: '#004a5d',
                    font: {
                        weight: 'bold',
                        family: 'Noto Sans',
                        size: '12px'
                    }
                },
                labelPlacement: 'center-center'
            }
        ]
    }

    const popupTemplate = {
        // autocasts as new PopupTemplate()
        title: '{titre}',
        content: [
            {
                // The following creates a piechart in addition to an image. The chart is
                // also set  up to work with related tables.
                // Autocasts as new MediaContent()
                type: 'media',
                // Autocasts as array of MediaInfo objects
                mediaInfos: [{
                    title: '{imageTitre}',
                    type: 'image', // Autocasts as new ImageMediaInfo object
                    // caption: "tree species",
                    // Autocasts as new ImageMediaInfoValue object
                    value: {
                        sourceURL: '{imageURL}'
                    }
                }]
            },
            {
                // It is also possible to set the fieldInfos outside of the content
                // directly in the popupTemplate. If no fieldInfos is specifically set
                // in the content, it defaults to whatever may be set within the popupTemplate.
                type: 'fields',
                fieldInfos: [
                    {
                        fieldName: 'nickname',
                        label: 'Utilisateur :'
                    }
                ]
            }
        ]
    }

    async function fetchData () {
        try {
            const bodyContent = { eventName: events }
            const response = await fetch('/api/fetchGeoJson', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyContent)
            })
            if (response.status === 200) {
                const content = await response.json()
                // initGame(content)
                getFinalLay(content)
            } else {
                await Router.push('/[events]', {
                    pathname: `/${events}`,
                    query: { modal: true }
                })
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async function getFinalLay (layersJson) {
        var final = []
        if (layersJson.geoJSONList) {
            for (const layer in layersJson.geoJSONList) {
                const newLayer = new GeoJSONLayer({
                    url: 'https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest' + layersJson.geoJSONList[layer].relativeURL,
                    title: layersJson.geoJSONList[layer].title,
                    featureReduction: cluster,
                    renderer: renderer, // optional,
                    popupTemplate
                })
                // webmap.add(newLayer)
                final.push(newLayer)
            }
            const group = new GroupLayer({
                title: 'Les défis RTS !',
                visible: true,
                visibilityMode: 'exclusive',
                layers: final
            })
            setLayers(group)
        }
    }

    useEffect(() => {
        if (!layers) {
            fetchData()
        } else if (mapDiv.current) {
            const webmap = new WebMap({
                basemap: {
                    portalItem: {
                        id: 'e3a50650b40e45a9b7071c72019e87b4',
                        portal: 'https://www.arcgis.com'
                    }
                },
                layers: layers
                // layers: dayLayer
            })

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
                },
                zoom: 8,
                center: [7.096432, 47.064489] // longitude, latitude
            })

            view.watch('scale', function (scale) {
                console.log(view.scale)
                console.log(layers)
                /* console.log(layers.layers._items)
                 if (view.scale < 150000) {
                    layers.featureReduction = null
                } else {
                    layers.featureReduction = cluster
                }
                  for (const layer in layers) {
                    // console.log(layers[layer])
                    if (view.scale < 150000) {
                        layers[layer].featureReduction = null
                    } else {
                        layers[layer].featureReduction = cluster
                    }
                } */
                for (const layer in layers.layers.items) {
                    // console.log(layers[layer])
                    if (view.scale < 150000) {
                        layers.layers._items[layer].featureReduction = null
                    } else {
                        layers.layers._items[layer].featureReduction = cluster
                    }
                }
            })

            view.when(function () {
                var layerList = new LayerList({
                    multipleSelectionEnabled: false,
                    view: view,
                    listItemCreatedFunction: function (event) {
                        // The event object contains properties of the
                        // layer in the LayerList widget.

                        var item = event.item
                        item.open = true
                    }
                })
                // Add widget to the top right corner of the view
                view.ui.add(layerList, 'top-right')
            })

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
    }, [layers])
    return (
        <Box className={classes.mapContainer}>
            <div style={{ height: window.innerHeight, width: '100%' }} className={classes.mapDiv} id="mapDiv" ref={mapDiv}></div>
        </Box>
    )
}
export default MainMap
