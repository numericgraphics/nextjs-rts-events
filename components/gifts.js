import React from 'react'
import Gift from './gift'
import SwipeableViews from 'react-swipeable-views'

export default function Gifts (props) {
    return (
        <SwipeableViews
            enableMouseEvents
            onChangeIndex={(index) => {
                props.indexCallBack(index)
            }}
        >
            {props.data.map((item, index) => {
                return (
                    <Gift key={index} description={item.description}/>
                )
            })}
        </SwipeableViews>
    )
}
