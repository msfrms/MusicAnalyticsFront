import React from "react";
import { Component } from "react";
import { connectAdvanced } from "react-redux";
import { TrackPageProps, TrackPageWrapComponent } from "./TrackPageComponent";
import { trackPageSelector } from "./utils/TrackPageSelector";

class AlbumPageComponent extends Component<TrackPageProps|undefined> {

    componentDidMount() {
        this.props.didMount()
    }

    render() {        
        return (
            <TrackPageWrapComponent {...this.props}/>
        )
    }
}

export default connectAdvanced(trackPageSelector)(AlbumPageComponent)