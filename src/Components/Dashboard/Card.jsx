import React, { Component } from 'react'

export default class Card extends Component {
    render() {
        return (
            <div class="row">
                <div class="col s12 m6">
                    <div class="card" >
                        <div class="card-image" >
                            <img src={this.props.image} style={{height: "140px"}} />
                            <span class="card-title">{this.props.title}</span>
                            <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">{this.props.icon}</i></a>
                        </div>
                        <div class="card-content">
                            <p>{this.props.link}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
