import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Style from './MapStyle';


const clientLocList = [
    {
        name: "client1", lat: 21.95, lng: 96.093,
    },
    {
        name: "client2", lat: 21.6, lng: 96.2,

    },
    {
        name: "client3", lat: 21.30, lng: 96.5,

    },
]

export class MapView extends Component {

    //IntialState
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) => {

        console.log("okClicked")
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };


    _displayMarker = () => {


        return clientLocList.map((store, index) => {

            return <Marker
                key={index}
                id={index}
                position={{
                    lat: store.lat,
                    lng: store.lng
                }}
                onClick={this.onMarkerClick} >
            </Marker>
        })
    }
    render() {
        return (
            <div>
                <Map
                    styles={Style}
                    disableDefaultUI={true}
                    initialCenter={{ lat: 20.6, lng: 96.0 }}
                    zoomControl={true}
                    zoom={8}
                    onClick={this.onMapClicked}
                    google={this.props.google}
                >
                    {this._displayMarker()}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                            <h1>Hello</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    // apiKey: "" //Place Your Api Key Here!
})(MapView);

