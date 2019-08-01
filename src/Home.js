import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import apiKey from "./config";
import Spinner from "./components/spinner/spinner";
import Search from "./components/search/search";
import Nav from "./components/nav/nav";
import PhotoContainer from "./components/photo-container/photo-container";
import Item from "./components/item/item";
import "./Home.css";

function Home(props) {
    const { tag } = props.match.params;
    // detect if we're displaying a search result or a result page for a category link
    const isSearch = !!tag && tag !== "forest" && tag !== "ocean" && tag !== "field";
    // declare items variable in state and don't initialize it to anything yet
    const [items, setItems] = useState();
    // declare forestItems variable in state and don't initialize it to anything yet
    const [forestItems, setForestItems] = useState();
    // declare oceanItems variable in state and don't initialize it to anything yet
    const [oceanItems, setOceanItems] = useState();
    // declare fieldItems variable in state and don't initialize it to anything yet
    const [fieldItems, setFieldItems] = useState();

    // useEffect hook with an empty dependency array so it is only run when the component mounts to fetch all the data and update the state accordingly
    useEffect(() => {
        fetchData().then(items => setItems(items));
        fetchData("forest").then(items => setForestItems(items));
        fetchData("ocean").then(items => setOceanItems(items));
        fetchData("field").then(items => setFieldItems(items));
    }, []);

    // use the useEffect hook with tag, forestItems, oceanItems, and fieldItems as dependency so it runs the code block inside on mount and whenever the values change
    useEffect(() => {
        // reset items to trigger spinner
        setItems(null);
        // use a switch statement to update the items in state using the already fetched forestItems/oceanItems/fieldItems based on the tag
        switch(tag) {
            case "forest":
                setItems(forestItems);
                break;
            case "ocean":
                setItems(oceanItems);
                break;
            case "field":
                setItems(fieldItems);
                break;
            default:
                fetchData(tag).then(items => setItems(items));
        }
    }, [tag, forestItems, oceanItems, fieldItems]);

    // asynchronous function that accepts a tag parameter and returns a promise with the results
    const fetchData = async tag => {
        // decide which url to use based on whether tag has value of not (Flickr has two different APIs for searching and for loading the most recent images)
        const url = tag ? `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&content_type=1&tags=${tag}&per_page=24&page=1&format=json&nojsoncallback=1` : `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&content_type=1&per_page=24&page=1&format=json&nojsoncallback=1`;
        // call the fetch API with the url, parse the response, get images array from the parsed response, and map the response data to an array of objects matching the signature of props for the Item component
        // use catch to log the error to the console in case the request failed
        return await fetch(url)
            .then(res => res.json())
            .then(res => res.photos.photo)
            .then(data => data.map(img => {
                return {
                    src: `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`,
                    title: img.title,
                    owner: img.owner
                }
            }))
            .catch(error => console.log(error));
    }

    // return a div element that contains a Search component, a Nav component, and a PhotoContainer component
    return (
        <div>
            <Search initialValue={isSearch ? tag : ""} />
            <Nav categories={["forest", "ocean", "field"]} />
            {// conditionally render a Spinner component or a PhotoContainer component depending on whether items is undefined or not
                !items
                    ? <Spinner />
                    : <PhotoContainer for={tag} items={items.map(item => <Item {...item} />)} />
            }
        </div>
    );
}

// declare propTypes for Home component
Home.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            tag: PropTypes.string,
        }).isRequired,
    }).isRequired
};

// export Home component as default
export default Home;