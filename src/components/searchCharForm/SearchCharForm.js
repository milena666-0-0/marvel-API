import {useState} from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './searchCharForm.scss';

const SearchCharForm = () => {

    const [char, setChar] = useState(null);

    const {error, loading, getCharacterByName, clearError} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
        console.log(char)
    };

    const updateChar = (name) => {
        clearError();
        getCharacterByName(name)
            .then(onCharLoaded);
    };

    const err = error ? <div className="search-form__critical-error"><ErrorMessage/></div> : null;
    const res = !char ? null : char.length > 0 ? 
        <div className="search-form__wrapper">
            <div className="search-form__success">There is! Visit {char[0].name} page?</div>
            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> 
     :  <div className="search-form__error">
            The character was not found. Check the name and try again
        </div>;
 
    return(
        <Formik
        initialValues={{name: ''}}
        validationSchema={Yup.object({
            name: Yup.string()
                     .trim()
                     .required('This field is required')
        })}
        onSubmit={({name}) => {
            updateChar(name)}
        }
        >
         
            <Form className="search-form">
                <label className="search-form__label" htmlFor='name'>Or find a character by name:</label>
                <div className="search-form__wrapper">
                    <Field className="search-form__input" name='name' type='text' placeholder='Enter name'/>
                    <button 
                    disabled={loading}
                    className="search-form__mainbtn button button__main" 
                    type="submit">
                    <div className="inner">find</div>
                    </button>
                </div>
                {res}
                {err}
                <FormikErrorMessage name='name' className="search-form__error" component='div'/>
            </Form>
          
        </Formik>
    );
};

export default SearchCharForm;