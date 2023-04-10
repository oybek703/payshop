import { useDispatch } from 'react-redux'
import { useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { countryActions } from "@/store/countrySlice";

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
