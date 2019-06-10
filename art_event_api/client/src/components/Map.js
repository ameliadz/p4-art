import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Pin from './Pin';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 500,
        height: 500,
        latitude: 40.7128,
        longitude: -74.0060,
        zoom: 8
      }
    }
  }

  _renderMarker(art) {
    console.log(art);
    const lat = Number(art.latitude);
    const lng = Number(art.longitude);
    return (
      <Marker longitude={lng} latitude={lat} >
        <Pin size="20" />
      </Marker>
    );
  }

  render() {
    const { viewport } = this.state;
    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    console.log(MAPBOX_TOKEN)
    return (
      <ReactMapGL className="map"
          width={viewport.width}
          height={viewport.height}
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          zoom={viewport.zoom}
          mapStyle="mapbox://styles/mapbox/light-v9"
          onViewportChange={(viewport) => this.setState({viewport})}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
        {this._renderMarker(this.props.art)}
        </ReactMapGL>
    )
  }
}

export default Map;
