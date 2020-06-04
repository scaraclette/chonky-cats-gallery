import React from 'react';
import request from 'superagent';
import './cats.css';
import Container from 'react-bootstrap/Container';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

class Cats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            someAPI: [],
            catFilter: 'Choose Your Cats',
            // title: 'all cats'
        }
        this.allCats = this.allCats.bind(this);
        this.chonkyCats = this.chonkyCats.bind(this);
        this.nonchonkyCats = this.nonchonkyCats.bind(this);
    }

    allCats() {
        this.setState({ catFilter: 'All' });
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

    chonkyCats() {
        this.setState({ 
            catFilter: 'Chonky',
            someAPI: []
        });
        
    }

    nonchonkyCats() {
        this.setState({ 
            catFilter: 'Non-chonky',
            someAPI: []
        });
        
    }

    render() {
        let message;
        if (this.state.catFilter === 'Choose Your Cats') {
            message = <div><p>Welcome to Chonky Cats Gallery! Here we have a collection of our beloved feline friends.<br/>Choose from the dropdown above to see our chonky/non-chonky/all our friends</p></div>
        } else if (this.state.catFilter === 'All') {
            message = <p>All of our feline friends!</p>
        } else if (this.state.catFilter === 'Chonky') {
            message = <p>All of our <b>chonky</b> friends!</p>
        } else {
            message = <p>All of our non-chonky friends!</p>
        }

        return (
            
            <div>                
                <div className="button-main">
                    <Container>
                        <DropdownButton id="dropdown-basic-button" title={this.state.catFilter}>
                            <Dropdown.Item onClick={this.allCats}>All</Dropdown.Item>
                            <Dropdown.Item onClick={this.chonkyCats}>Chonky</Dropdown.Item>
                            <Dropdown.Item onClick={this.nonchonkyCats}>Non-Chonky</Dropdown.Item>
                        </DropdownButton>
                    </Container>
                </div>

                {message}

                <div>
                    {this.state.someAPI.map(item => (
                        <img src={item.catpic} width='500px' />
                    ))}
                </div>
            </div>
        )
    }
}

export default Cats;