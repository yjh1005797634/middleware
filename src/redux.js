/**
 * Created by apple on 18/9/8.
 */

import {compose} from './compose'

let createStore = (reducer) => {

    let state;

    let listeners = [];

    //获取state
    let getState = ()=> state;

    //发射

    let dispatch = (action) => {

        state = reducer(state,action);

        // console.log('是不是这个dispatch');
        listeners.forEach(listener => listener());
    }

    dispatch()


    let subscribe = (listener)=> {

        listeners.push(listener);

        return ()=> {
           listeners = listeners.filter(l => l !== listener);
        }
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}

//应用中间件 对中间件的封装
//  let applyMiddleware = middleware => createStore => reducer => {
//
//      let store = createStore(reducer);
//      middleware = middleware(store);
//      let dispatch = middleware(store.dispatch);
//      // console.log(dispatch);
//
//
//      console.log({...store, dispatch});
//
//      return {
//          ...store,dispatch
//      }
//
// }

/*
   多个中间件的写法 middlewares
 */

 let applyMiddleware = (...middlewares) => createStore => reducer => {

     let store = createStore(reducer);
     middlewares = middlewares.map(middleware => middleware(store));

     let dispatch = compose(...middlewares)(store.dispatch);

     return {
         ...store,dispatch
     }
 }



 // let applyMiddleware = function (middleware) {
 //
 //     return function (createStore) {
 //
 //         return function (reducer) {
 //
 //          let store = createStore(reducer);
 //          middleware = middleware(store);
 //          let dispatch = middleware(store.dispatch);
 //          return {
 //              ...store,dispatch
 //          }
 //
 //         }
 //     }
 // }
 //
 
 
 
 
export  {createStore,applyMiddleware};