import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from './redux'


class Counter extends Component {





    render(){

        return (
            <div>
                 <p>显示:{store.getState()}</p>
            </div>
        )
    }
}


//1.reducer

  let reducer = (state=0,action)=>{

      if(action === undefined) return state;
          switch (action.type){

              case 'ADD':
                  return state + 5;

              case 'SUB':
                  return state -4;

              default:
                  return state;
          }
  }

//2.创建仓库

// let store = createStore(reducer);

let logger1 = store => next => action => {


    console.log('l1 before',store.getState());

    next(action);

    console.log('l1 after',store.getState());
}

let logger2 = store => next => action => {

    console.log('l2 before',store.getState());

    next(action);

    console.log('l2 after',store.getState());

}




// let logger = function (store) {
//
//     return function (next) {
//
        // return function (action) {
        //
        //       console.log('before',store.getState());
        //
        //       console.log(action);
        //       next(action);
        //
        //       console.log('after',store.getState());
        // }
//     }
// }

let thunk = store => next => action => {

     if(typeof action === 'function'){

        return action(next);
     }
     return next(action);

}

let isPromise = obj => obj.then;

// let promise = store => next => action => {
//
//     if(isPromise(action)){
//
//         action.then((data)=>next(data));
//     }
// }


let promise = function (store) {

    return function (next) {

        return function (action) {

            if(isPromise(action)){

                action.then((data)=>next(data));
            }
            return next(action)
        }
    }
}




// let store = applyMiddleware(logger)(createStore)(reducer);

// let store = applyMiddleware(thunk)(createStore)(reducer);
 // let store = applyMiddleware(promise)(createStore)(reducer);

// 从左向右执行
let store = applyMiddleware(logger1,logger2)(createStore)(reducer);
//
store.subscribe(function () {
    console.log(store.getState());

});


/*  logger*/
  store.dispatch({type:'ADD'});
  // store.dispatch({type:'SUB'});

   // store.dispatch(function (dispatch) {
   //
   //     setTimeout(function () {
   //         dispatch({type:'ADD'})
   //     },3000)
   // });



/* thunk异步 */

  // store.dispatch(dispatch => {
//     setTimeout(function () {
//         dispatch({type:'ADD'})
//     },3000)
// });


/* promise 异步 */
  // store.dispatch(new Promise(function (resolve,reject) {
  //
  //     setTimeout(function () {
  //
  //         resolve({type:'ADD'})
  //     },3000);
  //
  // }))




ReactDOM.render(<Counter />, document.getElementById('root'));

