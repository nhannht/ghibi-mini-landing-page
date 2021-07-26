import {ListGroupItem, OverlayTrigger, Popover} from "react-bootstrap";
import {Component} from "react";

export class CardFilm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: []
        }
    }

    componentDidMount() {
        const fetchDataFromMultiURL = async () => {
            return await Promise.all(this.props.films.map(url => fetch(url).then(res => res.json()).then(result =>
                [result.title,
                result.url])));
        }
        fetchDataFromMultiURL().then(titles => this.setState({
            titles: titles
        }) )
    }



    render() {
        const liTitle =  this.state.titles.map(([title,url]) => <li><a href={url}>{title}</a></li>)
        const popover = () => {
            return (
                <Popover id="popover-basic">
                    <Popover.Header as="h3">Films</Popover.Header>
                    <Popover.Body>
                        <ul>{liTitle}</ul>
                    </Popover.Body>
                </Popover>
            )
        };
        return (
            <OverlayTrigger trigger={["hover","focus"]} delay={{show:0,hide:500}} overlay={popover()}>
                <ListGroupItem action>{liTitle.length} films</ListGroupItem>
            </OverlayTrigger>
        )
    }
}
