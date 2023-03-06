
export enum LabelActionTypes {
    DidLoadLabels = "LabelActionTypes.DidLoadLabels"
}

export type Labels = {
    trackId: number
    labels: string[]
}

export type DidLoadLabelAction = {
    type: LabelActionTypes.DidLoadLabels
    labels: Labels
}

export function didLoadLabels(labels: Labels): DidLoadLabelAction {
    return {
        type: LabelActionTypes.DidLoadLabels,
        labels: labels
    }
}
