import React from 'react';
import request from 'superagent';


class Cats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            someAPI: []
        }
        this.callApi = this.callApi.bind(this);
    }

    callApi() {
        let getApi = request.get('/api/cat');
        getApi.end((err, res) => {
            if (err) {
                console.error(err);
            }
            
            let data = res.body;
            this.setState({
                someAPI: data
            })
            
        })
    }

    render() {
        return (
            <div>
                <h1>Chonky</h1>
                <button onClick={this.callApi}>Click to get API</button>
                <ul>
                    {this.state.someAPI.map(item => (
                        <li key={item.id}>
                            {item.catname} is chonky: {JSON.stringify(item.ischonky)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Cats;