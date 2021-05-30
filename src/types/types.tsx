export interface ISpot {
    id: number;
    name: string;
    about: string;
    approach: string;
    facebook: string;
    rating: number;
    created: Date;
    createdby: number;
    main_image: string;
    lat: number;
    lng: number;
    views: number;
    deleted: boolean;
    big_image: string;
    small_image: string;
    displayname: string;
}

export interface IModal {
    show?: boolean;
    onHide: () => void;
}

export interface IUser {
    id: number;
    identifier: string;
    displayname: string;
}

export interface IImage {
    id: number;
    big_image: string;
    small_image: string;
}

export interface IImagePreUploade {
    id?: number;
    big_image: string;
    small_image: string;
}

export type UserContextState = {
    id: number;
    identifier: string;
    displayname: string;
}
export {}