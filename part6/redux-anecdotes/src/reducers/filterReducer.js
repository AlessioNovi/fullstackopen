import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterChange(state, action) {
            state = action.payload
            return state
        }
    }
})

// const filterReducer = (state = '', action) => {
//     switch (action.type) {
//         case 'TYPE': {
//             return action.payload.typeValue;
//         }
//         default:
//             return state
//     }
// }

// export const filterChange = (value) => {
//     return {
//         type: 'TYPE',
//         payload: { typeValue: value }
//     }
// }

export default filterSlice.reducer
export const { filterChange } = filterSlice.actions

