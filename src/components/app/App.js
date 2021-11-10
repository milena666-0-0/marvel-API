import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';
import SingleComicLayout from '../pages/SingleComicLayout';
import SingleCharLayout from '../pages/SingleCharLayout';

const Page404 = lazy(() => import('../pages/Page404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const ItemPage = lazy(() => import('../pages/ItemPage'));


const App = () => {
    
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Switch>
                            <Route exact path="/">
                                <MainPage/>
                            </Route>
                            <Route exact path="/comics">
                                <ComicsPage/>
                            </Route>
                            <Route exact path='/comics/:id'>
                                <ItemPage Component={SingleComicLayout} dataType='comics'/>
                            </Route>
                            <Route exact path='/characters/:id'>
                                <ItemPage Component={SingleCharLayout} dataType='chars'/>
                            </Route>
                            <Route path='*'>
                                <Page404/>
                            </Route>
                        </Switch>
                    </Suspense>  
                </main>
            </div>
        </Router>
    )
}

export default App;