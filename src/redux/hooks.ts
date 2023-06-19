import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState } from './store'
import { useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { countryActions } from '@/redux/features/countrySlice'

const actions = {
  ...countryActions
}

const useActions = function () {
  const dispatch = useDispatch()
  return useMemo(() => {
    return bindActionCreators(actions, dispatch)
  }, [dispatch])
}

export default useActions

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
