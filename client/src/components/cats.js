import React from 'react';
import request from 'superagent';
import './cats.css';
import Container from 'react-bootstrap/Container';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Figure from 'react-bootstrap/Figure'
import Zoom from 'react-medium-image-zoom';
import '../../node_modules/react-medium-image-zoom/dist/styles.css';
import Upload from './upload';

class Cats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            someAPI: [],
            catFilter: 'Homepage',
        }
        this.homepage = this.homepage.bind(this);
        this.allCats = this.allCats.bind(this);
        this.chonkyCats = this.chonkyCats.bind(this);
        this.nonchonkyCats = this.nonchonkyCats.bind(this);
        this.addCat = this.addCat.bind(this);
    }

    homepage() {
        this.setState({ 
            catFilter: 'Homepage',
            someAPI: [],
         });
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
        });
        let getApi = request.get('/api/chonky');
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

    nonchonkyCats() {
        this.setState({ 
            catFilter: 'Non-chonky',          
        });
        let getApi = request.get('/api/not-chonky');
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

    addCat() {
        return (
            <div>
                <h1>Add your cat!</h1>
                <Upload />
            </div>
        )
    }

    render() {
        let message;
        if (this.state.catFilter === 'Homepage') {
            message = <div><p>Welcome to Chonky Cats Gallery! Here we have a collection of our beloved feline friends.<br/>Choose from the dropdown above to see our chonky/non-chonky/all our friends</p></div>
        } else if (this.state.catFilter === 'All') {
            message = <p>All of our feline friends!</p>
        } else if (this.state.catFilter === 'Chonky') {
            message = <p>All of our <b>chonky</b> friends!</p>
        } else {
            message = <p>All of our non-chonky friends!</p>
        }

        let addMyCat;
        if (this.state.catFilter === 'Homepage') {
            addMyCat = this.addCat();
        }

        return (
            
            <div>                
                <div className="button-main">
                    <Container>
                        <DropdownButton id="dropdown-basic-button" title={this.state.catFilter}>
                            <Dropdown.Item onClick={this.homepage}>Add My Cat</Dropdown.Item>
                            <Dropdown.Item onClick={this.allCats}>All</Dropdown.Item>
                            <Dropdown.Item onClick={this.chonkyCats}>Chonky</Dropdown.Item>
                            <Dropdown.Item onClick={this.nonchonkyCats}>Non-Chonky</Dropdown.Item>
                        </DropdownButton>
                    </Container>
                </div>

                {message}
                {addMyCat}

                <div>
                    {this.state.someAPI.map(item => (
                        <Zoom>
                            <Figure>
                                <Figure.Image 
                                    width={500}
                                    src={item.catpic}
                                />
                                <Figure.Caption>
                                    {item.catname}
                                </Figure.Caption>
                            </Figure>
                        </Zoom>
                    ))}
                </div>
            </div>
        )
    }
}

export default Cats;