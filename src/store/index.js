import { createStore } from 'vuex'

export default createStore({

state:{

history:[]

},

mutations:{

ADD_HISTORY(state,calc){

state.history.push(calc)

},

CLEAR_HISTORY(state){

state.history=[]

}

}

})