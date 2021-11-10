import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = ({charId}) => {

    const [char, setChar] = useState(null);

    const {error, loading, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateCharacter();
    }, [charId]);


    const updateCharacter = () => {

        clearError();

        if(!charId) {
            return;
        };

        getCharacter(charId)
            .then(onCharLoaded);
    };

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const skeleton = error || loading || char ? null: <Skeleton/>;
    const err = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {err}
            {spinner}
            {content}
        </div>
    );
    
};

CharInfo.propTypes = {
    charId: PropTypes.number
};

const View = ({char}) => {

    const {thumbnail, name, homepage, wiki, description, comics} = char;

    let imgStyle = {'objectFit': 'cover'};

    if(thumbnail.indexOf('image_not_available') !== -1) {
        imgStyle = {'objectFit': 'unset'};
    };

    const comicsList = comics.length < 1 ? 'No comics about this character' : null;

    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">HomePage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                
                {
                    comicsList || 
                    comics.map((comic, i) => {

                        if(i > 9) return;

                        const {name, resourceURI} = comic;
                        const id = resourceURI.match(/\d+/g)[1];

                        return(
                            <li 
                            key={i}
                            className="char__comics-item">
                                <Link to={`/comics/${id}`}>
                                    {name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    );
};

export default CharInfo;