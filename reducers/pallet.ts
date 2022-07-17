import { Reducer } from "react"
import { Pallet } from "../types/pallet"
import { v4 as uuid } from 'uuid'

export interface PalletState {
  loaded: boolean;
  pallets: Pallet[];
}

interface AddCellAction {
  type: 'ADD_CELL';
  name: string;
  palletId: string;
}

interface RemoveCellAction {
  type: 'REMOVE_CELL';
  palletId: string;
  cellId: string;
}

interface UpdateCellAction {
  type: 'UPDATE_CELL';
  palletId: string;
  cellId: string;
  name: string;
  color: string;
}

interface AddPalletAction {
  type: 'ADD_PALLET';
  id: string;
  name: string;
}

interface RemovePalletAction {
  type: 'REMOVE_PALLET';
  palletId: string;
}

interface UpdatePalletAction {
  type: 'UPDATE_PALLET';
  palletId: string;
  name: string;
}

interface LoadPalletsAction {
  type: 'LOAD_PALLETS';
  pallets: Pallet[];
}

export type PalletAction = AddCellAction |
  RemoveCellAction |
  UpdateCellAction |
  AddPalletAction |
  RemovePalletAction |
  UpdatePalletAction |
  LoadPalletsAction;

const PalletReducer: Reducer<PalletState, PalletAction> = (state: PalletState, action: PalletAction) => {
  switch(action.type){
    case 'ADD_CELL':
      return {
        ...state,
        pallets: state.pallets.map(pallet => {
          if(pallet.id === action.palletId){
            return {
              ...pallet,
              cells: [
                ...pallet.cells,
                {
                  id: uuid(),
                  name: action.name,
                  color: "#ffffff",
                }
              ]
            }
          }else{
            return { ...pallet }
          }
        })
      }
    case 'REMOVE_CELL':
      return {
        ...state,
        pallets: state.pallets.map(pallet => {
          if(pallet.id === action.palletId){
            return {
              ...pallet,
              cells: pallet.cells.filter(cell => cell.id !== action.cellId)
            }
          }else{
            return { ...pallet }
          }
        })
      }
    case 'UPDATE_CELL':
      return {
        ...state,
        pallets: state.pallets.map(pallet => {
          if(pallet.id === action.palletId){
            return {
              ...pallet,
              cells: pallet.cells.map(cell => {
                if(cell.id === action.cellId){
                  return {
                    ...cell,
                    name: action.name,
                    color: action.color,
                  }
                }else{
                  return {
                    ...cell,
                  }
                }
              })
            }
          }else{
            return { ...pallet }
          }
        })
      }
    case 'ADD_PALLET':
      return {
        ...state,
        pallets: [
          ...state.pallets,
          {
            id: action.id,
            name: action.name,
            cells: [
              {
                id: uuid(),
                name: '白',
                color: '#ffffff'
              }
            ]
          }
        ]
      }
    case 'REMOVE_PALLET':
      return {
        ...state,
        pallets: state.pallets.filter(pallet => pallet.id !== action.palletId)
      }
    case 'UPDATE_PALLET':
      return {
        ...state,
        pallets: state.pallets.map((pallet) => {
          if(pallet.id === action.palletId){
            return {
              ...pallet,
              name: action.name
            }
          }else{
            return {...pallet}
          }
        })
      }
    case 'LOAD_PALLETS':
      return {
        loaded: true,
        pallets: action.pallets
      }
    default:
      return {
        loaded: false,
        pallets: []
      }
  }
}

export default PalletReducer
