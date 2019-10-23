import React, { Component } from 'react'

import './FormComponent.css';

export default class FormComponent extends Component {
    state = {
        url: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.insertURL(this.state.url);
        this.setState({ url: '' });
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <form
                onSubmit={this.onSubmit}
                className="form-inline mt-5">
                <input
                    type="url"
                    name="url"
                    required
                    className="form-control"
                    value={this.state.url}
                    onChange={this.onChange}
                    placeholder="URL (https://exemplo.com)"
                />
                <button
                    type="submit"
                    value="submit"
                    className="btn btn-primary ml-3 col btn-insert">Inserir</button>
            </form>
        )
    }
}
