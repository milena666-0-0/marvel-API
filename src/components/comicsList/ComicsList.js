import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {error, loading, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequested(offset, true);
    }, []);

    const onRequested = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
           .then(comicsLoaded);
    };

    const comicsLoaded = (newComicsList) => {
        let ended = false;
        
        if(newComicsList.length < 8) {
            ended = true;
        };

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
        setNewItemLoading(false);
    };

    const renderItems = (arr) => {

        const elements = arr.map((item, i) => {

            const {title, thumbnail, price, id} = item;
            
            return(
                <li key={i} className="comics__item">
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt={title} className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            );
        });

        return elements;
    };

    const items = renderItems(comicsList);

    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const err = error ? <ErrorMessage/> : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid">
               {items}
               {spinner}
               {err}
            </ul>
            <button 
            onClick={() => onRequested(offset)}
            style={{'display' : comicsEnded ? 'none' : 'block'}}
            className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;