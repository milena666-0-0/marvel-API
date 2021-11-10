import {useState, useEffect} from 'react';

import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';

const RandomChar = () => {

    const [char, setChar] = useState({});

    const {error, loading, getCharacter, clearError} = useMarvelService();

    useEffect(() => {

        updateCharacter();
        const timerId = setInterval(updateCharacter, 6000);

        return () => {
            clearInterval(timerId);
        };

    }, []);

    const updateCharacter = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded);
    };

 
    const onCharLoaded = (char) => {
        setChar(char);
    };


    const err = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading) ? <View char={char}/> : null;

    return (
        <div className="randomchar">
            {err}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button 
                onClick={updateCharacter}
                className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    );
   
};

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki} = char;

    const desc = description ? description.slice(0, 200) + '...' : 'Not found';

    let imgStyle = {'objectFit': 'cover'};

    if(thumbnail ===('http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg')) {
        imgStyle = {'objectFit': 'unset'};
    };

    return(
        <div className="randomchar__block">
                <img src={thumbnail} alt={name} className="randomchar__img" style={imgStyle}/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                       {desc}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
        </div>
    );
};

export default RandomChar;
