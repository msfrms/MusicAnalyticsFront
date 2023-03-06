import * as main from '../../../../reducers/mainReducer'
import { menuSelector } from '../../../menu/utils/MenuSelector'
import { ReportPageProps } from '../ReportPageComponent'

export function reportPageSelector(dispatch: (action: any) => void) {
    return (nextState: main.AppState, nextOwnProps: any) => {
        const props: ReportPageProps = {
            menu: menuSelector()
        }
        return props
    }
}