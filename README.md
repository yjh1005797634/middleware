
一、中间件的原理和实现

   1.



二、export default 和export的区别
   1.export default 为模块指定默认输出 这样就不需要知道索要加载的模块的变量名 不能加{}

   2.export 导出的时候 要加{}




三、中间件 的核心
   1.获取仓库 传入老的dispatch  得到新的dispatch

   2.中间件的核心东西 最终是将dispatch 封装为一个newDispatch




   //应用中间件 对中间件的封装
    let applyMiddleware = middleware => createStore => reducer => {

        let store = createStore(reducer);
        middleware = middleware(store);
        let dispatch = middleware(store.dispatch);
        console.log(dispatch);
        return {
            ...store,dispatch
        }

   }


   // 中间件
   let logger = store => next => action => {


       console.log('before',store.getState());

       console.log(action);
       // console.log(next);
       next(action);

       console.log('after',store.getState());
   }





   //九转八回  最终得到的就是这个新的dispatch  而不是老的dispatch  见图解

             return function (action) {

                   console.log('before',store.getState());

                   console.log(action);
                   next(action);

                   console.log('after',store.getState());
             }



    最终就是得到一个新的store

               console.log({...store, dispatch});

                  return {
                      ...store,dispatch
                  }

     只是dispatch 不再是过去的dispatch  而是新的dispatch
     {getState: ƒ, dispatch: ƒ, subscribe: ƒ}

五、thunk 解决中间件异步问题 redux-thunk

        let thunk = store => next => action => {

             if(typeof action === 'function'){

                return action(next);
             }
             return next(action);

        }


六、实现redux-promise


七、过个中间件的组合
    let store = applyMiddleware(logger1,logger2)(createStore)(reducer);


     let applyMiddleware = (...middlewares) => createStore => reducer => {

         let store = createStore(reducer);
         middlewares = middlewares.map(middleware => middleware(store));

         let dispatch = compose(...middlewares)(store.dispatch);

         return {
             ...store,dispatch
         }
     }




