import {createStore,combineReducers} from 'redux';
//ACTION_TYPE
const CHANGE_DISPLAY='CHANGE_DISPLAY';
const ADJUST_VOLUME='ADJUST_VOLUME';
//Action creators
const actionDisplay= display =>({type: 'CHANGE_DISPLAY', display});
const actionVolume= vol=>({type: 'ADJUST_VOLUME', vol});
//Reducers
const displayReducer= (state= [], action) =>
{
	switch(action.type) {
		case CHANGE_DISPLAY:
		{
			return  action.display;
		}
		default:
		{
			return state;
		}
	}
}
const changeVolume=(state=[], action) =>
{
	switch(action.type){
		case ADJUST_VOLUME:
		{
			return action.vol;
		}
		default:
		{
			return state;
		}
	}
}
// Reducers combination
const rootReducer= combineReducers({disp: displayReducer,volu: changeVolume});
// Store Connection
const storeofReducers= createStore(rootReducer,{disp:'------', volu: '0.6'});
//React-Redux
const mapStatetoProps = (state) =>{ return { displayer: state.disp, adjusted: state.volu} };

const mapDispatchDisptoProps= (dispatch) =>
{
	return {
		submitNewDisplay: (newDisplay) => 
		{
			dispatch(actionDisplay(newDisplay));
		},
	}
}
const mapDispatchVoltoProps= (dispatch) =>
{
	return {
		submitNewVolumeValue: (newValue) =>
		{
			dispatch(actionVolume(newValue));
		}
	}
}

export {storeofReducers,mapStatetoProps,mapDispatchDisptoProps,mapDispatchVoltoProps};
