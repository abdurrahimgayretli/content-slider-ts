export interface ContextState {
    name: string;
    type: string;
    url: string;
    duration: number;
}

export type ContextStateType = {
    gallery: ContextState[];
    saveGallery: (item: ContextState[]) => void;
};